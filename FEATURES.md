# PFIS Feature Catalog & Operational Modules

This document provides a comprehensive catalog of all functional features, modules, and capabilities available in the **Patient Friction Intelligence System (PFIS)** across its three specialized portals: **Patient Accessibility Portal**, **Hospital Triage & Intake Console**, and **Administrative Health Intelligence Suite**.

---

## 1. Patient Accessibility Portal (`/patient/*`)

Designed specifically for vulnerable, elderly, rural, and non-digitally savvy patients and their community caregivers.

### 1.1 Non-Clinical Friction Profile & Fingerprint
- **8-Dimension Breakdown**: Evaluates Travel Distance, Transport Availability, Digital Literacy, Vernacular Language, Caregiver Support, Documentation Readiness, Financial Out-of-Pocket Cost, and Daily Wage Loss Risk.
- **Explainable Barrier Attribution**: Highlights the single most acute bottleneck (e.g., *"Irregular rural bus transit causing 65% journey attrition"*) with plain-language explanations.
- **Dynamic Profile Editing**: Patients or community health workers can adjust parameters (e.g., transport mode, caregiver status, scheme enrollment) to observe real-time friction recalibration.

### 1.2 Proximity-Based Verified Hospital Discovery
- **Adaptive Radius Search**: Locates government and empaneled private hospitals within a 15–50 km radius.
- **Non-Clinical Facility Badges**: Highlights wheelchair ramps, Jan Aushadhi Kendra affordable pharmacies, Ayushman Bharat help desks, step-free corridors, and free emergency ambulances.
- **Turn-by-Turn GPS Navigation**: Direct one-click integration with Google Maps driving/transit directions.

### 1.3 Hospital Intake & Support Request System
- **Assisted OPD Token Booking**: Request consultation time windows that align with rural bus timetables (e.g., morning window before 11:00 AM).
- **Specialized Operational Support**:
  - Community Transit Shuttle booking
  - Ground-floor wheelchair escort upon hospital gate arrival
  - Vernacular language assistance desk allocation
- **Granular Consent Handshake**: Patients explicitly choose which non-clinical accessibility factors are shared with the hospital.

### 1.4 Digital Document Vault
- **Encrypted Document Storage**: Securely store Aadhaar cards (masked), disability certificates, BPL ration cards, and previous prescription slips.
- **Pre-Visit Document Readiness Check**: Automatically flags missing documentation (e.g., missing doctor referral slip or Ayushman Bharat e-card) *before* the patient undertakes long transit.

### 1.5 Digital Twin Friction Simulator
- Interactive sandbox enabling patients to test "what-if" journey changes:
  - *"What if I switch from bus to shared auto?"*
  - *"What if I enroll in Ayushman Bharat?"*
  - *"What if a community Sahayak escorts me?"*
- Immediately visualizes the resulting friction score reduction and journey completion probability increase.

### 1.6 Teleconsultation Navigation Room
- WebRTC-based virtual consultation room connecting rural patients to nodal hospital medical officers or community health navigators to review reports before long journeys.

---

## 2. Hospital Triage & Intake Console (`/hospital/*`)

Designed for hospital receptionists, OPD triage nurses, nodal officers, and medical superintendents.

### 2.1 Incoming Patient Triage Queue
- **Real-Time Request Inbox**: View incoming patient requests categorized by priority:
  - Critical (e.g., elderly living alone needing transit escort)
  - High (e.g., daily wage earner with morning-only window)
  - Standard (routine OPD consultation)
- **Consented Accessibility Matrix**: Instantly review the patient's verified non-clinical friction parameters (distance, transit method, wheelchair requirement) without accessing unneeded private medical history.

### 2.2 Operational Support Assignment
- **Escort Dispatch**: Assign hospital ground staff (Sahayak / Patient Concierge) to meet the patient at the hospital entrance.
- **Transit Coordination**: Link incoming transit requests to hospital shuttles or local community ambulances.
- **Status Workflows**: Update requests through structured states: `Pending`, `Processing`, `Approved`, `Scheduled`, `Completed`, or `Declined`.

### 2.3 Department & Token Quota Management
- Manage clinical rosters and OPD token allocations across departments:
  - General Medicine & Geriatric Screening
  - Cardiology & Heart Care
  - Orthopedics & Joint Care
- Real-time token seat counters tracking daily quota and available seats for walk-ins vs. scheduled access.

---

## 3. Administrative Health Intelligence Suite (`/admin/*`)

Designed for health ministry officials, district magistrates, state health nodal officers, and public health researchers.

### 3.1 Statewide & District Overview Dashboard
- High-level KPIs: Total monitored patient cohorts, active facilities, statewide average friction score (0–100), and projected care completion rate.
- Real-time audit stream monitoring operational intake events and system actions.

### 3.2 Population Friction Heatmap (`/admin/friction-map`)
- Geo-spatial cluster map decomposing friction across administrative districts and rural blocks.
- Filter by specific friction dimensions (e.g., transport scarcity hotspots vs. documentation deficit zones).

### 3.3 Care Journey Drop-Out Leakage Funnel (`/admin/care-leakage`)
- Visualizes patient attrition across the 5 healthcare delivery stages:
  1. Primary Care Referral (100%)
  2. Tertiary OPD Consultation (68% - 32% drop)
  3. Diagnostic Lab Work (48% - 20% drop)
  4. Treatment Adherence (38% - 10% drop)
  5. Post-Discharge Follow-Up (28% - 10% drop)
- Pinpoints the operational friction causes responsible for each drop-off phase.

### 3.4 Why Care Failed Attribution (`/admin/care-failure`)
- Root-cause analytical engine ranking non-clinical drivers behind care abandonment across patient cohorts.

### 3.5 What-If Policy Simulation Engine (`/admin/simulator`)
- Interactive policy laboratory allowing administrators to model targeted health interventions:
  - **Assisted Teleconsultation Kiosks**
  - **Community Transit Subsidies**
  - **Mobile Diagnostic & Screening Camps**
  - **ASHA Frontline Digital Navigators**
  - **Extended Evening / Weekend OPD Shifts**
- Adjust intervention scales (0% to 100%) and instantly compute the projected care completion rate change, estimated lives helped, and diminishing returns efficiency factor.

### 3.6 Budget Intervention Optimizer (`/admin/interventions`)
- Algorithmic budget allocator solving optimal resource distribution for any specified INR expenditure (e.g., ₹5,00,000 or ₹20,00,000).
- Provides cost-per-patient-helped metrics and sensitivity analysis scenarios (reduced budget vs. expanded budget).

### 3.7 Compliance & Audit Trail (`/admin/audit-logs`)
- Searchable, filterable audit log capturing all system activities, authentication events, and administrative security alerts.

---

## 4. Cross-Cutting Accessibility & Inclusive Design

### 4.1 11-Language Vernacular Engine
Native translation across 11 official Indian languages:
- English, Hindi (हिन्दी), Bengali (বাংলা), Marathi (मराठी), Tamil (தமிழ்), Telugu (తెలుగు), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), Urdu (اردو).

### 4.2 WCAG 2.1 AA Accessibility Suite
Accessible via persistent floating toolbar across all pages:
- **Text Sizing**: Scale body and interface typography up to 130% for visually impaired users.
- **High Contrast**: Yellow-on-black and high-contrast color schemes for cataract and low-vision patients.
- **Simple Language Mode**: Dynamically transforms technical jargon into plain vernacular phrasing.
- **Text-to-Speech (TTS)**: Reads on-screen friction explanations and instructions aloud using the browser SpeechSynthesis API.
- **Reduced Motion**: Disables CSS animations and transitions for vestibular disorder safety.
