# PFIS Feature Catalog & Operational Modules

This document provides a comprehensive catalog of all functional features, modules, and capabilities available in the **Patient Friction Intelligence System (PFIS)** across all 6 specialized portals:
1. **Patient Portal**
2. **Hospital Console**
3. **Doctor Console**
4. **ASHA Field Console**
5. **Government Health Dashboard**
6. **Admin Master Suite**

---

## 1. Patient Portal (`/patient/*`)

Designed specifically for vulnerable, elderly, rural, and non-digitally savvy patients and their community caregivers.

### 1.1 Dashboard (`/patient/dashboard`)
- **Action Hub**: Direct 1-click access to *Find Hospitals*, *Teleconsult*, *Digital Twin*, and *Document Vault*.
- **Summary Stat Cards**: Displays *Accessibility Index* (0-100), *Completion Forecast*, *Dropout Risk*, and identified *Primary Barrier*.
- **Active Requests Tracker**: Real-time status cards tracking appointments and transport assistance.

### 1.2 Nearby Hospitals (`/patient/hospitals`)
- **Adaptive Radius Search**: Locates accredited government and private hospitals within a 15–50 km radius using Haversine calculation.
- **Facility Badges**: Highlights 24/7 Emergency, Ayushman Bharat counters, wheelchair ramps, and generic Jan Aushadhi pharmacies.
- **Turn-by-Turn GPS Navigation**: 1-click directions to the facility entrance.

### 1.3 Hospital Details & Booking (`/patient/hospitals/:id`)
- **OPD Token Booking**: Select consultation date, department, and time window.
- **Support Requests**: 1-click request for hospital wheelchair escorts, vernacular translators, or transit support.

### 1.4 Friction Profile (`/patient/friction`)
- **8-Dimension Breakdown**: Evaluates Travel Distance, Transport Availability, Digital Literacy, Vernacular Language, Caregiver Support, Documentation Readiness, Financial Out-of-Pocket Cost, and Daily Wage Loss Risk.
- **Primary & Secondary Barriers**: Identifies root non-clinical bottlenecks with actionable recommendations.

### 1.5 Digital Twin Simulator (`/patient/digital-twin`)
- Interactive sandbox enabling patients to test "what-if" operational scenarios:
  - *Health Shuttle Preset* (free community bus transit)
  - *Diagnostic Camp Preset* (local screening camp)
  - *ASHA Escort Preset* (doorstep escort assistance)
- Live gauge displaying completion probability improvements in real time.

### 1.6 Journey Risk (`/patient/risk`)
- Real-time gauge projecting care-completion percentage and risk level.
- Outlines primary drop-off drivers and recommended mitigation steps.

### 1.7 My Requests (`/patient/requests`)
- Lifecycle tracking for all submitted appointment and access assistance requests: `New` ➔ `Under Review` ➔ `Accepted` ➔ `Completed`.

### 1.8 Teleconsultation (`/patient/teleconsultation`)
- WebRTC-enabled virtual consultation room with zero transit friction.
- Live audio/video consultation, in-call chat transcript, and digital prescription preview.

### 1.9 Document Vault (`/patient/documents`)
- Encrypted health record vault for Aadhaar cards, BPL ration cards, and past prescriptions.
- Pre-visit document readiness checks preventing journey abandonment due to missing paperwork.

### 1.10 Patient Profile & Settings (`/patient/profile`, `/patient/settings`)
- Configure demographic factors, vernacular language (11 Indic languages), and Text-to-Speech (TTS) voice preferences.

---

## 2. Hospital Console (`/hospital/*`)

Designed for hospital intake coordinators, triage desks, and administrative superintendents.

### 2.1 Triage Console (`/hospital/dashboard`)
- **Live Intake Queue**: Real-time monitor of incoming patient appointments categorized by urgency and non-clinical risk.
- **Operational Metrics**: Monitored beds, available OPD tokens, and active department specialists.

### 2.2 Intake Queue (`/hospital/requests`)
- **Lifecycle Management**: Review incoming requests, inspect non-clinical travel constraints, and approve or reschedule appointments.
- **Token Assignment**: Assign morning or afternoon OPD tokens that align with rural bus schedules.

### 2.3 Departments (`/hospital/departments`)
- Manage medical specialties, bed capacities, assigned doctors, and daily patient quotas.

### 2.4 Hospital Profile (`/hospital/profile`)
- Update hospital details, emergency availability, contact phone numbers, and operational hours.

---

## 3. Doctor Console (`/doctor/*`)

Designed for OPD physicians and consulting clinicians.

### 3.1 Doctor Console (`/doctor/dashboard`)
- **Daily Patient Queue**: Monitored patient list with non-clinical friction flags (e.g. *"Lives 65 km away - needs morning token"*).
- **Medical Autonomy Mandate**: Prominent disclaimer that PFIS provides non-clinical operational intelligence and does not influence medical diagnoses.

### 3.2 Patient Queue & Review (`/doctor/patients`, `/doctor/patients/:id`)
- Deep-dive into patient non-clinical friction history, transit distance, language preferences, and ASHA field notes.

---

## 4. ASHA Field Console (`/asha/*`)

Tailored for frontline community health workers (Accredited Social Health Activists).

### 4.1 Field Console (`/asha/dashboard`)
- **Household Registry**: Village household tracker highlighting vulnerable, elderly, or high-friction families.
- **Transit Coordination**: Dispatch community health shuttles and accompany patients needing physical assistance.

### 4.2 Log Barrier (`/asha/log-barrier`)
- **1-Tap Field Logger**: Rapidly record doorstep barriers (e.g., lost wage, flood damage to roads, missing identity proof) to alert nodal health centers.

---

## 5. Government Health Dashboard (`/government/*`)

Designed for District Chief Medical Officers (CMOs) and public health planners.

### 5.1 District Dashboard (`/government/dashboard`)
- **District Friction Index**: Aggregate population access friction across all administrative blocks.
- **Care Leakage Funnel**: 5-stage tracking of where patients abandon care (Referral ➔ Booking ➔ Transit ➔ Consultation ➔ Follow-up).

### 5.2 Friction Map (`/government/friction-map`)
- DPDP 2023 compliant, privacy-preserved geospatial density map showing high-friction habitation clusters without exposing individual health records.

### 5.3 Interventions (`/government/interventions`)
- Review, deploy, and evaluate targeted public health interventions (mobile medical units, transport vouchers, vernacular awareness campaigns).

---

## 6. Admin Master Suite (`/admin/*`)

Restricted strictly to authorized administrators on the verified `ADMIN_EMAILS` whitelist.

### 6.1 Admin Console (`/admin/dashboard`)
- Global system telemetry, active patient count, hospital directory metrics, and recent security events.

### 6.2 Simulator (`/admin/simulator`)
- Interactive What-If policy sandbox modeling the macro-impact of systemic interventions across thousands of simulated patient journeys.

### 6.3 Budget Optimizer (`/admin/optimizer`)
- Algorithmic 0/1 Knapsack optimization calculating the most cost-effective package of interventions to maximize patient retention under a fixed budget.

### 6.4 Care Leakage & Root Cause (`/admin/care-leakage`, `/admin/care-failure`)
- Funnel analytics and causal attribution isolating why vulnerable cohorts drop out of the healthcare journey.

### 6.5 Friction Map (`/admin/friction-map`)
- Geospatial cluster analyzer with interactive cluster inspection, barrier breakdowns, and recommended interventions.

### 6.6 Patient Registry & Hospital Directory (`/admin/patients`, `/admin/hospitals`)
- District-wide patient registry and hospital accreditation desk (add, inspect, or remove facilities).

### 6.7 Audit Ledger (`/admin/audit-logs`)
- Tamper-evident cryptographic ledger recording authentication events, consent revocations, and data access vectors.
