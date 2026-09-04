# PFIS Project Memory & Architecture Context Bank

This document serves as the persistent memory, contextual ledger, and institutional knowledge base for the **Patient Friction Intelligence System (PFIS)**. It records foundational design decisions, algorithmic heuristics, security policies, and operational history.

---

## 1. Project Genesis & Core Mission

- **Problem Context**: Under the Smart India Hackathon (SIH) healthcare mandate, over 40% of referred patients in rural, tribal, and economically vulnerable demographics abandon their healthcare journey before completing diagnosis or follow-up consultations.
- **Root Cause**: The barrier is rarely medical refusal; it is **operational friction**—the compounding cost of bus fares, wage losses from missing work for OPD hours, inability to navigate smartphone apps, lack of a family caregiver to escort an elderly patient, and vernacular language intimidation at large multi-speciality hospitals.
- **PFIS Solution**: An intelligent non-clinical accessibility platform that quantitatively scores operational barriers (0–100), estimates dropout probabilities, connects patients to low-friction hospital facilities, and gives health authorities a **What-If simulation engine** to model budget allocations.

---

## 2. Key Architectural Pivots & Evolution

### Pivot 1: Multi-Engine Database Abstraction Layer (`IDatabaseClient`)
- **Original State**: The system initially had monolithic Mongoose ODM lock-in.
- **Problem**: Need for flexible enterprise deployments across MongoDB Atlas, PostgreSQL, MySQL, and zero-dependency local environments without external database installations.
- **Resolution**: Implemented a universal **Database Abstraction Layer (`IDatabaseClient`)** supporting MongoDB (native MongoClient), PostgreSQL (`pg`), MySQL (`mysql2`), and an **Embedded Relational SQL Engine** with JSON auto-persistence. Models communicate through a clean database interface (`server/src/database/sqlModel.ts`).

### Pivot 2: Zero-Dependency Embedded Relational SQL Engine
- **Decision**: To ensure any developer, judge, or hospital technician can launch PFIS immediately with `npm run dev` without installing PostgreSQL, Docker, or MySQL, an embedded in-memory transactional SQL engine was implemented in `server/src/database/db.ts`.
- **Persistence**: Runtime database states (users, patient profiles, hospitals, appointments) are auto-persisted to `server/data/pfis_relational.json`.

### Pivot 3: Dual-Layer Cryptographic Admin RBAC
- **Decision**: Admin route protection must not rely on simple token role claims. The system enforces a strict dual-check:
  1. `req.user.role === 'admin'` AND `req.user.is_admin === true`
  2. `isAuthorizedAdminEmail(req.user.email) === true`
- **Security Incident Logging**: Any unauthorized token claiming admin role triggers an immediate `SECURITY_UNAUTHORIZED_ADMIN_ATTEMPT` audit entry.

---

## 3. Authorized Administrator Directory

The following accounts are permanently authorized as administrators:

| Administrator | Email Address | Assigned Role | Phone Contact |
|---|---|---|---|
| **Satyam Kumar** | `satyam31sk@gmail.com` | `admin` | `+91 98765 00001` |
| **Prince Patel** | `prince.patel2025@lpu.in` | `admin` | `+91 98765 00002` |
| **Dhiraj Kumar** | `dhirajkumar464748@gmail.com` | `admin` | `+91 91234 56789` |
| **Xel Admin** | `xel5760@gmail.com` | `admin` | `+91 98765 00003` |
| **Tanishka** | `tanishka2789@gmail.com` | `admin` | `+91 98765 00004` |
| **Dishika** | `ddishika45@gmail.com` | `admin` | `+91 98765 00005` |
| **Root System Admin** | `admin@pfis.org` | `admin` | `+91 98765 43210` |

*Default development credential for all seeded demo accounts*: `Admin@123` (Admin), `Hospital@123` (Hospital Staff), `Patient@123` (Demo Patient Sunita Devi).

---

## 4. Mathematical Formulas & Heuristic Models

### 4.1 8-Dimension Weighted Friction Scoring
$$\text{Friction Score} = \sum_{k=1}^{8} w_k \cdot S_k$$
Where:
- $w_{\text{travel}} = 0.15$
- $w_{\text{transport}} = 0.18$
- $w_{\text{digital}} = 0.12$
- $w_{\text{language}} = 0.08$
- $w_{\text{caregiver}} = 0.12$
- $w_{\text{documentation}} = 0.10$
- $w_{\text{cost}} = 0.15$
- $w_{\text{timing}} = 0.10$
$$\text{Accessibility Index} = 100 - \text{Friction Score}$$

### 4.2 Distance & Terrestrial Routing Fallback
When external mapping APIs are offline, PFIS applies the Haversine Great-Circle formula adjusted with an empirical road detour coefficient ($\alpha = 1.25$):
$$d = 1.25 \cdot 2R \cdot \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \text{lat}}{2}\right) + \cos(\text{lat}_1)\cos(\text{lat}_2)\sin^2\left(\frac{\Delta \text{lon}}{2}\right)}\right)$$

### 4.3 What-If Diminishing Returns Model
To prevent policy simulations from projecting completion rates $> 100\%$:
$$\Delta C = \sum_j \left[ \text{Gain}_j \times \left(1 - \frac{C_{\text{baseline}}}{100}\right) \times \gamma \right]$$
Where $\gamma \in [0.75, 0.90]$ is the interaction friction dampener.

---

## 5. Directory Structure Quick Reference

```
d:\PFIS-Patient-Friction-Intelligence-System
├── client/                     # React 18 + Vite + TypeScript
│   ├── src/
│   │   ├── components/         # Reusable UI & Accessibility components
│   │   ├── context/            # Global state (Auth, Location, Language, Accessibility)
│   │   ├── i18n/               # Locales for 11 Indian languages
│   │   ├── layouts/            # MainLayout, PatientLayout, HospitalLayout, AdminLayout
│   │   ├── pages/              # Portal pages (Patient, Hospital, Admin, Public)
│   │   ├── services/           # Axios API clients
│   │   └── types/              # TypeScript interface definitions
├── server/                     # Node.js + Express + TypeScript (ESM)
│   ├── data/                   # Embedded SQL persistent state (gitignored)
│   ├── src/
│   │   ├── config/             # Environment, Database, and Admin Whitelist
│   │   ├── controllers/        # REST route handlers
│   │   ├── database/           # Drivers (PG, MySQL, Embedded) & Repositories
│   │   ├── intelligence/       # Non-Clinical Friction, Risk & What-If engines
│   │   ├── middleware/         # Auth, Role, Admin, Upload, Audit
│   │   ├── models/             # SQL-backed entity models
│   │   ├── routes/             # Express API routes
│   │   ├── seed/               # Relational dataset seeders
│   │   ├── services/           # Maps, Translation, Notifications, Audit
│   │   └── utils/              # JWT, cryptography helpers
├── SECURITY.md                 # Security architecture & RBAC documentation
├── ARCHITECTURE.md             # High-level architecture & technical design
├── MEMORY.md                   # Project memory bank (this file)
├── FEATURES.md                 # Comprehensive feature catalog
├── WORKFLOW.md                 # Operational user journeys & workflows
├── DATABASE.md                 # Relational schema & entity documentation
├── TESTING.md                  # Test suites, automation, and verification
├── ROADMAP.md                  # Strategic roadmap & phased milestones
└── README.md                   # Master project documentation
```
