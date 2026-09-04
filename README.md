# Patient Friction Intelligence System (PFIS)

<div align="center">

![PFIS Logo](https://img.shields.io/badge/PFIS-Healthcare%20Operational%20Intelligence-0ea5e9?style=for-the-badge&logo=shield&logoColor=white)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-black?style=for-the-badge&logo=express)](https://expressjs.com/)
[![WCAG 2.1](https://img.shields.io/badge/WCAG-2.1%20AA%20Compliant-emerald?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Languages](https://img.shields.io/badge/Languages-11%20Indian%20Vernaculars-orange?style=for-the-badge)](#-multilingual-localization-11-indic-languages)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

**An AI-enabled healthcare operational intelligence and decision-support platform that identifies, quantifies, and resolves non-clinical barriers preventing vulnerable patients from accessing and completing their healthcare journey.**

[Live Local Demo](#-quick-start--local-development) • [Architecture](ARCHITECTURE.md) • [Features](FEATURES.md) • [API Reference](API.md) • [Security & RBAC](SECURITY.md) • [Database](DATABASE.md) • [Workflows](WORKFLOW.md) • [Testing](TESTING.md) • [Deployment](DEPLOYMENT.md)

</div>

---

## ⚠️ Non-Clinical Mandate

> [!IMPORTANT]
> **PFIS strictly addresses operational, geographic, financial, and logistical barriers to healthcare.**
> - ❌ It does **NOT** diagnose medical conditions or diseases.
> - ❌ It does **NOT** recommend prescription drugs or medical treatments.
> - ❌ It does **NOT** predict clinical or pathological prognoses.
> - ❌ It does **NOT** replace certified medical doctors or clinicians.
> 
> *Our singular focus is ensuring that vulnerable patients can physically, financially, and linguistically reach the clinical care they need.*

---

## 📌 Problem Statement & Solution Overview

### The Problem
In developing and semi-urban regions, **over 40% of referred patients drop out** before completing consultations or diagnostic workups. Clinical failure is often not the cause—rather, patient attrition is driven by **compounding non-clinical friction**:
- **Distance & Transit**: Living 50+ km away with irregular bus connections or rugged rural terrain.
- **Financial & Wage Loss**: Fear of losing daily subsistence wages to attend standard morning OPD hours.
- **Linguistic Barriers**: Inability to navigate health portals or understand prescriptions without vernacular assistance.
- **Caregiver & Escort Absence**: Lack of an able-bodied family escort for elderly or disabled patients.
- **Digital Literacy & Paperwork**: Missing identification, fragmented physical documents, and intimidating triage queues.

### The Solution: PFIS
PFIS provides an explainable mathematical engine that models non-clinical operational barriers across **8 core dimensions**, estimates **care-completion drop-out risk**, connects patients to **verified low-friction facilities**, and equips health authorities with an interactive **What-If policy simulation and budget optimization engine**.

---

## 👥 The 6 User Roles

PFIS delivers tailored, role-based workflows for all healthcare stakeholders:

| Role | Core Purpose & Primary Views | Primary 1–2 Word UI Views |
|---|---|---|
| **Patient** | Personalized friction breakdown, nearby hospital finder, 1-click appointment booking, teleconsultation, digital twin trip preview, document vault. | *Dashboard, Hospitals, Teleconsult, Digital Twin, Friction Profile, Journey Risk, Intake Requests, Documents, Profile, Settings* |
| **Hospital** | Live OPD triage queue, token quota management, capacity planning, access request approval, department coordination. | *Dashboard, Intake Queue, Departments, Hospital Profile* |
| **Doctor** | Monitored patient list, clinical guidance on non-clinical friction flags, travel distance alerts, escort status. | *Dashboard, Patient Queue* |
| **ASHA Worker** | Community household registry, 1-tap doorstep barrier logging, transit trip coordination, patient follow-up. | *Dashboard, Households, Log Barrier, Tasks* |
| **Government** | District health intelligence, friction heatmap, care leakage bottleneck tracker, policy intervention planning. | *Dashboard, Friction Map, Interventions, Care Leakage* |
| **Admin** | Cryptographic RBAC gatekeeper, system telemetry, population heatmaps, policy simulator, 0/1 knapsack budget optimizer, hospital verification, tamper-evident audit ledger. | *Dashboard, Simulator, Budget Optimizer, Care Leakage, Root Cause, Friction Map, Patient Registry, Hospital Directory, Audit Ledger* |

---

## 🛡️ Dual-Layer RBAC & Admin Security Boundary

PFIS enforces a strict, production-grade **dual-layer role-based access control (RBAC)** architecture:

1. **Immutable Admin Email Whitelist**: Administrative access is restricted to cryptographically verified accounts (`satyam31sk@gmail.com`, `prince.patel2025@lpu.in`, `dhirajkumar464748@gmail.com`, `xel5760@gmail.com`, `tanishka2789@gmail.com`, `ddishika45@gmail.com`, `admin@pfis.org`).
2. **Public Onboarding Barrier**: When new users sign up or log in via Google OAuth, they choose only from public operational roles: `patient`, `hospital`, `doctor`, `asha`, or `government`. Any attempt to select `admin` is blocked with `403 Forbidden` and audited.

---

## 🌐 Multilingual Localization (11 Indic Languages)

PFIS supports real-time, dynamic localization without page reloads across **11 official Indian languages** with text-to-speech (TTS) read-aloud support:

| Language | Native Script | Code | Language | Native Script | Code |
|---|---|---|---|---|---|
| **English** | English | `en` | **Gujarati** | ગુજરાતી | `gu` |
| **Hindi** | हिन्दी | `hi` | **Urdu** | اردو | `ur` |
| **Bengali** | বাংলা | `bn` | **Kannada** | ಕನ್ನಡ | `kn` |
| **Telugu** | తెలుగు | `te` | **Malayalam** | മലയാളം | `ml` |
| **Marathi** | मराठी | `mr` | **Punjabi** | ਪੰਜਾਬੀ | `pa` |
| **Tamil** | தமிழ் | `ta` | | | |

---

## 💻 Tech Stack

- **Frontend**: React 18, Vite 6, TypeScript 5, Tailwind CSS 3.4, Leaflet & React-Leaflet, Recharts, Lucide Icons, i18next.
- **Backend**: Node.js 22+, Express 4.21, TypeScript 5, Helmet, CORS, Express-Rate-Limit, BCrypt, JWT.
- **Database**: Multi-database abstraction supporting **MongoDB**, **PostgreSQL**, **MySQL**, and an automated zero-config **Embedded SQL/JSON** fallback.
- **Testing**: Automated integration and regression test runner (`server/tests/run_all_tests.cjs`).

---

## 🚀 Quick Start & Local Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/satyamhq/pfis.git
cd pfis

# Install backend dependencies
npm --prefix server install

# Install frontend dependencies
npm --prefix client install
```

### 2. Configure Environment
Copy the example environment file:
```bash
cp .env.example .env
```

### 3. Run Development Servers
Open two terminal windows:

**Terminal 1 (Backend Server)**:
```bash
npm --prefix server run dev
```
*Backend runs on `http://localhost:5000`.*

**Terminal 2 (Frontend Client)**:
```bash
npm --prefix client run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 🔑 Demo Login Credentials

For instant demonstration access, use these pre-seeded accounts:

| Role | Email Address | Password | Portal Route |
|---|---|---|---|
| **Admin** | `satyam31sk@gmail.com` | `Admin@123` | `/admin/dashboard` |
| **Admin** | `prince.patel2025@lpu.in` | `Admin@123` | `/admin/dashboard` |
| **Admin** | `dhirajkumar464748@gmail.com` | `Admin@123` | `/admin/dashboard` |
| **Doctor** | `doctor@pfis.org` | `Doctor@123` | `/doctor/dashboard` |
| **ASHA Worker** | `asha@pfis.org` | `Asha@123` | `/asha/dashboard` |
| **Hospital** | `hospital@apollo.org` | `Hospital@123` | `/hospital/dashboard` |
| **Government** | `government@pfis.org` | `Gov@123` | `/government/dashboard` |
| **Patient** | `patient@pfis.org` | `Patient@123` | `/patient/dashboard` |

---

## 🧪 Automated Testing & Verification

Run the full automated verification test suite:

```bash
# Run 36/36 API & RBAC regression tests
node server/tests/run_all_tests.cjs

# Verify frontend production build
npm --prefix client run build

# Verify backend production build
npm --prefix server run build
```

---

## 📚 Documentation Directory

| Document | Description |
|---|---|
| 📡 [**API.md**](API.md) | Complete OpenAPI specification covering all active endpoints across all 6 roles. |
| 📐 [**ARCHITECTURE.md**](ARCHITECTURE.md) | Architectural blueprints, multi-database abstraction layer, and intelligence engines. |
| 🗄️ [**DATABASE.md**](DATABASE.md) | Relational schema definitions, collections, foreign keys, and indexes. |
| 🛡️ [**SECURITY.md**](SECURITY.md) | Threat modeling, dual-layer RBAC, password hashing, and DPDP compliance. |
| 💡 [**FEATURES.md**](FEATURES.md) | Detailed feature specifications and workflows for each role. |
| 🚀 [**DEPLOYMENT.md**](DEPLOYMENT.md) | Production deployment runbooks for Docker, Compose, Nginx, and cloud platforms. |
| 💻 [**DEVELOPMENT.md**](DEVELOPMENT.md) | Local setup guide, development guidelines, and debugging tips. |
| 🧪 [**TESTING.md**](TESTING.md) | Testing methodology, regression matrices, and test runner details. |
| 🔄 [**WORKFLOW.md**](WORKFLOW.md) | End-to-end user journey sequences and state transition diagrams. |
| 📖 [**PROJECT_DOCUMENTATION.md**](PROJECT_DOCUMENTATION.md) | Comprehensive master documentation covering technical and operational specs. |
| 📝 [**CHANGELOG.md**](CHANGELOG.md) | Release notes, version history, and milestone tracking. |
| 🤝 [**CONTRIBUTING.md**](CONTRIBUTING.md) | Guidelines for contributing code, issues, and documentation. |
| 🗺️ [**ROADMAP.md**](ROADMAP.md) | Future enhancements, ABDM Ayushman Bharat integration, and field cadre mobile app. |
| 🧠 [**MEMORY.md**](MEMORY.md) | Institutional knowledge bank, architectural decisions, and formula index. |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
