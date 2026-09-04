# Changelog

All notable changes to the **Patient Friction Intelligence System (PFIS)** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-09-04 - Complete Project & UI Transformation

### Added
- **Unified 6-Role Portal Architecture**:
  - Full dedicated portals and workflows for all 6 stakeholders: Patient, Hospital, Doctor, ASHA Worker, Government Official, and Admin.
- **Google OAuth Onboarding & Public Role Guard**:
  - Seamless Google OAuth flow with interactive onboarding modal: "How would you like to use PFIS?"
  - Strict security boundary preventing public self-selection of `admin` role (403 Forbidden with audit logging).
- **Comprehensive 36-Test Automation Suite**:
  - Expanded `server/tests/run_all_tests.cjs` verifying 36/36 endpoints across all 6 roles, Google onboarding, and privilege escalation prevention in 2.99s.

### Changed
- **Crisp 1–2 Word UI Design Standard**:
  - Condensed all main titles, primary navigation items, stat card headers, tab badges, and key action buttons across all portals to 1–2 words maximum (*Dashboard, Nearby Hospitals, Digital Twin, Document Vault, Doctor Console, Field Console, Triage Console, District Dashboard, Budget Optimizer, etc.*).
- **Master Documentation Suite Overhaul**:
  - Fully synchronized all 15 project markdown documents with current architecture, schemas, and runbooks.

---

## [1.1.0] - 2026-09-04 - Production Hardening & Autonomous QA

### Added
- **Autonomous Ephemeral Test Runner**:
  - Upgraded `server/tests/run_all_tests.cjs` to probe the target server port and automatically spawn a background instance if offline, await `/api/health` readiness, execute all 18 API and RBAC checks, and gracefully terminate child processes on exit.
- **Turnkey Root QA Scripts**:
  - Added `test:client`, `test:all`, and `check` to root `package.json` enabling single-command verification of both backend intelligence tests and frontend production builds.

### Changed
- **Cross-Context Path Hardening**:
  - Fortified path resolution for embedded database storage (`pfis_relational.json`) in `db.ts` and document vault file uploads in `uploadMiddleware.ts` and `app.ts` to seamlessly adapt whether processes are launched from project root or server subfolder.

### Security
- **0-Vulnerability Dependency Audit**:
  - Resolved moderate severity transitive advisories in Express `qs`/`body-parser` by overriding `qs` to `^6.16.0`, achieving a clean 0-vulnerability `npm audit` across the server.
- **Production Secret Guardrails**:
  - Added runtime assertion in `server/src/config/env.ts` issuing high-priority alerts if `JWT_SECRET` remains at its default development value when `NODE_ENV === 'production'`.

---

## [1.0.0] - 2026-09-04 - Production Release

### Added
- **Production-Grade Admin Role & Access Control (RBAC)**:
  - Multi-tier verification restricting administrative privileges to 6 authorized system administrators.
  - Automatic privilege escalation downgrade guard in user registration API.
  - Dedicated `requireAdmin` middleware with audit log capturing (`SECURITY_UNAUTHORIZED_ADMIN_ATTEMPT`).
- **Automated Regression & Test Suite**:
  - `npm test` script executing 18 automated validation checks across authentication, intelligence engines, and authorization boundaries in under 3 seconds.
- **Enterprise Documentation Suite**:
  - Added [DEPLOYMENT.md](DEPLOYMENT.md) (Docker, Docker Compose, Nginx reverse proxy, cloud platforms).
  - Added [DEVELOPMENT.md](DEVELOPMENT.md) (Local setup, dev workflow, standards, debugging).
  - Added [API.md](API.md) (Comprehensive REST specification).
  - Added [CONTRIBUTING.md](CONTRIBUTING.md) (Guidelines, code standards, PR checklist).
  - Added [CHANGELOG.md](CHANGELOG.md) (Semantic versioning release notes).
- **Client Configuration Template**:
  - Added `client/.env.example` defining `VITE_API_BASE_URL` and `VITE_GOOGLE_CLIENT_ID`.

### Changed
- **Iconography Standardization (Lucide Icons)**:
  - Replaced all raw platform-dependent emojis across all 35+ components and pages with standardized vector `lucide-react` SVG icons.
  - Enforced consistent stroke widths, theme-tailored colors (`teal-600`, `emerald-600`, `rose-600`), and flexbox vertical baseline alignment.
- **Navbar Redesign & Multilingual Dynamic Localization**:
  - Refactored navigation bar to frosted glassmorphism with ambient hairline gradient, live system pulse indicator, and role badges.
  - Connected all navigation links, subtitles, and controls to dynamic `i18n` translation keys across 11 Indic languages without page reload.

### Performance
- **Route-Level Code Splitting**:
  - Converted all 30+ static page imports in `App.tsx` into dynamic `React.lazy()` imports wrapped in a branded `Suspense` loading fallback.
- **Rollup Vendor Chunk Isolation**:
  - Configured `manualChunks` in `vite.config.ts` splitting vendors into `vendor-react`, `vendor-maps`, `vendor-charts`, `vendor-icons`, and `vendor-i18n`.
  - Reduced monolithic client bundle from 1,546 kB down to modular chunks under 420 kB.
  - Eliminated all Vite large chunk bundle warnings and accelerated FCP / LCP.

### Security
- **Defense-in-Depth Hardening**:
  - Enforced bcrypt hashing with 10 salt rounds.
  - Sealed `.gitignore` rules to prevent leakage of local `.env` and `.env.*` files.
  - Strengthened Helmet security headers and CORS origin validation.
  - Parameterized database queries across all relational tables preventing SQL injection.
