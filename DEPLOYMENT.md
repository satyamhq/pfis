# PFIS Production Deployment Guide

This document provides complete, production-grade instructions for deploying the **Patient Friction Intelligence System (PFIS)** into staging, cloud, and enterprise healthcare environments.

---

## 1. Deployment Architecture Overview

PFIS utilizes a decoupled, high-performance web architecture:

```
                  +-------------------------------+
                  |  Cloudflare / Route53 / DNS   |
                  +---------------+---------------+
                                  |
                                  v
                  +---------------+---------------+
                  |  Nginx Reverse Proxy / SSL    |
                  +-------+---------------+-------+
                          |               |
          [Static Assets / SPA]       [/api /uploads]
                          |               |
                          v               v
            +-------------+----+    +-----+--------------+
            |  Vite Production |    |  Node.js Express   |
            |  Bundle (Nginx)  |    |  Cluster (PM2)     |
            +------------------+    +-----+--------------+
                                          |
                        +-----------------+-----------------+
                        |                                   |
                        v                                   v
             +----------+----------+             +----------+----------+
             |   PostgreSQL /      |             |   Local / S3 Vault  |
             |   MySQL 8.0 RDS     |             |   Document Storage  |
             +---------------------+             +---------------------+
```

- **Frontend**: Vite-bundled React 18 SPA with route-level code splitting, vendor chunk isolation, and Tailwind CSS.
- **Backend API**: Node.js v20+ / Express with TypeScript, Helmet security headers, rate limiting, and RBAC guards.
- **Database**: Relational Database Engine (Managed AWS RDS PostgreSQL, Cloud SQL MySQL, or embedded zero-setup engine for demo/edge environments).

---

## 2. Environment Variables Specification

Before deploying, configure your production environment variables in your server hosting environment:

| Variable | Required | Default / Example | Purpose |
| :--- | :---: | :--- | :--- |
| `NODE_ENV` | **Yes** | `production` | Enforces production optimizations, suppresses stack traces |
| `PORT` | No | `5000` | Port for Express API server |
| `CLIENT_URL` | **Yes** | `https://pfis.health.gov.in` | Strict CORS origin verification |
| `JWT_SECRET` | **Yes** | `[cryptographically-strong-256-bit-key]` | Signs and verifies user authentication tokens |
| `DATABASE_TYPE` | No | `auto` (or `postgres`, `mysql`) | Relational database client selection |
| `DATABASE_URL` | Optional | `postgresql://user:pass@host:5432/pfis` | Connection string for PostgreSQL or MySQL |
| `GOOGLE_CLIENT_ID` | Optional | `91776...apps.googleusercontent.com` | Google OAuth 2.0 Web Client ID |
| `GOOGLE_CLIENT_SECRET` | Optional | `GOCSPX-...` | Google OAuth 2.0 Client Secret |
| `VITE_GOOGLE_CLIENT_ID`| Optional | `91776...apps.googleusercontent.com` | Client-side Google Identity SDK button |
| `GOOGLE_MAPS_API_KEY` | Optional | `AIzaSy...` | Enables Google Maps; falls back to Leaflet if unset |
| `ADMIN_EMAILS` | **Yes** | Whitelist comma-separated emails | Authorized system administrators for RBAC |
| `MAX_FILE_SIZE_MB` | No | `10` | Maximum upload size for Document Vault |

---

## 3. Docker Containerization

### 3.1 Server Dockerfile (`server/Dockerfile`)

```dockerfile
# Production Multi-Stage Dockerfile for PFIS Backend
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/database/schema.sql ./dist/database/schema.sql
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

### 3.2 Client Dockerfile (`client/Dockerfile`)

```dockerfile
# Production Multi-Stage Dockerfile for PFIS Frontend
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3.3 Docker Compose (`docker-compose.yml`)

```yaml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: pfis
      POSTGRES_USER: pfis_admin
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    restart: always
    environment:
      - NODE_ENV=production
      - PORT=5000
      - DATABASE_URL=postgresql://pfis_admin:${DB_PASSWORD}@db:5432/pfis
      - CLIENT_URL=https://pfis.example.com
      - JWT_SECRET=${JWT_SECRET}
      - ADMIN_EMAILS=${ADMIN_EMAILS}
    depends_on:
      - db
    ports:
      - "5000:5000"

  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    restart: always
    ports:
      - "80:80"
    depends_on:
      - server

volumes:
  pgdata:
```

---

## 4. Nginx Reverse Proxy Configuration

Deploying behind Nginx provides SSL termination, static gzip caching, and proxying:

```nginx
server {
    listen 80;
    server_name pfis.health.gov.in;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name pfis.health.gov.in;

    ssl_certificate /etc/letsencrypt/live/pfis.health.gov.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pfis.health.gov.in/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' https://accounts.google.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com;" always;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Frontend Single Page App
    location / {
        root /var/www/pfis/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API Endpoints
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Uploaded Documents Vault
    location /uploads/ {
        proxy_pass http://127.0.0.1:5000/uploads/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 5. Cloud Platform Deployment Runbooks

### 5.1 PaaS Deployment (Render / Railway)

1. **Deploy Backend**:
   - Environment: Node.js
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Root Directory: `server`
   - Attach environment variables (`JWT_SECRET`, `ADMIN_EMAILS`, `CLIENT_URL`, `DATABASE_URL`).

2. **Deploy Frontend**:
   - Environment: Static Site
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Root Directory: `client`
   - Add Rewrite Rule: `/*` -> `/index.html` (HTTP 200).

### 5.2 Enterprise Linux (Ubuntu 22.04 LTS + PM2)

```bash
# 1. Clone repository
git clone https://github.com/Learntagus-Tech-SIH/PFIS-Patient-Friction-Intelligence-System.git
cd PFIS-Patient-Friction-Intelligence-System

# 2. Install all dependencies and build
npm run install:all
npm run build

# 3. Seed production base data
npm run seed

# 4. Start backend with PM2 process manager
pm2 start server/dist/server.js --name "pfis-api" -i max
pm2 save
pm2 startup
```

---

## 6. Health Checks & Zero-Downtime Monitoring

- **Health Endpoint**: `GET /api/health`
  - Returns `200 OK` with system name, version timestamp, and active map engine mode.
- **Automated Verification Test**:
  ```bash
  npm test
  ```
  Executes all 18 API validation and RBAC regression tests in under 3 seconds.
