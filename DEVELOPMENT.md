# PFIS Local Development & Engineering Guide

Welcome to the development environment of the **Patient Friction Intelligence System (PFIS)**. This guide outlines everything you need to contribute, debug, develop, and test features across the stack.

---

## 1. Prerequisites

- **Node.js**: v18.0.0 or higher (v20 LTS recommended)
- **Package Manager**: npm v9.0.0 or higher
- **Git**: v2.30 or higher
- **OS Support**: Linux, macOS, or Windows (PowerShell or WSL)

---

## 2. Quickstart Development Setup

Clone the repository and install all root, backend, and frontend dependencies in one command:

```bash
# Clone the repository
git clone https://github.com/Learntagus-Tech-SIH/PFIS-Patient-Friction-Intelligence-System.git
cd PFIS-Patient-Friction-Intelligence-System

# Install all dependencies across both tiers
npm run install:all

# Seed demo records and authorized administrators
npm run seed

# Start both backend (port 5000) and frontend (port 5173) concurrently
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 3. Repository Architecture & Layout

```
PFIS-Patient-Friction-Intelligence-System/
├── client/                      # Frontend Application (React 18 + Vite + Tailwind)
│   ├── src/
│   │   ├── components/         # Reusable UI widgets, accessibility tools, navbar
│   │   ├── context/            # React Context (Auth, Location, Language, Accessibility)
│   │   ├── i18n/               # 11 Indic language translation locales (hi, te, bn, etc.)
│   │   ├── layouts/            # Shell layouts (Main, Patient, Hospital, Admin, Auth)
│   │   ├── pages/              # Lazy-loaded page views
│   │   ├── services/           # Axios API consumer abstractions
│   │   └── types/              # TypeScript client interfaces
│   ├── index.html              # HTML shell & font imports
│   ├── tailwind.config.js      # Design tokens, emerald/teal color scales
│   └── vite.config.ts          # Rollup code splitting & proxy configuration
│
├── server/                      # Backend Intelligence Core (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/             # Environment variables and system defaults
│   │   ├── controllers/        # Express HTTP route handlers
│   │   ├── database/           # Relational storage engine & multi-client abstraction
│   │   ├── intelligence/       # 8-dimension friction, care risk & What-If simulators
│   │   ├── middleware/         # Auth, RBAC, Rate-limiting, Error middleware
│   │   ├── models/             # Schema definitions and query mappers
│   │   ├── routes/             # REST endpoint route registrations
│   │   ├── seed/               # Initial database seeder
│   │   └── services/           # Audit logging, notifications, document services
│   └── tests/                  # Automated verification & RBAC regression suite
│
├── package.json                 # Monorepo root orchestration scripts
├── .env.example                 # Root environment variable template
└── [DOCUMENTATION].md           # Enterprise documentation suite
```

---

## 4. Development Scripts

Run these scripts from the repository root:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts backend (`5000`) and frontend (`5173`) concurrently |
| `npm run server` | Starts only the backend in watch mode using `tsx watch` |
| `npm run client` | Starts only the frontend Vite development server |
| `npm run build` | Compiles TypeScript and builds production bundles for both tiers |
| `npm run seed` | Seeds default demo profiles, hospitals, and authorized admins |
| `npm test` | Runs the automated 18-point API and RBAC security regression suite (ephemeral server) |
| `npm run test:client` | Verifies client TypeScript typechecks and Vite bundle build |
| `npm run test:all` | Runs full end-to-end verification (server API/RBAC suite + client build) |
| `npm run check` | Unified production verification: builds both tiers and runs all tests |

---

## 5. Development Principles & Code Standards

### 5.1 Non-Clinical Healthcare Boundary
PFIS strictly models **non-clinical operational friction factors**:
- Geographic distance & travel terrain
- Transport availability & schedule frequency
- Financial constraints & OOP expenditure
- Documentation & identity verification
- Digital literacy & smartphone ownership
- Language, dialect & literacy barriers
- Referral protocol dropouts
- Diagnostic centre accessibility

*Never integrate clinical diagnosis, symptom analysis, pharmaceutical prescription, or vital monitoring logic into PFIS algorithms.*

### 5.2 UI Iconography & Aesthetics
- Use **Lucide SVG icons** (`lucide-react`) for UI controls, badges, buttons, cards, and navigation.
- Avoid platform-dependent raw Unicode emojis in functional UI elements.
- Maintain consistent icon sizing: `w-3.5 h-3.5` for pills, `w-4 h-4` for standard buttons, and `w-5 h-5` for cards.
- Ensure all interactive elements include unique `id` or `data-testid` attributes.

### 5.3 Code Splitting
Always use `React.lazy()` with `Suspense` when registering new top-level page views in [App.tsx](file:///d:/PFIS-Patient-Friction-Intelligence-System/client/src/App.tsx) to prevent bundle bloat.

---

## 6. Pre-Commit Quality Checklist

Before submitting a Pull Request, verify:
1. `npm run build` succeeds on both server and client without errors or chunk warnings.
2. `npm test` passes 100% across all endpoints.
3. No hardcoded secrets or `.env` files are tracked in Git.
4. Added or updated text strings include entries in `client/src/i18n/locales/*.json`.
