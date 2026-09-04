# Patient Friction Intelligence System (PFIS) — Comprehensive Project Documentation

> **Version**: 1.0.0  
> **Status**: Production-Ready  
> **Target Audience**: Software Engineers, Technical Architects, DevOps Engineers, AI/ML Specialists, and Open-Source Contributors.

---

## 1. Project Overview

### 1.1 Project Name
**Patient Friction Intelligence System (PFIS)**

### 1.2 The Problem It Solves
Globally, and especially across emerging economies like India, hundreds of thousands of patients fall out of the healthcare pipeline not because of medical incurable diagnoses, but because of **non-clinical operational, socio-economic, linguistic, and structural friction**. 

Patients abandon treatment journeys due to:
- Long travel distances and lack of rural-to-urban transit connectivity.
- Rigid hospital OPD queuing that forces daily-wage laborers to forfeit vital household subsistence earnings.
- Severe language barriers and lack of vernacular translation for clinical instructions.
- Fragmented physical paperwork, missing identification, and complex insurance verification.
- Low digital literacy and unfamiliarity with smartphone health portals.
- Inability to secure trusted escorts or family support for clinical appointments.

Conventional Hospital Information Systems (HIS) and Electronic Health Records (EHRs) track medical vitals (e.g., blood pressure, diagnosis codes, lab panels) but remain completely blind to **operational accessibility barriers**. PFIS fills this critical systemic void.

### 1.3 Main Purpose
PFIS is an **Explainable Artificial Intelligence (XAI) and Operational Intelligence Platform** that:
1. Calculates a multi-dimensional **Patient Friction Fingerprint (0–100 score)** across 8 non-clinical dimensions.
2. Evaluates non-clinical drop-off risk using a transparent causal inference engine.
3. Simulates a **Patient Digital Twin** to preview the operational viability of appointments before a patient steps out of their house.
4. Equips hospital administrators and public health policymakers with **Population Friction Hotspot Maps**, **Care Leakage Funnels**, **Why Care Failed Causal Classifiers**, and a **0/1 Knapsack Intervention Optimizer** that recommends the highest-impact healthcare policy interventions within budgetary constraints.
5. Bridges digital divides through a **11-Language Vernacular System**, **Text-to-Speech (TTS)** voice assistants, and an **Accessibility Toolbar** (WCAG 2.1 AAA high-contrast and text scaling).

### 1.4 Target Users
| Target User Group | Key Objectives in PFIS | Primary Interfaces |
| :--- | :--- | :--- |
| **Patients & Caregivers** | View personalized friction barriers, discover accessible nearby hospitals, submit non-clinical transit/escort requests, store documents, and conduct virtual teleconsultations. | Patient Portal, Mobile Responsive Views, Vernacular Voice Modals |
| **Hospital Triage Coordinators** | Monitor incoming patient access requests, triage patient appointments based on travel constraints, assign tokens, and resolve documentation bottlenecks. | Hospital Desk Dashboard, Request Manager, Department Token Allocator |
| **Healthcare Administrators & Policymakers** | Analyze population-wide care completion bottlenecks, model public health subsidy scenarios, and allocate healthcare budgets with algorithmic precision. | Admin Intelligence Suite, What-If Simulator, Intervention Optimizer, Friction Heatmap |

### 1.5 Key Goals
- **Eliminate Preventable Non-Clinical Care Drop-offs**: Target zero care abandonment resulting from logistical or linguistic confusion.
- **Provide 100% Explainable Scores**: Deliver deterministic, mathematically grounded scores with actionable, human-readable explanations instead of opaque "black-box" outputs.
- **Deliver Universal Accessibility**: Full vernacular support across 11 major Indian languages with audio assistance for low-literacy populations.
- **Enable Data-Driven Health Policy**: Quantify exact returns in "lives helped" and "journey completion percentage" for every rupee of public healthcare funding deployed.

### 1.6 High-Level Architecture Overview
```mermaid
graph TD
    subgraph Client ["Client (React 18 + Vite + Tailwind CSS)"]
        UI[Vernacular UI & Accessibility Layer]
        Contexts[Auth, Language, Location, Accessibility Contexts]
        Services[Modular API Services]
        UI --> Contexts
        Contexts --> Services
    end

    subgraph Gateway ["API Gateway & Security Middleware"]
        Helmet[Helmet Security Headers]
        Cors[CORS Policy]
        Limiter[Rate Limiter]
        JWT[JWT & RBAC Gatekeeper]
    end

    subgraph Backend ["Backend (Node.js + Express + TypeScript)"]
        Controllers[API Route Controllers]
        Engines[PFIS Intelligence Engines]
        Controllers --> Engines
    end

    subgraph Storage ["Hybrid Relational Storage Architecture"]
        PG[(PostgreSQL Pool)]
        MySQL[(MySQL Pool)]
        EmbeddedSQL[(Embedded Relational SQL Engine)]
    end

    Services --> Gateway
    Gateway --> Controllers
    Controllers --> Storage
    Engines --> Storage
```

---

## 2. Technology Stack

### 2.1 Technology Matrix & Technical Justification

| Technology | Domain | Why It Was Chosen |
| :--- | :--- | :--- |
| **React 18** | Frontend Framework | Declarative component model, concurrent rendering, virtual DOM diffing for rapid UI updates, and native support for code splitting with `React.lazy` and `Suspense`. |
| **TypeScript 5** | Language (Fullstack) | Static typing guarantees strict contract integrity between frontend API services, backend Express routes, and relational database schemas. Prevents runtime `undefined` errors across complex intelligence data models. |
| **Vite 6** | Frontend Tooling | Instant Hot Module Replacement (HMR), lightning-fast esbuild pre-bundling, and optimized Rollup production builds with granular chunk splitting. |
| **Tailwind CSS 3.4** | UI Styling | Utility-first CSS architecture with zero runtime overhead. Configured for a tailored light health-tech design system, high-contrast accessibility tokens, and responsive mobile layouts. |
| **Lucide React** | UI Iconography | Crisp, lightweight, modern SVG icons replacing non-standard emojis to deliver an ultra-clean, clinical enterprise aesthetic. |
| **Recharts** | Data Visualization | SVG-based responsive charting library perfectly suited for friction radar charts, completion gauges, leakage funnels, and demographic bar graphs. |
| **Leaflet & React-Leaflet** | GIS Mapping | Lightweight, open-source geospatial visualization library capable of rendering facility pins, patient distance radii, and district friction heatmaps without heavy proprietary SDK dependencies. |
| **i18next & react-i18next** | Internationalization | Robust localization framework supporting 11 major Indian languages (English, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Urdu, Kannada, Malayalam, Punjabi) with instant runtime language switching. |
| **Node.js 18+ / Express** | Backend Engine | Asynchronous, non-blocking I/O event loop ideal for high-concurrency healthcare API requests, streaming document uploads, and rapid algorithmic intelligence calculations. |
| **Hybrid Database Layer** | Data Persistence | Universal database abstraction interface supporting production PostgreSQL (`pg`), enterprise MySQL (`mysql2`), and an integrated zero-setup Embedded Relational SQL engine (`pfis_relational.json`) that executes ANSI SQL without external server dependencies. |
| **JSON Web Tokens (JWT)** | Authentication | Cryptographically signed, stateless authentication tokens allowing seamless horizontal scaling and secure client-side role persistence. |
| **bcryptjs** | Password Security | Secure one-way salt and hash algorithm protecting user credentials against dictionary and rainbow table attacks. |
| **Helmet & Express Rate Limit**| Security Middleware | Hardens HTTP response headers against XSS and clickjacking while protecting API endpoints against brute-force and DDoS attempts. |

---

## 3. Complete Project Structure

```
d:/pfis/
├── .env.example                 → Root environment configuration template
├── .gitignore                   → Git repository ignore rules (protects data, uploads, build artifacts)
├── API.md                       → Complete API reference documentation
├── ARCHITECTURE.md              → High-level technical architecture and engine design specifications
├── CHANGELOG.md                 → Historical record of releases, fixes, and system improvements
├── CONTRIBUTING.md               → Developer guidelines, coding standards, and contribution workflow
├── DATABASE.md                  → Database relational schemas, ER diagrams, and repository guides
├── DEPLOYMENT.md                → Production deployment guides (Vercel, Render, Docker, Cloud Run)
├── DEVELOPMENT.md               → Local setup, dev scripts, and verification instructions
├── FEATURES.md                  → Detailed functional feature breakdown and capability registry
├── MEMORY.md                    → Project milestones, architecture decisions, and historical memory
├── package.json                 → Root npm configuration configuring npm workspaces (client & server)
├── README.md                    → Repository overview, quick-start guide, and badges
├── ROADMAP.md                   → Future feature roadmap (telemedicine WebRTC, IoT integration, etc.)
├── SECURITY.md                  → Security policies, vulnerability disclosure, and RBAC specifications
├── TESTING.md                   → QA testing framework, test suite runners, and verification logs
├── vercel.json                  → Vercel production deployment configuration and SPA rewrite rules
├── WORKFLOW.md                  → System operational workflows, user journeys, and lifecycle states
│
├── client/                      → Frontend React 18 Application
│   ├── .env.example             → Frontend environment variable template
│   ├── index.html               → Main HTML entry point with light-theme class and SEO metadata
│   ├── package.json             → Frontend dependencies, scripts, and build commands
│   ├── postcss.config.js        → PostCSS processor configuration for Tailwind CSS
│   ├── tailwind.config.js       → Tailwind design tokens, typography, and light palette definitions
│   ├── tsconfig.json            → Frontend TypeScript compilation configuration
│   ├── tsconfig.node.json       → Node tooling TypeScript configuration
│   ├── vite.config.ts           → Vite bundler config with chunking and server proxy rules
│   │
│   └── src/
│       ├── App.tsx              → Root routing component, route lazy-loading, and context wrappers
│       ├── main.tsx             → React DOM client bootstrap entry point
│       ├── index.css            → Core CSS, Tailwind directives, and custom accessibility utilities
│       ├── vite-env.d.ts        → Vite environment variable typings
│       │
│       ├── components/          → Reusable UI Component Library
│       │   ├── charts/          → Operational data visualization widgets
│       │   │   ├── CareFailureDonutChart.tsx   → Donut breakdown of non-clinical care failure causes
│       │   │   ├── CompletionGauge.tsx          → Circular SVG completion probability gauge
│       │   │   ├── FrictionBarChart.tsx         → Horizontal bar chart decomposing 8 friction factors
│       │   │   ├── FrictionRadarChart.tsx       → Multi-axis radar diagram of patient friction factors
│       │   │   └── LeakageFunnelChart.tsx       → Step-by-step patient care drop-off funnel
│       │   ├── common/          → General design system widgets
│       │   │   ├── AccessibilityToolbar.tsx    → Floating high-contrast, font-scale & TTS toggle bar
│       │   │   ├── Button.tsx                  → Standard design system button with loading states
│       │   │   ├── DemoModeBanner.tsx          → Top banner showing 1-click role switcher
│       │   │   ├── EmptyState.tsx              → Graceful placeholder for empty data lists
│       │   │   ├── ErrorAlert.tsx              → Standardized dismissable error alert
│       │   │   ├── FirstVisitLanguageModal.tsx → Welcome modal prompting new users for vernacular choice
│       │   │   ├── Input.tsx                   → Accessible form input with label and error validation
│       │   │   ├── LanguageSelector.tsx        → Dropdown selector for all 11 supported languages
│       │   │   ├── LoadingSkeleton.tsx         → Animated placeholder skeleton for loading states
│       │   │   ├── Modal.tsx                   → Accessible dialog modal with backdrop blur
│       │   │   ├── SimpleModeToggle.tsx        → Toggle simplifying UI density for rural/low-literacy users
│       │   │   ├── StatCard.tsx                → Metric card with trend indicator and icon accent
│       │   │   ├── StatusBadge.tsx             → Color-coded status badge for requests and appointments
│       │   │   ├── TTSButton.tsx               → One-click Web Speech API Text-to-Speech audio reader
│       │   │   └── VoiceSearchButton.tsx       → Speech recognition input button for voice queries
│       │   ├── layout/          → Structural portal layout components
│       │   │   ├── Footer.tsx                  → Standard footer with copyright and platform links
│       │   │   ├── Navbar.tsx                  → Top navigation bar with notifications and profile menu
│       │   │   └── Sidebar.tsx                 → Role-aware collapsible sidebar navigation
│       │   ├── maps/            → Geospatial mapping components
│       │   │   └── HospitalMap.tsx             → Interactive Leaflet map showing facilities and distances
│       │   └── patient/         → Patient-centric components
│       │       ├── ConsentModal.tsx            → Granular data sharing and non-clinical consent modal
│       │       ├── JourneyTimeline.tsx         → Sequential milestone timeline of patient care stages
│       │       └── RequestTimeline.tsx         → Audit trail of status transitions for a specific request
│       │
│       ├── context/             → React Context Providers (Global State)
│       │   ├── AccessibilityContext.tsx        → Font size scaling, high-contrast, and simple mode state
│       │   ├── AuthContext.tsx                 → User authentication, JWT storage, role state, and demo login
│       │   ├── LanguageContext.tsx             → Current language, locale translation triggers, and audio
│       │   ├── LocationContext.tsx             → User geolocation, coordinates, and nearby radius state
│       │   ├── NotificationContext.tsx         → Live polling and unread counter for in-app alerts
│       │   └── ToastContext.tsx                → Non-blocking global toast feedback notifications
│       │
│       ├── hooks/               → Custom React Hooks
│       │   └── useSpeechRecognition.ts         → Browser Web Speech API hook for vernacular voice input
│       │
│       ├── i18n/                → Localization Files (11 Languages)
│       │   ├── config.ts                       → i18next configuration and fallback settings
│       │   ├── index.ts                        → Export entry point for i18n instance
│       │   └── locales/                        → JSON locale catalogs (en, hi, bn, te, mr, ta, gu, ur, kn, ml, pa)
│       │
│       ├── layouts/             → Role-Specific Layout Shells
│       │   ├── AdminLayout.tsx                 → Shell for administrative intelligence views
│       │   ├── AuthLayout.tsx                  → Minimalist shell for login, registration, and password recovery
│       │   ├── HospitalLayout.tsx              → Shell for hospital triage and department views
│       │   ├── MainLayout.tsx                  → Public shell for landing, about, contact, and architecture
│       │   └── PatientLayout.tsx               → Shell for patient portal with navigation and alerts
│       │
│       ├── pages/               → Application Route Pages (36 Pages)
│       │   ├── LandingPage.tsx                 → High-impact public landing page with interactive demos
│       │   ├── admin/                          → Administrative Intelligence Suite
│       │   │   ├── AdminDashboard.tsx          → Executive oversight of population metrics and barriers
│       │   │   ├── AdminHospitals.tsx          → Facility management, department audits, and credentials
│       │   │   ├── AdminPatients.tsx           → Patient directory with friction scores and status flags
│       │   │   ├── AuditLogs.tsx               → Immutable audit log viewer for compliance tracking
│       │   │   ├── CareFailure.tsx             → Causal breakdown of why patients failed to complete care
│       │   │   ├── CareLeakage.tsx             → Funnel analysis quantifying stage-by-stage patient drop-offs
│       │   │   ├── InterventionOptimizer.tsx   → 0/1 Knapsack public health budget allocation engine
│       │   │   ├── PopulationFrictionMap.tsx   → Geographic heatmap displaying district-level friction
│       │   │   └── WhatIfSimulator.tsx         → Interactive policy simulator testing intervention packages
│       │   ├── auth/                           → Authentication Pages
│       │   │   ├── ForgotPassword.tsx          → Request password reset OTP / instructions
│       │   │   ├── GoogleCallback.tsx          → OAuth2 callback redirect handler
│       │   │   ├── Login.tsx                   → User sign-in with 1-click role presets
│       │   │   ├── Register.tsx                → Patient and healthcare provider registration
│       │   │   └── ResetPassword.tsx           → Set new password with confirmation
│       │   ├── hospital/                       → Hospital Care Desk Pages
│       │   │   ├── HospitalDashboard.tsx       → Triage overview, appointment queues, and token stats
│       │   │   ├── HospitalDepartments.tsx     → Department management, daily token limits, and fees
│       │   │   ├── HospitalProfile.tsx         → Facility details, bed counts, and contact coordinates
│       │   │   ├── HospitalRequestDetails.tsx  → In-depth triage of a patient support request
│       │   │   └── HospitalRequests.tsx        → Filterable queue of incoming patient assistance requests
│       │   ├── patient/                        → Patient Care Portal
│       │   │   ├── AccessibilityRisk.tsx       → Detailed breakdown of personalized non-clinical risks
│       │   │   ├── DigitalTwinSimulator.tsx    → Interactive scenario modeling for patient journeys
│       │   │   ├── FrictionFingerprint.tsx     → 8-factor spider/bar decomposition of patient friction
│       │   │   ├── HospitalDetails.tsx         → Hospital profile, departments, and appointment booking
│       │   │   ├── NearbyHospitals.tsx         → Geolocation-powered search for accessible facilities
│       │   │   ├── PatientDashboard.tsx        → Patient home base with friction meter and active alerts
│       │   │   ├── PatientDocuments.tsx        → Digital vault for identity, ration cards, and prescriptions
│       │   │   ├── PatientNotifications.tsx    → Alert center for appointments and request updates
│       │   │   ├── PatientProfile.tsx          → Editable patient socio-demographic parameters
│       │   │   ├── PatientRequests.tsx         → Tracking list of submitted non-clinical support requests
│       │   │   ├── PatientSettings.tsx         → Account preferences, language selection, and theme settings
│       │   │   ├── RequestDetails.tsx          → Timeline and details of an active patient support request
│       │   │   └── TeleconsultationRoom.tsx    → Virtual navigation room for remote consultation
│       │   └── public/                         → Public Information Pages
│       │       ├── About.tsx                   → Mission, academic rationale, and operational philosophy
│       │       ├── Contact.tsx                 → Support contact form and emergency medical helplines
│       │       ├── NotFound.tsx                → Accessible 404 page with route navigation
│       │       └── SystemArchitecture.tsx      → Detailed architectural blueprints and engine diagrams
│       │
│       ├── services/            → Modular API Client Services (Axios HTTP abstraction)
│       │   ├── adminService.ts                 → Admin endpoints (friction maps, leakage, interventions)
│       │   ├── api.ts                          → Base Axios client with automatic Bearer token injection
│       │   ├── authService.ts                  → Authentication endpoints (login, register, OAuth, profile)
│       │   ├── documentService.ts              → Document upload, retrieval, and deletion endpoints
│       │   ├── hospitalService.ts              → Facility discovery, department queries, and token updates
│       │   ├── intelligenceService.ts          → What-If simulations and Knapsack optimization calls
│       │   ├── notificationService.ts          → Alert polling and read-state toggling
│       │   ├── patientService.ts               → Patient profile, friction calculations, and risk endpoints
│       │   └── requestService.ts               → Patient non-clinical request creation and status tracking
│       │
│       └── types/               → Global TypeScript Interface Definitions
│           └── index.ts                        → User, Patient, Hospital, Friction, Request & Simulation models
│
└── server/                      → Backend Node.js & Express API Server
    ├── package.json             → Backend dependencies, scripts, and build targets
    ├── tsconfig.json            → Backend TypeScript compiler options
    ├── uploads/                 → Static uploads directory for patient identity and medical files
    │   └── .gitkeep             → Preserves directory structure in git
    │
    ├── src/
    │   ├── app.ts               → Express application factory, middleware pipeline, and route mounts
    │   ├── server.ts            → HTTP server entry point with graceful shutdown handling
    │   │
    │   ├── config/              → Server Configuration
    │   │   ├── database.ts      → Database connection parameters and pooling initialization
    │   │   └── env.ts           → Typed environment configuration with validation and defaults
    │   │
    │   ├── controllers/         → Express Request/Response Handlers
    │   │   ├── adminController.ts              → Admin metrics, friction maps, audit logs, and hospital CRUD
    │   │   ├── authController.ts               → Authentication, JWT issuing, bcrypt checking, Google OAuth
    │   │   ├── consentController.ts            → Data sharing consent logging and revocation
    │   │   ├── documentController.ts           → Multipart file uploads, mime validation, and file streaming
    │   │   ├── hospitalController.ts           → Facility directory, department operations, and radius queries
    │   │   ├── interventionController.ts       → Policy intervention catalog and Knapsack optimization
    │   │   ├── languageController.ts           → Supported vernacular language registry and dialect metadata
    │   │   ├── notificationController.ts       → In-app notifications and read confirmations
    │   │   ├── patientController.ts            → Patient profiles, friction calculations, and journey timelines
    │   │   ├── requestController.ts            → Non-clinical support requests lifecycle management
    │   │   └── simulationController.ts         → What-If simulation execution and catalog delivery
    │   │
    │   ├── database/            → Data Persistence Layer
    │   │   ├── db.ts            → Unified database client supporting PostgreSQL, MySQL, and Embedded SQL
    │   │   ├── schema.sql       → Full ANSI SQL schema definitions for 13 relational tables
    │   │   ├── sqlModel.ts      → Lightweight SQL query builder and object mapper
    │   │   └── repositories/    → Repository Pattern Implementations
    │   │       ├── AuditRepository.ts          → Query and persist compliance audit logs
    │   │       ├── DocumentRepository.ts       → Metadata and path tracking for uploaded documents
    │   │       ├── FrictionRepository.ts       → Persist calculated friction profiles and factor scores
    │   │       ├── HospitalRepository.ts       → Geospatial queries, facility details, and departments
    │   │       ├── NotificationRepository.ts   → User alerts, read statuses, and timestamps
    │   │       ├── PatientRepository.ts        → Patient socio-demographic records and profile updates
    │   │       ├── RequestRepository.ts        → Non-clinical request tracking and status updates
    │   │       └── UserRepository.ts           → User accounts, hashed passwords, roles, and emails
    │   │
    │   ├── intelligence/        → Explainable AI & Intelligence Engines
    │   │   ├── causal/
    │   │   │   ├── frictionInteractionEngine.ts → Multi-barrier interaction matrix (e.g., Distance × Inflexible Job)
    │   │   │   └── whyCareFailedClassifier.ts   → Root-cause attribution of historical care failure drop-offs
    │   │   ├── friction/
    │   │   │   └── frictionEngine.ts            → Deterministic 8-dimensional friction calculation engine
    │   │   ├── optimization/
    │   │   │   ├── interventionOptimizer.ts     → 0/1 Knapsack algorithm maximizing lives helped under budget
    │   │   │   └── whatIfSimulator.ts           → Counterfactual simulation model for health policies
    │   │   └── risk/
    │   │       └── riskEngine.ts                → Operational accessibility drop-off risk classifier
    │   │
    │   ├── middleware/          → Express Interceptors
    │   │   ├── authMiddleware.ts                → Verifies JWT Bearer tokens and attaches `req.user`
    │   │   ├── errorMiddleware.ts               → Centralized error handler returning standardized JSON errors
    │   │   ├── roleMiddleware.ts                → Strict RBAC guard restricting routes to authorized roles
    │   │   └── uploadMiddleware.ts              → Multer multipart configuration with file size & type limits
    │   │
    │   ├── models/              → In-Memory Data Models & Entity Interfaces
    │   │   ├── AuditLog.ts                      → Audit event schema
    │   │   ├── CareJourney.ts                   → Sequential patient journey milestone definitions
    │   │   ├── CareLeakage.ts                   → Stage-by-stage patient leakage statistics
    │   │   ├── CareRisk.ts                      → Personalized barrier risk model
    │   │   ├── Consent.ts                       → Patient data consent permissions
    │   │   ├── FrictionInteraction.ts           → Compounding barrier interaction model
    │   │   ├── FrictionProfile.ts               → Comprehensive friction profile structure
    │   │   ├── Hospital.ts                      → Hospital facility entity interface
    │   │   ├── HospitalDepartment.ts            → Clinical department and token allocation interface
    │   │   ├── HospitalRequest.ts               → Patient assistance request entity interface
    │   │   ├── Intervention.ts                  → Policy intervention catalog interface
    │   │   ├── Notification.ts                  → Notification entity interface
    │   │   ├── Patient.ts                       → Patient demographic and operational parameters
    │   │   ├── PatientDocument.ts               → Document metadata interface
    │   │   ├── Simulation.ts                    → What-If simulation request and result schemas
    │   │   └── User.ts                          → User credential and authentication schema
    │   │
    │   ├── routes/              → Express Router Declarations
    │   │   ├── adminRoutes.ts                   → `/api/admin` endpoints
    │   │   ├── authRoutes.ts                    → `/api/auth` endpoints
    │   │   ├── consentRoutes.ts                 → `/api/consents` endpoints
    │   │   ├── documentRoutes.ts                → `/api/documents` endpoints
    │   │   ├── hospitalRoutes.ts                → `/api/hospitals` endpoints
    │   │   ├── index.ts                         → Master API router mounting all sub-routes
    │   │   ├── interventionRoutes.ts            → `/api/interventions` endpoints
    │   │   ├── languageRoutes.ts                → `/api/languages` endpoints
    │   │   ├── notificationRoutes.ts            → `/api/notifications` endpoints
    │   │   ├── patientRoutes.ts                 → `/api/patients` endpoints
    │   │   ├── requestRoutes.ts                 → `/api/requests` endpoints
    │   │   └── simulationRoutes.ts              → `/api/simulation` endpoints
    │   │
    │   ├── seed/                → Database Initialization & Sample Data
    │   │   ├── runRelationalSeed.ts             → Executable script seeding the relational database
    │   │   ├── seed.ts                          → In-memory seed loader
    │   │   ├── seedData.ts                      → Realistic Indian demographic and facility seed datasets
    │   │   └── seedRelational.ts                → ANSI SQL seed generator for all 13 tables
    │   │
    │   ├── services/            → Backend Business Logic & External Integrations
    │   │   ├── auditService.ts                  → Centralized audit logger recording IP, user agent, and actions
    │   │   ├── googleMapsService.ts             → Google Maps Places & Distance Matrix API client
    │   │   ├── notificationService.ts           → Dispatcher for transactional in-app notifications
    │   │   ├── realHospitalDiscoveryService.ts  → Geospatial facility locator with fallback to Delhi NCR dataset
    │   │   └── translationService.ts            → Vernacular dictionary service for localized text strings
    │   │
    │   ├── types/               → Backend Ambient Typings
    │   │   └── pg.d.ts                          → Type augmentations for PostgreSQL drivers
    │   │
    │   └── utils/               → Utility Functions
    │       └── jwt.ts                           → JWT generation, verification, and payload extraction helpers
    │
    └── tests/                   → Automated QA & Verification Suite
        ├── api_verification.test.cjs            → 10-point core API and intelligence engine verification
        ├── rbac_security.test.cjs               → 8-point RBAC and cryptographic privilege escalation test
        └── run_all_tests.cjs                    → Master test orchestrator with ephemeral server lifecycle
```

---

## 4. Feature Documentation

### Feature 1: Patient Friction Fingerprint & Scoring Engine
- **Purpose**: Deconstructs a patient's non-clinical profile into an overall score (0–100) and 8 distinct barrier scores to quantify exactly why healthcare access is difficult.
- **User Flow**: Patient enters demographic details (location, distance, transit options, language, smartphone access, work flexibility) on the Profile page. The engine instantly computes their friction fingerprint, displays an interactive radar chart, and identifies their primary barrier.
- **Files Involved**: `client/src/pages/patient/FrictionFingerprint.tsx`, `client/src/components/charts/FrictionRadarChart.tsx`, `server/src/intelligence/friction/frictionEngine.ts`, `server/src/controllers/patientController.ts`.
- **Backend/API Dependencies**: `GET /api/patients/me/friction`.
- **Database Dependencies**: `patient_profiles`, `friction_profiles`, `friction_factors`.
- **Authentication**: Required (`patient` role).

### Feature 2: Explainable Accessibility Risk Engine
- **Purpose**: Classifies a patient's drop-off probability into risk categories (Low, Medium, High, Critical) and outputs actionable, plain-language mitigation strategies.
- **User Flow**: Patient or triage desk views the Accessibility Risk screen. System details compounding risk interactions (e.g., "Daily Wage Earner + 35km Distance = Severe Risk of Foregone Care") and suggests mitigations (e.g., "Request Saturday afternoon OPD token").
- **Files Involved**: `client/src/pages/patient/AccessibilityRisk.tsx`, `server/src/intelligence/risk/riskEngine.ts`, `server/src/intelligence/causal/frictionInteractionEngine.ts`.
- **Backend/API Dependencies**: `GET /api/patients/me/risk`.
- **Database Dependencies**: `patient_profiles`, `accessibility_risks`.
- **Authentication**: Required (`patient`, `hospital`, or `admin`).

### Feature 3: Patient Digital Twin Simulator
- **Purpose**: Allows patients and care coordinators to run "what-if" journey experiments by toggling parameters (e.g., changing transit mode from Bus to Shuttle, or selecting a hospital with local language support) to preview changes in drop-off probability before traveling.
- **User Flow**: User adjusts sliders for travel time, accompaniment, and language preferences. The digital twin recalculates completion probability in real-time.
- **Files Involved**: `client/src/pages/patient/DigitalTwinSimulator.tsx`, `client/src/components/charts/CompletionGauge.tsx`, `server/src/intelligence/friction/frictionEngine.ts`.
- **Backend/API Dependencies**: `POST /api/simulation/run`.
- **Database Dependencies**: Read-only calculation against simulation heuristics.
- **Authentication**: Required (`patient` or `admin`).

### Feature 4: 11-Language Vernacular System & Audio TTS
- **Purpose**: Eliminates language-based care exclusion for diverse linguistic demographics across India.
- **User Flow**: On first visit, a modal prompts users to select their native language. All navigation headers, labels, and explanations instantly render in that language. A floating speaker icon triggers native Text-to-Speech (Web Speech API) to read text aloud for low-literacy patients.
- **Files Involved**: `client/src/i18n/`, `client/src/components/common/LanguageSelector.tsx`, `client/src/components/common/TTSButton.tsx`, `client/src/components/common/FirstVisitLanguageModal.tsx`.
- **Backend/API Dependencies**: `GET /api/languages`.
- **Database Dependencies**: None (frontend i18n JSON catalogs).
- **Authentication**: Publicly accessible.

### Feature 5: Accessible Healthcare Facility Discovery
- **Purpose**: Geolocation-enabled search that finds nearby hospitals and ranks them by non-clinical compatibility (distance, vernacular language match, teleconsultation availability).
- **User Flow**: Patient opens the Nearby Hospitals view. The browser requests coordinates (with automatic fallback to Delhi NCR hub). The system displays a Leaflet map with facilities, travel times, bed availability, and transit instructions.
- **Files Involved**: `client/src/pages/patient/NearbyHospitals.tsx`, `client/src/pages/patient/HospitalDetails.tsx`, `client/src/components/maps/HospitalMap.tsx`, `server/src/services/realHospitalDiscoveryService.ts`.
- **Backend/API Dependencies**: `GET /api/hospitals/nearby?lat=...&lng=...&radius=...`.
- **Database Dependencies**: `hospitals`, `hospital_services`.
- **Authentication**: Public / Patient.

### Feature 6: Non-Clinical Support Requests & Triage Management
- **Purpose**: Enables vulnerable patients to request non-clinical assistance (e.g., hospital escort, wheelchair support, transit shuttle, vernacular interpreter, or token booking) and allows hospital staff to approve and manage requests.
- **User Flow**: Patient selects support category, adds notes, and submits. Hospital triage desk receives the request in their live queue, reviews patient friction context, and updates status to "Approved" or "Completed".
- **Files Involved**: `client/src/pages/patient/PatientRequests.tsx`, `client/src/pages/hospital/HospitalRequests.tsx`, `client/src/pages/hospital/HospitalRequestDetails.tsx`, `server/src/controllers/requestController.ts`.
- **Backend/API Dependencies**: `POST /api/requests`, `GET /api/requests/patient`, `GET /api/requests/hospital`, `PATCH /api/requests/:id/status`.
- **Database Dependencies**: `requests`, `users`, `hospitals`, `notifications`.
- **Authentication**: Required (`patient` to create, `hospital` to triage).

### Feature 7: Digital Document Vault
- **Purpose**: Secure repository for non-clinical patient documentation (Aadhaar cards, BPL ration cards, Ayushman Bharat insurance passes, previous OPD slips) to prevent paperwork rejections at the hospital desk.
- **User Flow**: Patient uploads PDF or image files. Files are validated for MIME type and size, stored in the uploads directory, and made accessible for hospital desk verification.
- **Files Involved**: `client/src/pages/patient/PatientDocuments.tsx`, `server/src/controllers/documentController.ts`, `server/src/middleware/uploadMiddleware.ts`.
- **Backend/API Dependencies**: `POST /api/documents`, `GET /api/documents`, `DELETE /api/documents/:id`.
- **Database Dependencies**: `documents`.
- **Authentication**: Required (`patient` role).

### Feature 8: Virtual Teleconsultation Navigation Room
- **Purpose**: Reduces unnecessary physical travel by providing remote non-clinical pre-triage and navigation sessions before a patient undertakes a long journey.
- **User Flow**: Patient joins a scheduled teleconsultation room with video, audio, screen share, chat, and an integrated vernacular live-caption interface.
- **Files Involved**: `client/src/pages/patient/TeleconsultationRoom.tsx`.
- **Backend/API Dependencies**: `GET /api/requests/:id`.
- **Database Dependencies**: `teleconsultations`, `appointments`.
- **Authentication**: Required (`patient` or `hospital`).

### Feature 9: Population Friction Heatmap & Hotspot Analysis
- **Purpose**: Macro-level dashboard for healthcare administrators displaying district-by-district friction concentrations and predominant regional barriers.
- **User Flow**: Admin selects district nodes on an interactive map to view aggregated metrics (average travel distance, daily-wage risk proportion, predominant linguistic mismatches).
- **Files Involved**: `client/src/pages/admin/PopulationFrictionMap.tsx`, `server/src/controllers/adminController.ts`.
- **Backend/API Dependencies**: `GET /api/admin/friction-map`.
- **Database Dependencies**: `patient_profiles`, `friction_profiles`, `hospitals`.
- **Authentication**: Required (`admin` role).

### Feature 10: 0/1 Knapsack Public Health Intervention Optimizer
- **Purpose**: Solves the mathematical budget allocation problem for public health directors. Given a fixed budget (e.g., ₹10,00,000), it determines the exact combination of policy interventions that maximizes estimated lives helped and overall journey completion gains.
- **User Flow**: Administrator inputs available budget and cohort size. The algorithm evaluates all $2^N$ combinatorial intervention subsets in milliseconds, rendering the optimal package, total cost, lives saved, and sensitivity curves.
- **Files Involved**: `client/src/pages/admin/InterventionOptimizer.tsx`, `server/src/intelligence/optimization/interventionOptimizer.ts`.
- **Backend/API Dependencies**: `POST /api/interventions/optimize`.
- **Database Dependencies**: None (computational algorithmic engine).
- **Authentication**: Required (`admin` role).

### Feature 11: Care Leakage Funnel & Drop-off Stage Analytics
- **Purpose**: Visualizes patient retention through every milestone of healthcare delivery: Awareness → Facility Selection → Transit & Travel → OPD Check-in → Consultation → Diagnostic Tests → Prescription Adherence.
- **User Flow**: Administrator inspects the leakage funnel to identify the exact stage experiencing the steepest drop-off gradient (e.g., 42% drop between Transit and OPD Check-in).
- **Files Involved**: `client/src/pages/admin/CareLeakage.tsx`, `client/src/components/charts/LeakageFunnelChart.tsx`.
- **Backend/API Dependencies**: `GET /api/admin/care-leakage`.
- **Database Dependencies**: `appointments`, `requests`, `patient_profiles`.
- **Authentication**: Required (`admin` role).

### Feature 12: Why Care Failed Causal Classifier
- **Purpose**: Delivers empirical causal attribution for historical care drop-offs, identifying the root causes and providing systemic policy recommendations.
- **User Flow**: Administrator opens the Care Failure analysis page. A donut chart breaks down drop-off causes (e.g., 36% Travel Distance, 21% Wage Loss, 17% Diagnostic Delays), accompanied by specific root-cause cards.
- **Files Involved**: `client/src/pages/admin/CareFailure.tsx`, `client/src/components/charts/CareFailureDonutChart.tsx`, `server/src/intelligence/causal/whyCareFailedClassifier.ts`.
- **Backend/API Dependencies**: `GET /api/admin/care-failure`.
- **Database Dependencies**: Read-only causal classifier model.
- **Authentication**: Required (`admin` role).

---

## 5. Application Architecture

### 5.1 Frontend Architecture
The frontend is structured around a modular, reactive architecture utilizing React 18, React Router v6, and React Context.
- **Static Shells vs Lazy Pages**: Layout wrappers (`MainLayout`, `PatientLayout`, `HospitalLayout`, `AdminLayout`) are bundled statically to guarantee zero layout shift (CLS). All 36 feature pages are lazy-loaded via `React.lazy()` with route-level Suspense boundaries.
- **Single Source of Truth**: Global operational concerns (authentication, active language, device geolocation, accessibility preferences, live notifications) are managed via dedicated Context providers that wrap the route hierarchy.
- **Design System Tokens**: Built on Tailwind CSS with explicit class names (`bg-white`, `text-slate-800`, `border-slate-200`, `accent teal-600`), permanently locking the UI into an elegant, high-contrast light theme.

### 5.2 Backend Architecture
The backend is built as a modular Express server structured around the classic **Controller-Service-Repository Pattern**:
1. **Routing Layer (`routes/`)**: Mounts endpoints, applies path-specific rate limiters, and enforces authentication and role guards.
2. **Controller Layer (`controllers/`)**: Handles HTTP parameter extraction, input validation, and HTTP status code dispatch.
3. **Intelligence Layer (`intelligence/`)**: Standalone, deterministic mathematical engines performing friction scoring, causal classification, and optimization.
4. **Service Layer (`services/`)**: Orchestrates external APIs (Google Maps), audit logging, and transactional notifications.
5. **Repository Layer (`database/repositories/`)**: Abstracted database access executing parameterized ANSI SQL queries.

### 5.3 Database Architecture
PFIS incorporates a universal database interface (`IDatabaseClient` in `db.ts`) that decouples business logic from specific storage engines:
- **PostgreSQL Driver**: Connects via connection pooling (`pg.Pool`) when `DATABASE_URL` is supplied.
- **MySQL Driver**: Connects via `mysql2.createPool` when `MYSQL_URL` is supplied.
- **Embedded SQL Driver**: High-performance, zero-dependency relational engine that loads and persists tables to `server/data/pfis_relational.json`. It supports ANSI SQL queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`, `WHERE`, `ORDER BY`, `LIMIT`) and maintains full relational integrity.

### 5.4 Authentication & Security Architecture
```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Client as Frontend (React)
    participant AuthAPI as Auth Controller
    participant DB as User Repository
    participant JWT as JWT Utility

    User->>Client: Enters Email & Password
    Client->>AuthAPI: POST /api/auth/login
    AuthAPI->>DB: Query user by email
    DB-->>AuthAPI: User record (with bcrypt hash)
    AuthAPI->>AuthAPI: bcrypt.compare(password, hash)
    alt Password Invalid
        AuthAPI-->>Client: 401 Unauthorized
    else Password Valid
        AuthAPI->>AuthAPI: Check Admin Email Whitelist
        AuthAPI->>JWT: sign({ id, email, role })
        JWT-->>AuthAPI: Signed JWT Token
        AuthAPI-->>Client: 200 OK + { token, user }
        Client->>Client: Persist token in localStorage
    end
```

### 5.5 Data Flow & Component Communication
```mermaid
flowchart LR
    subgraph Patient Journey Flow
        A[Patient Profile Inputs] -->|Demographics| B(Friction Engine)
        B -->|8-Factor Scores| C{Risk Engine}
        C -->|Risk Level| D[Personalized Care Plan]
        D -->|Assistance Request| E[Hospital Triage Queue]
        E -->|Approval & Token| F[In-App Notification]
        F -->|Confirmation| G[Patient Dashboard]
    end
```

---

## 6. User Roles and Permissions

PFIS enforces strict **Role-Based Access Control (RBAC)** across three distinct personas.

### 6.1 Role Hierarchy & Permissions Matrix

| Capability / Resource | Patient (`patient`) | Hospital Desk (`hospital`) | Super Admin (`admin`) |
| :--- | :---: | :---: | :---: |
| View Public Pages (Landing, About, Contact) | Yes | Yes | Yes |
| View / Edit Own Patient Profile | Yes | No | Yes |
| View Personalized Friction Fingerprint | Yes | Yes (Assigned) | Yes |
| Run Digital Twin Simulations | Yes | No | Yes |
| Upload / Delete Own Identity Documents | Yes | No | Yes |
| Submit Non-Clinical Support Requests | Yes | No | No |
| Triage & Approve Hospital Requests | No | Yes | Yes |
| Allocate Hospital Department Tokens | No | Yes | Yes |
| View Hospital Facility Analytics | No | Yes | Yes |
| Access Population Friction Heatmaps | No | No | Yes |
| Run What-If Policy Simulations | No | No | Yes |
| Execute 0/1 Knapsack Budget Optimizer | No | No | Yes |
| Manage System-Wide Facilities & Users | No | No | Yes |
| View Immutable System Audit Logs | No | No | Yes |

### 6.2 Administrative Access Whitelist
To guard against unauthorized privilege escalation, admin privileges are restricted to cryptographically whitelisted personnel. The whitelist is enforced in `server/src/middleware/roleMiddleware.ts`:
- `satyam31sk@gmail.com`
- `prince.patel2025@lpu.in`
- `dhirajkumar464748@gmail.com`
- `xel5760@gmail.com`
- `tanishka2789@gmail.com`
- `ddishika45@gmail.com`

---

## 7. Pages and Routes

The frontend application exposes 36 discrete routes mapped in `client/src/App.tsx`:

| Route Path | Component Name | Functional Purpose | Authentication Required |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPage` | Public homepage featuring system capabilities and interactive demo presets | No |
| `/about` | `About` | Mission statement, academic foundation, and operational methodology | No |
| `/contact` | `Contact` | Contact form, administrative address, and emergency medical helpline contacts | No |
| `/architecture` | `SystemArchitecture`| High-level blueprints of PFIS intelligence engines and data pipelines | No |
| `/hospitals` | — | Redirects directly to `/patient/hospitals` | No |
| `/login` | `Login` | User authentication interface with 1-click role presets | No |
| `/register` | `Register` | User account creation for patients and healthcare providers | No |
| `/forgot-password` | `ForgotPassword` | Password recovery initiation form | No |
| `/reset-password` | `ResetPassword` | Password confirmation and reset form | No |
| `/auth/google/callback`| `GoogleCallback` | OAuth2 redirect handler exchanging tokens | No |
| `/patient/dashboard` | `PatientDashboard` | Central patient base displaying friction score, active requests, and alerts | Yes (`patient`) |
| `/patient/profile` | `PatientProfile` | Non-clinical patient demographic profile editor | Yes (`patient`) |
| `/patient/hospitals` | `NearbyHospitals` | Geospatial locator for accessible healthcare facilities | Yes (`patient`) |
| `/patient/hospitals/:id`| `HospitalDetails` | Facility profile, department lists, token counts, and booking trigger | Yes (`patient`) |
| `/patient/requests` | `PatientRequests` | History and tracking view of submitted non-clinical support requests | Yes (`patient`) |
| `/patient/requests/:id` | `RequestDetails` | Detailed status timeline and notes for a specific request | Yes (`patient`) |
| `/patient/documents` | `PatientDocuments` | Secure document upload and storage vault | Yes (`patient`) |
| `/patient/friction` | `FrictionFingerprint`| 8-dimension spider radar chart and factor decomposition | Yes (`patient`) |
| `/patient/risk` | `AccessibilityRisk` | Personalized non-clinical barrier risk assessment and mitigations | Yes (`patient`) |
| `/patient/digital-twin`| `DigitalTwinSimulator`| Interactive scenario simulator predicting completion probability | Yes (`patient`) |
| `/patient/teleconsult` | `TeleconsultationRoom`| Virtual navigation and remote triage teleconsultation room | Yes (`patient`) |
| `/patient/notifications`| `PatientNotifications`| In-app notification center for appointment and request updates | Yes (`patient`) |
| `/patient/settings` | `PatientSettings` | Language preference, accessibility toggles, and account settings | Yes (`patient`) |
| `/hospital/dashboard` | `HospitalDashboard` | Care desk triage summary, department tokens, and incoming inquiries | Yes (`hospital`) |
| `/hospital/requests` | `HospitalRequests` | Live filterable queue of patient assistance and appointment requests | Yes (`hospital`) |
| `/hospital/requests/:id`| `HospitalRequestDetails`| In-depth triage interface for reviewing and approving patient requests | Yes (`hospital`) |
| `/hospital/departments` | `HospitalDepartments`| Facility department capacity and daily token quota manager | Yes (`hospital`) |
| `/hospital/profile` | `HospitalProfile` | Hospital administrative details, bed capacities, and coordinates | Yes (`hospital`) |
| `/hospital/teleconsult`| `TeleconsultationRoom`| Hospital triage desk interface for virtual teleconsultations | Yes (`hospital`) |
| `/hospital/notifications`| `PatientNotifications`| In-app notifications for hospital coordinators | Yes (`hospital`) |
| `/hospital/settings` | `PatientSettings` | Hospital account settings and accessibility controls | Yes (`hospital`) |
| `/admin/dashboard` | `AdminDashboard` | Executive intelligence overview of population friction and health system metrics | Yes (`admin`) |
| `/admin/friction-map` | `PopulationFrictionMap`| Geospatial heatmap displaying district friction concentrations | Yes (`admin`) |
| `/admin/simulator` | `WhatIfSimulator` | Policy simulator evaluating public health intervention packages | Yes (`admin`) |
| `/admin/digital-twin` | `DigitalTwinSimulator`| Population-level scenario modeling tool | Yes (`admin`) |
| `/admin/interventions` | `InterventionOptimizer`| 0/1 Knapsack optimization engine for health intervention budgets | Yes (`admin`) |
| `/admin/care-leakage` | `CareLeakage` | Care delivery funnel quantifying milestone-by-milestone drop-offs | Yes (`admin`) |
| `/admin/care-failure` | `CareFailure` | Causal attribution model explaining why historical patients failed care | Yes (`admin`) |
| `/admin/patients` | `AdminPatients` | Directory of registered patients with friction scores and status flags | Yes (`admin`) |
| `/admin/hospitals` | `AdminHospitals` | Management dashboard for registered hospitals and department audits | Yes (`admin`) |
| `/admin/audit-logs` | `AuditLogs` | Immutable audit log viewer for compliance and security monitoring | Yes (`admin`) |
| `/admin/settings` | `PatientSettings` | System-level admin settings and preferences | Yes (`admin`) |
| `*` | `NotFound` | Accessible 404 error page with navigation shortcuts | No |

---

## 8. Components Documentation

### 8.1 Data Visualization Components (`src/components/charts/`)

#### `FrictionRadarChart`
- **Purpose**: Displays the 8 dimensions of patient friction on a normalized polygonal radar chart.
- **Props**: `{ factors: Array<{ factor_name: string; score: number }>, height?: number }`
- **Dependencies**: `recharts` (`RadarChart`, `PolarGrid`, `PolarAngleAxis`, `PolarRadiusAxis`, `Radar`, `ResponsiveContainer`).
- **Where Used**: `FrictionFingerprint.tsx`, `PatientDashboard.tsx`, `AdminDashboard.tsx`.

#### `CompletionGauge`
- **Purpose**: Circular SVG gauge visualizing a patient's predicted journey completion probability (0–100%).
- **Props**: `{ value: number; size?: number; label?: string }`
- **Dependencies**: Native SVG with dynamic stroke dash offsets.
- **Where Used**: `PatientDashboard.tsx`, `DigitalTwinSimulator.tsx`, `WhatIfSimulator.tsx`.

#### `FrictionBarChart`
- **Purpose**: Horizontal comparative bar chart highlighting the relative severity of individual friction factors.
- **Props**: `{ data: Array<{ name: string; score: number; severity: string }> }`
- **Dependencies**: `recharts` (`BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`).
- **Where Used**: `FrictionFingerprint.tsx`, `PopulationFrictionMap.tsx`.

#### `LeakageFunnelChart`
- **Purpose**: Step-down funnel visualizer displaying patient volume loss across sequential healthcare delivery milestones.
- **Props**: `{ stages: Array<{ stage: string; count: number; percentage: number; dropPercent: number }> }`
- **Dependencies**: `recharts`, Tailwind CSS flex styling.
- **Where Used**: `CareLeakage.tsx`.

#### `CareFailureDonutChart`
- **Purpose**: Categorical donut chart showing percentage attribution for non-clinical care failures.
- **Props**: `{ data: Array<{ category: string; percentage: number; color: string }> }`
- **Dependencies**: `recharts` (`PieChart`, `Pie`, `Cell`, `Tooltip`, `Legend`).
- **Where Used**: `CareFailure.tsx`.

### 8.2 Common Design System Components (`src/components/common/`)

#### `AccessibilityToolbar`
- **Purpose**: Floating accessibility utility bar enabling instant text scaling (A- / A+), high-contrast mode, and Text-to-Speech audio toggles.
- **Props**: None (binds to `AccessibilityContext`).
- **Where Used**: Mounted globally in `App.tsx`.

#### `TTSButton`
- **Purpose**: Accessible button that reads surrounding text or specified strings aloud using the browser's native Web Speech API.
- **Props**: `{ text: string; label?: string; size?: 'sm' | 'md' | 'lg' }`
- **Where Used**: Patient dashboard cards, barrier explanations, doctor instructions.

#### `DemoModeBanner`
- **Purpose**: Interactive top bar providing instant 1-click login presets for Patient, Hospital, and Admin personas.
- **Props**: None (binds to `AuthContext`).
- **Where Used**: Rendered conditionally on public and auth layouts.

#### `HospitalMap`
- **Purpose**: Interactive geospatial map rendering hospital locations, bed availability badges, and user distance lines.
- **Props**: `{ hospitals: Hospital[]; selectedHospital?: Hospital; onSelectHospital?: (h: Hospital) => void; center?: [number, number]; zoom?: number }`
- **Dependencies**: `leaflet`, `react-leaflet`.
- **Where Used**: `NearbyHospitals.tsx`, `HospitalDetails.tsx`.

---

## 9. Database Documentation

### 9.1 Database Architecture & Storage Engine
PFIS utilizes a hybrid relational model defined in `server/src/database/schema.sql` comprising **13 normalized tables** linked via foreign key constraints. In production, it connects to PostgreSQL or MySQL; in development or zero-dependency environments, it utilizes the embedded relational engine in `server/src/database/db.ts`.

### 9.2 Relational Tables Specification

```mermaid
erDiagram
    users ||--o| patient_profiles : "has"
    users ||--o{ appointments : "books"
    users ||--o{ teleconsultations : "participates"
    users ||--o{ friction_profiles : "has"
    users ||--o{ accessibility_risks : "has"
    users ||--o{ requests : "creates"
    users ||--o{ documents : "owns"
    users ||--o{ notifications : "receives"
    users ||--o{ audit_logs : "triggers"
    hospitals ||--o{ hospital_services : "offers"
    hospitals ||--o{ appointments : "hosts"
    hospitals ||--o{ requests : "receives"
    friction_profiles ||--o{ friction_factors : "contains"
```

#### Table Definitions

| Table Name | Description | Key Fields & Types | Foreign Keys |
| :--- | :--- | :--- | :--- |
| `users` | User credentials and roles | `id` (VARCHAR PK), `email` (VARCHAR UNIQUE), `password_hash` (VARCHAR), `role` (VARCHAR), `name` (VARCHAR) | None |
| `patient_profiles` | Non-clinical demographic parameters | `id` (PK), `user_id` (VARCHAR UNIQUE), `age` (INT), `is_rural` (BOOLEAN), `distance_to_hospital_km` (DECIMAL), `transport_mode` (VARCHAR), `digital_literacy` (VARCHAR), `wage_loss_risk` (VARCHAR), `preferred_language` (VARCHAR) | `user_id` → `users(id)` ON DELETE CASCADE |
| `hospitals` | Healthcare facilities directory | `id` (PK), `name` (VARCHAR), `city` (VARCHAR), `address` (TEXT), `latitude` (DECIMAL), `longitude` (DECIMAL), `total_beds` (INT), `available_beds` (INT), `teleconsult_available` (BOOLEAN) | None |
| `hospital_services` | Clinical departments & daily tokens | `id` (PK), `hospital_id` (VARCHAR), `name` (VARCHAR), `department` (VARCHAR), `total_daily_tokens` (INT), `available_tokens` (INT), `fee` (DECIMAL) | `hospital_id` → `hospitals(id)` ON DELETE CASCADE |
| `appointments` | Scheduled patient consultations | `id` (PK), `patient_id` (VARCHAR), `hospital_id` (VARCHAR), `service_id` (VARCHAR), `scheduled_date` (VARCHAR), `token_number` (INT), `status` (VARCHAR) | `patient_id` → `users(id)`, `hospital_id` → `hospitals(id)` |
| `teleconsultations` | Remote navigation sessions | `id` (PK), `patient_id` (VARCHAR), `doctor_name` (VARCHAR), `specialty` (VARCHAR), `room_id` (VARCHAR), `status` (VARCHAR) | `patient_id` → `users(id)` |
| `friction_profiles` | Calculated patient friction totals | `id` (PK), `patient_id` (VARCHAR), `overall_score` (DECIMAL), `category` (VARCHAR), `journey_completion_prob` (DECIMAL), `primary_barrier` (VARCHAR) | `patient_id` → `users(id)` ON DELETE CASCADE |
| `friction_factors` | Decomposed friction dimensions | `id` (PK), `friction_profile_id` (VARCHAR), `factor_name` (VARCHAR), `score` (DECIMAL), `severity` (VARCHAR), `explanation` (TEXT), `suggested_intervention` (TEXT) | `friction_profile_id` → `friction_profiles(id)` ON DELETE CASCADE |
| `accessibility_risks`| Patient barrier risks & mitigations | `id` (PK), `patient_id` (VARCHAR), `risk_level` (VARCHAR), `barrier_title` (VARCHAR), `explanation` (TEXT), `mitigation_action` (TEXT) | `patient_id` → `users(id)` ON DELETE CASCADE |
| `requests` | Non-clinical assistance requests | `id` (PK), `patient_id` (VARCHAR), `hospital_id` (VARCHAR), `request_type` (VARCHAR), `status` (VARCHAR), `priority` (VARCHAR), `details` (TEXT) | `patient_id` → `users(id)`, `hospital_id` → `hospitals(id)` |
| `documents` | Uploaded document records | `id` (PK), `patient_id` (VARCHAR), `category` (VARCHAR), `file_name` (VARCHAR), `file_url` (TEXT), `file_size_kb` (DECIMAL), `mime_type` (VARCHAR) | `patient_id` → `users(id)` ON DELETE CASCADE |
| `notifications` | Transactional user alerts | `id` (PK), `user_id` (VARCHAR), `title` (VARCHAR), `message` (TEXT), `type` (VARCHAR), `is_read` (BOOLEAN), `link` (VARCHAR) | `user_id` → `users(id)` ON DELETE CASCADE |
| `audit_logs` | Immutable compliance logs | `id` (PK), `user_id` (VARCHAR), `action` (VARCHAR), `entity_type` (VARCHAR), `entity_id` (VARCHAR), `ip_address` (VARCHAR), `created_at` (TIMESTAMP) | `user_id` → `users(id)` ON DELETE SET NULL |

---

## 10. API Documentation

All API endpoints are prefixed with `/api`. Protected routes require an `Authorization: Bearer <JWT_TOKEN>` header.

### 10.1 Authentication Routes (`server/src/routes/authRoutes.ts`)

| Method | Endpoint | Description | Request Body | Response | Auth Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Create a new patient or provider account | `{ email, password, name, role, phone }` | `{ success, token, user }` | No |
| `POST` | `/auth/login` | Authenticate with email & password | `{ email, password }` | `{ success, token, user }` | No |
| `POST` | `/auth/google` | Sign in or register via Google OAuth | `{ credential }` (JWT ID token) | `{ success, token, user }` | No |
| `GET` | `/auth/me` | Fetch authenticated user profile | None | `{ success, user }` | Yes |
| `POST` | `/auth/logout` | Invalidate current session | None | `{ success, message }` | Yes |
| `POST` | `/auth/forgot-password` | Request password reset instructions | `{ email }` | `{ success, message }` | No |
| `POST` | `/auth/reset-password` | Reset password using verified token | `{ token, newPassword }` | `{ success, message }` | No |

### 10.2 Patient Routes (`server/src/routes/patientRoutes.ts`)

| Method | Endpoint | Description | Request Body / Params | Response | Auth Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/patients/me` | Retrieve current patient demographic profile | None | `{ success, data: PatientProfile }` | Yes (`patient`) |
| `PUT` | `/patients/me` | Update patient demographic parameters | `{ age, location, transportMode, ... }` | `{ success, data: PatientProfile }` | Yes (`patient`) |
| `GET` | `/patients/me/friction` | Compute and retrieve patient friction score | Optional: `?hospitalId=...` | `{ success, data: FrictionProfile }` | Yes (`patient`) |
| `GET` | `/patients/me/risk` | Retrieve classified accessibility risks | None | `{ success, data: CareRisk[] }` | Yes (`patient`) |
| `GET` | `/patients/me/journey` | Retrieve milestone care journey status | None | `{ success, data: CareJourney }` | Yes (`patient`) |

### 10.3 Hospital Routes (`server/src/routes/hospitalRoutes.ts`)

| Method | Endpoint | Description | Request Body / Params | Response | Auth Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/hospitals/nearby` | Find facilities within geospatial radius | Query: `?lat=...&lng=...&radius=...` | `{ success, data: Hospital[] }` | No |
| `GET` | `/hospitals/search` | Search facilities by name or specialty | Query: `?q=...&city=...` | `{ success, data: Hospital[] }` | No |
| `GET` | `/hospitals/:id` | Retrieve detailed facility information | Param: `id` | `{ success, data: Hospital }` | No |
| `GET` | `/hospitals/profile/me` | Fetch authenticated hospital profile | None | `{ success, data: Hospital }` | Yes (`hospital`) |
| `PUT` | `/hospitals/profile/me` | Update hospital facilities and bed counts | `{ totalBeds, availableBeds, ... }` | `{ success, data: Hospital }` | Yes (`hospital`) |
| `POST` | `/hospitals/departments` | Add a new clinical service / department | `{ name, department, dailyTokens, fee }`| `{ success, data: Department }` | Yes (`hospital`) |
| `PUT` | `/hospitals/departments/:deptId` | Update department tokens or fees | `{ availableTokens, fee }` | `{ success, data: Department }` | Yes (`hospital`) |
| `DELETE`| `/hospitals/departments/:deptId` | Remove a department | Param: `deptId` | `{ success, message }` | Yes (`hospital`) |

### 10.4 Non-Clinical Request Routes (`server/src/routes/requestRoutes.ts`)

| Method | Endpoint | Description | Request Body / Params | Response | Auth Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/requests` | Submit non-clinical assistance request | `{ hospitalId, requestType, details, priority }` | `{ success, data: Request }` | Yes (`patient`) |
| `GET` | `/requests/patient` | Retrieve all requests created by patient | None | `{ success, data: Request[] }` | Yes (`patient`) |
| `GET` | `/requests/hospital` | Retrieve all requests routed to hospital | Query: `?status=Pending` | `{ success, data: Request[] }` | Yes (`hospital`) |
| `GET` | `/requests/:id` | Get status timeline for specific request | Param: `id` | `{ success, data: Request }` | Yes |
| `PATCH` | `/requests/:id/status` | Update status (Approved, Completed, etc.) | `{ status, notes }` | `{ success, data: Request }` | Yes (`hospital`, `admin`) |

### 10.5 Simulation & Intervention Routes (`server/src/routes/simulationRoutes.ts`, `interventionRoutes.ts`)

| Method | Endpoint | Description | Request Body / Params | Response | Auth Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/simulation/catalog` | Get catalog of modeled health interventions | None | `{ success, data: Intervention[] }` | Yes |
| `POST` | `/simulation/run` | Execute What-If counterfactual simulation | `{ interventionCodes, baselineProb, cohortSize }` | `{ success, data: SimulationResult }`| Yes |
| `POST` | `/interventions/optimize` | Run 0/1 Knapsack public budget optimizer | `{ budgetINR, baselineProb, cohortSize }` | `{ success, data: OptimizationResult }`| Yes (`admin`) |

### 10.6 Admin Routes (`server/src/routes/adminRoutes.ts`)

| Method | Endpoint | Description | Request Body / Params | Response | Auth Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/admin/dashboard` | High-level population metrics and KPIs | None | `{ success, data: DashboardMetrics }`| Yes (`admin`) |
| `GET` | `/admin/friction-map` | District-by-district friction heatmap | None | `{ success, data: DistrictNode[] }` | Yes (`admin`) |
| `GET` | `/admin/care-leakage` | Stage-by-stage patient leakage funnel | None | `{ success, data: LeakageStage[] }` | Yes (`admin`) |
| `GET` | `/admin/care-failure` | Causal attribution for failed journeys | None | `{ success, data: CareFailureAnalysis }`| Yes (`admin`) |
| `GET` | `/admin/patients` | Paginated directory of all patients | Query: `?page=1&limit=20` | `{ success, data: Patient[] }` | Yes (`admin`) |
| `GET` | `/admin/hospitals` | Complete list of hospitals with status | None | `{ success, data: Hospital[] }` | Yes (`admin`) |
| `GET` | `/admin/audit-logs` | Immutable audit trail for compliance | Query: `?limit=50` | `{ success, data: AuditLog[] }` | Yes (`admin`) |

---

## 11. Authentication and Security

### 11.1 Security Implementation Details
1. **Stateless JWT Tokens**: Signed with `HMAC-SHA256` using the server's `JWT_SECRET`. Tokens carry the user ID, email, and role, expiring automatically after 7 days (`7d`).
2. **Password Hashing**: Passwords are never stored in plaintext. They are salted with 10 rounds of `bcryptjs` before being written to storage.
3. **Role-Based Access Control (RBAC)**: Enforced via `roleMiddleware(roles)`. Even if an attacker manipulates client-side JavaScript, backend Express middleware intercepts every request and validates permissions.
4. **Email Whitelisting for Admin Escalation**: Users cannot register as `admin`. Administrative routes enforce an immutable whitelist of verified organizational email addresses.
5. **Rate Limiting**: Protects against brute force and denial of service using `express-rate-limit` (1,000 requests per 15-minute window per IP).
6. **HTTP Header Hardening**: Secured via `helmet`, implementing strict `Cross-Origin-Resource-Policy` rules.
7. **Cross-Origin Resource Sharing (CORS)**: Configured to accept requests from configured client origins while blocking unauthorized external domains.

---

## 12. Environment Variables

| Variable Name | Description | Required | Default / Example Value | Where Used |
| :--- | :--- | :---: | :--- | :--- |
| `PORT` | HTTP server port | No | `5000` | `server/src/config/env.ts` |
| `NODE_ENV` | Runtime environment mode | No | `development` (`production`, `test`) | Fullstack build & logs |
| `CLIENT_URL` | Frontend origin URL for CORS | No | `http://localhost:5173` | `server/src/app.ts` |
| `JWT_SECRET` | Secret key used to sign JWTs | **Yes** | `pfis_super_secure_production_secret_key_2025` | `server/src/utils/jwt.ts` |
| `JWT_EXPIRES_IN` | Token expiration duration | No | `7d` | `server/src/utils/jwt.ts` |
| `DATABASE_URL` | PostgreSQL connection string | No | `postgresql://user:pass@localhost:5432/pfis` | `server/src/database/db.ts` |
| `MYSQL_URL` | MySQL connection string | No | `mysql://user:pass@localhost:3306/pfis` | `server/src/database/db.ts` |
| `GOOGLE_MAPS_API_KEY`| Google Maps Places API key | No | `AIzaSy...` (Falls back to Delhi NCR GIS) | `server/src/services/googleMapsService.ts` |
| `VITE_API_URL` | Base API URL for frontend | No | `/api` | `client/src/services/api.ts` |
| `VITE_GOOGLE_CLIENT_ID`| Client ID for Google OAuth | No | `123456789-abc.apps.googleusercontent.com` | `client/src/pages/auth/Login.tsx` |

> [!IMPORTANT]  
> Never commit actual `.env` files containing real production secrets to git. Always use `.env.example` as a template and provide secrets via environment managers (Vercel Project Settings, Docker secrets, or cloud vaults).

---

## 13. Configuration Files

### 13.1 Root `package.json`
- **Purpose**: Defines npm workspaces (`["server", "client"]`), linking both sub-projects into a monorepo.
- **Key Scripts**: Root orchestration commands (`npm run dev`, `npm run build:all`, `npm test`, `npm run check`).

### 13.2 Frontend `client/vite.config.ts`
- **Purpose**: Vite build tool configuration.
- **Key Features**:
  - React plugin (`@vitejs/plugin-react`).
  - Development proxy routing `/api` requests to `http://localhost:5000`.
  - Granular Rollup manual chunking splitting dependencies into `vendor-react`, `vendor-charts`, `vendor-maps`, `vendor-i18n`, and `vendor-icons` to minimize initial bundle size and maximize browser caching.

### 13.3 Frontend `client/tailwind.config.js`
- **Purpose**: Tailwind CSS design system configuration.
- **Key Features**:
  - `darkMode: 'class'`: Prevents OS dark mode from overriding the healthcare light palette.
  - Tailored color palette: `teal`, `emerald`, `amber`, `rose`, `slate`.
  - Accessible typography and screen breakpoints.

### 13.4 Deployment `vercel.json`
- **Purpose**: Production configuration for Vercel deployment.
- **Key Features**:
  - SPA URL rewrites: Maps all non-file route requests to `/index.html` to enable client-side React Router navigation.
  - Vercel build command: `npm run vercel-build`.

### 13.5 TypeScript Configurations (`tsconfig.json`)
- **`client/tsconfig.json`**: Configured for React 18 JSX transform, browser DOM typings, strict null checks, and ESNext module resolution.
- **`server/tsconfig.json`**: Configured for Node.js ES Modules (`NodeNext`), emitting compiled JavaScript to `server/dist/`.

---

## 14. Scripts and Commands

All commands can be executed directly from the project root.

### 14.1 Quick Start (Development)
```bash
# 1. Install all dependencies across root, server, and client
npm install

# 2. Start both the backend API server and frontend development server concurrently
npm run dev
```
- **Frontend URL**: `http://localhost:5173`
- **Backend API URL**: `http://localhost:5000/api`
- **Health Check**: `http://localhost:5000/api/health`

---

### 14.2 Production Builds
```bash
# Build only the frontend client for production (outputs to client/dist)
npm run build

# Build both backend TypeScript (server/dist) and frontend bundle
npm run build:all
```

---

### 14.3 Automated Testing & QA Verification
```bash
# Run the autonomous end-to-end API and security test suite
npm test
```
*The test runner (`server/tests/run_all_tests.cjs`) checks whether the server is already active; if offline, it automatically boots an ephemeral test instance, executes all 18 core API and RBAC privilege escalation tests in ~3 seconds, and tears down gracefully.*

```bash
# Run complete fullstack verification (compilation + testing)
npm run check
```
*Executes `tsc` on server, `tsc && vite build` on client, and the complete automated test suite.*

---

### 14.4 Isolated Subsystem Commands
```bash
# Run only the backend server in development mode
npm --prefix server run dev

# Run only the frontend client in development mode
npm --prefix client run dev

# Run database relational seed script
npm --prefix server run seed:relational
```

---

*Patient Friction Intelligence System (PFIS) Documentation — Engineered for Universal Healthcare Accessibility.*
