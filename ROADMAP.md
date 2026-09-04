# PFIS Strategic Roadmap & Evolution Milestones

This document outlines the strategic vision, completed milestones, and future development horizons for the **Patient Friction Intelligence System (PFIS)**.

---

## 1. Roadmap Milestones Overview

```
[Phase 1: Intelligence Core] ──► [Phase 2: Relational SQL] ──► [Phase 3: RBAC Security]
         (DONE)                          (DONE)                         (DONE)
           │
           ▼
[Phase 4: Cloud & Docker]    ──► [Phase 5: ABDM Integration] ──► [Phase 6: ASHA PWA]
     (CURRENT FOCUS)
```

---

## 2. Detailed Phase Breakdown

### Phase 1: Foundation & Non-Clinical Intelligence Core ✅ COMPLETED
- [x] Defined non-clinical mandate excluding medical diagnoses and drug prescriptions.
- [x] Implemented 8-dimension weighted friction engine (Travel, Transport, Digital, Language, Family Support, Documentation, Cost, Timing).
- [x] Implemented Care-Completion Risk Engine evaluating 5 drop-out milestones.
- [x] Created What-If Simulation Engine with diminishing returns modeling.
- [x] Created Knapsack Budget Intervention Optimizer.
- [x] Built responsive React + Vite client with Glassmorphic visual hierarchy.

### Phase 2: Relational SQL Migration & Vernacular Expansion ✅ COMPLETED
- [x] Migrated from MongoDB/Mongoose to clean Database Abstraction Layer (`IDatabaseClient`).
- [x] Supported PostgreSQL, MySQL, and Zero-Config Embedded Relational SQL.
- [x] Normalized database schema into 13 relational tables with foreign keys.
- [x] Built 11-language internationalization engine (Hindi, Bengali, Marathi, Tamil, Telugu, Gujarati, Kannada, Malayalam, Punjabi, Urdu, English).
- [x] Implemented WCAG 2.1 AA Accessibility Toolbar (Text resize, High Contrast, Simple Language Mode, TTS Voice assistance, Motion reduction).

### Phase 3: Dual-Layer RBAC Hardening & Security Compliance ✅ COMPLETED
- [x] Implemented dual-layer cryptographic Admin Access Control.
- [x] Whitelisted and seeded the 6 authorized administrator accounts:
  - `satyam31sk@gmail.com`
  - `prince.patel2025@lpu.in`
  - `dhirajkumar464748@gmail.com`
  - `xel5760@gmail.com`
  - `tanishka2789@gmail.com`
  - `ddishika45@gmail.com`
- [x] Enforced backend verification in `requireAdmin` middleware.
- [x] Eliminated privilege escalation vulnerabilities in registration and OAuth flows.
- [x] Sanitized client logout caches (`pfis_auth_profile`).
- [x] Hardened CORS to strict domain whitelisting in production.

---

### Phase 4: Production Cloud Deployment & Containerization 🚀 CURRENT FOCUS
- [ ] Dockerize application with multi-stage `Dockerfile` and `docker-compose.yml`.
- [ ] Configure production NGINX reverse proxy with TLS/SSL termination.
- [ ] Set up Kubernetes Helm charts for auto-scaling district hospital traffic.
- [ ] Implement automated CI/CD GitHub Actions pipeline running `tsc`, `test_endpoints.cjs`, and `test_admin_rbac.cjs`.

---

### Phase 5: Ayushman Bharat Digital Mission (ABDM) Integration 🔮 PLANNED
- [ ] Integrate **ABHA (Ayushman Bharat Health Account)** M1, M2, and M3 milestone APIs:
  - ABHA creation & verification via Aadhaar OTP
  - Health Information Provider (HIP) and Health Information User (HIU) consent manager
- [ ] Integrate with **National Health Authority (NHA)** Health Facility Registry (HFR) and Health Professional Registry (HPR).
- [ ] Support PM-JAY cashless pre-authorization operational status badges.

---

### Phase 6: Frontline Worker (ASHA) Offline-First Mobile PWA 🔮 PLANNED
- [ ] Build Offline-First Progressive Web App (PWA) with Service Workers and IndexedDB.
- [ ] Enable ASHA workers and Anganwadi staff to collect non-clinical patient parameters in remote rural villages without internet.
- [ ] Automatic background bidirectional sync with PFIS server when entering cellular range.
- [ ] Vernacular audio prompts for low-literacy health volunteers.

---

### Phase 7: Real-Time Fleet Telemetry & Transit Dispatch 🔮 PLANNED
- [ ] Real-time GPS vehicle tracking for hospital community transit vans and 108/102 rural ambulances.
- [ ] Dynamic transit route optimization grouping multiple patients from neighboring villages for scheduled morning OPD tokens.
- [ ] SMS / IVR transit alerts sent to feature phone patients with estimated bus arrival times.

---

### Phase 8: Predictive Longitudinal Machine Learning 🔮 FUTURE RESEARCH
- [ ] Train gradient-boosted models (XGBoost / LightGBM) on anonymized longitudinal journey outcomes to detect micro-friction patterns.
- [ ] Seasonal weather and monsoon road impassability friction overlays using IMD weather feeds.
- [ ] Cross-district healthcare migration pattern modeling.
