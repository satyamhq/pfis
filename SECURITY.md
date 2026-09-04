# PFIS Security Architecture & Access Control Policy

This document details the security architecture, authentication protocols, role-based access control (RBAC), data privacy safeguards, and vulnerability management procedures for the **Patient Friction Intelligence System (PFIS)**.

---

## 1. Threat Model & Security Objectives

PFIS handles sensitive socio-demographic, geographic, and non-clinical accessibility data. The primary security objectives are:
1. **Confidentiality**: Protect patient non-clinical profiles, identification documents, and accessibility barriers from unauthorized disclosure.
2. **Integrity**: Ensure friction scores, care risk estimations, audit trails, and hospital requests cannot be forged or tampered with.
3. **Availability**: Provide fault-tolerant access even under low-connectivity or high-load conditions through embedded local storage failover.
4. **Principle of Least Privilege**: Enforce strict separation between **Patient**, **Hospital Staff**, and **Executive Administrator** roles.
5. **Non-Clinical Separation**: Ensure clinical diagnostic boundaries are respected and non-clinical operational records remain uncoupled from medical records unless explicitly consented to.

---

## 2. Authentication & Credential Management

### 2.1 Password Hashing & Salts
- Passwords are cryptographically hashed using **Bcrypt** (`bcryptjs`) with a work factor of **10 salt rounds**.
- Plaintext passwords are never logged, stored in temporary caches, or serialized in API responses (`password_hash` / `passwordHash` is excluded from user object serializations).

### 2.2 JSON Web Tokens (JWT)
- Session state is managed statelessly using cryptographically signed JSON Web Tokens (`jsonwebtoken`).
- Tokens are signed with a high-entropy secret (`JWT_SECRET`) using the **HMAC SHA-256 (`HS256`)** algorithm.
- Token lifetime is set to **7 days** with continuous validation on all protected routes.
- Decoded token payloads carry minimal identification:
  ```json
  {
    "userId": "34400414-59f5-414c-bb0c-b916fb590f7b",
    "email": "satyam31sk@gmail.com",
    "role": "admin",
    "iat": 1788523994,
    "exp": 1789128794
  }
  ```

### 2.3 Session Expiration & Client Cache Sanitization
- When a user logs out via `authService.logout()`, all persistent credentials—including `pfis_auth_token`, `pfis_auth_user`, and `pfis_auth_profile`—are purged from browser `localStorage`.
- The Axios HTTP client response interceptor automatically intercepts `401 Unauthorized` responses and cleanses all cached profile objects before redirecting to `/login?session_expired=true`.

---

## 3. Role-Based Access Control (RBAC) Architecture

PFIS implements a defense-in-depth authorization model with strict database-level and middleware-level verification.

```
Incoming Request
  │
  ▼
[authenticate] Middleware ──► Validates JWT Bearer Header & Active DB User Record
  │
  ▼
[requireAdmin] / [requireRole] ──► Checks Role Matches Allowed Roles
  │
  ▼ (If Admin Route)
Cryptographic Whitelist Check ──► Verifies user.email ∈ config.adminEmails
  │
  ├──► Match: Allowed to execute admin controller
  └──► Mismatch: 403 Forbidden + Emits SECURITY_UNAUTHORIZED_ADMIN_ATTEMPT Audit Log
```

### 3.1 Authorized Administrator Whitelist
Administrative privileges are restricted to the following authorized administrators:

| Administrator | Email Address | Status |
|---|---|---|
| **Satyam Kumar** | `satyam31sk@gmail.com` | Verified System Administrator |
| **Prince Patel** | `prince.patel2025@lpu.in` | Verified System Administrator |
| **Dhiraj Kumar** | `dhirajkumar464748@gmail.com` | Verified Executive Administrator |
| **Xel Admin** | `xel5760@gmail.com` | Verified System Administrator |
| **Tanishka** | `tanishka2789@gmail.com` | Verified System Administrator |
| **Dishika** | `ddishika45@gmail.com` | Verified System Administrator |
| **PFIS Root Admin** | `admin@pfis.org` | System Root / CI Fallback |

### 3.2 Privilege Escalation Safeguards
1. **Self-Registration Defense**: When calling `POST /api/auth/register`, any incoming `role: 'admin'` parameter is rejected and downgraded to `'patient'` unless the email matches the authorized administrator whitelist.
2. **Dynamic Role Sync**: During every login (`POST /api/auth/login`) and Google OAuth token exchange (`POST /api/auth/google/callback`), the user's email is cross-referenced against `isAuthorizedAdminEmail(email)`. Any non-whitelisted account found with `role: 'admin'` is automatically demoted to `role: 'patient'` with `is_admin: false`.
3. **Database Flag Enforced**: In the relational schema, users carry an explicit `is_admin` boolean attribute in addition to the `role` enum.

### 3.3 Administrative Route Protection
All routes under `/api/admin/*` are shielded by:
```typescript
router.use(authenticate, requireAdmin);
```
Where `requireAdmin` enforces that:
- The user is authenticated with an active session.
- `req.user.role === 'admin'`.
- `isAuthorizedAdminEmail(req.user.email) === true`.
Any violation immediately triggers an immutable audit log entry via `AuditService.log('SECURITY_UNAUTHORIZED_ADMIN_ATTEMPT', ...)`.

---

## 4. Network & Application Security

### 4.1 Cross-Origin Resource Sharing (CORS)
- In development, CORS allows localhost loopback variants (`localhost`, `127.0.0.1`).
- In production (`NODE_ENV=production`), CORS permits requests **only** from the explicitly configured `CLIENT_URL` domain.
- Arbitrary origins are rejected with HTTP 403.

### 4.2 Security Headers (Helmet)
- The Express application is hardened with `helmet()`, setting:
  - `Cross-Origin-Resource-Policy: cross-origin` (for map tile and asset caching)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Strict-Transport-Security` (in production)

### 4.3 Request Rate Limiting
- Public and sensitive endpoints are protected via `express-rate-limit`:
  - Authentication routes (`/api/auth/*`): 100 requests per 15-minute window per IP.
  - Global API routes: 1,000 requests per 15-minute window per IP.

### 4.4 SQL Injection Defense
- PFIS utilizes **parameterized queries** (`$1, $2, ...` for PostgreSQL/Embedded SQL and `?` for MySQL) across all repositories (`UserRepository`, `HospitalRepository`, `RequestRepository`, `PatientRepository`, etc.).
- Raw string concatenation in SQL queries is prohibited.

---

## 5. Patient Data Privacy & Consent Architecture

### 5.1 Non-Clinical Data Boundary
- PFIS does **not** store electronic health records (EHR), clinical diagnostic codes (ICD-10), or laboratory pathology test results.
- Data captured is restricted to **accessibility determinants**:
  - Distance to nearest hospital (km)
  - Primary mode of transport (Bus, Auto, Walking, Ambulance)
  - Smartphone ownership & connectivity generation (2G/3G/4G/5G)
  - Preferred language & literacy level
  - Caregiver availability & daily wage loss risk

### 5.2 Patient Consent Handshake
- Hospital staff can only view patient accessibility data after an explicit consent handshake (`consents` table).
- When submitting a hospital intake request (`requests` table), patients select which operational factors to disclose:
  ```json
  "dataShared": ["demographics", "transport_barrier", "language_preference"]
  ```
- Hospital dashboards display **only** patient-consented information.

### 5.3 Document Vault Isolation
- Patient identity proofs (Aadhaar masked, voter ID, disability certificates) uploaded to the Document Vault are stored in an isolated, access-controlled directory (`server/uploads/`).
- Only the authenticated patient and authorized nodal hospital staff handling an active triage request can access document streams.

---

## 6. Audit Logging & Compliance

All sensitive actions generate tamper-evident audit records in the `audit_logs` table:
- User registrations and logins (credential-based and OAuth)
- Friction profile updates and recalculations
- Hospital department and token capacity edits
- Patient intake request status transitions
- Administrative What-If policy simulations
- Unauthorized access attempts (`SECURITY_UNAUTHORIZED_ADMIN_ATTEMPT`)

Each log records the timestamp, actor `user_id`, `actor_role`, `action`, `resource`, client IP address, user-agent string, and contextual payload metadata.

---

## 7. Vulnerability Disclosure Policy

If you identify a potential security vulnerability in PFIS, please notify the security team:

1. **Email**: `security@pfis.org` or `satyam31sk@gmail.com`
2. **Subject Line**: `[SECURITY VULNERABILITY] PFIS - <Component Name>`
3. **Details**: Provide a detailed description, proof of concept, and reproduction steps.
4. **Coordination**: We ask that you adhere to responsible disclosure principles and allow 48 hours for our team to acknowledge and triage the issue before public disclosure.
