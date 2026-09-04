# PFIS Operational Workflows & User Journeys

This document outlines the end-to-end operational workflows, state machines, and user journeys executed across the **Patient Friction Intelligence System (PFIS)** for all 6 user roles.

---

## 1. Patient Healthcare Journey Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Patient as Vulnerable Patient / Caregiver
    participant Portal as PFIS Patient Portal
    participant Engine as Friction & Risk Engine
    participant Hospital as Hospital Triage Console
    participant Staff as Hospital Ground Staff (Sahayak)

    Patient->>Portal: Registers / Logs In (or 1-Click Demo Access)
    Patient->>Portal: Inputs Non-Clinical Accessibility Parameters (Distance, Transit, Wage Loss)
    Portal->>Engine: POST /api/patients/me (Save Profile)
    Engine-->>Portal: Computes 8-Dimension Friction Score & Dropout Risk
    Portal-->>Patient: Displays Friction Profile & Primary Barrier
    
    Patient->>Portal: Searches Nearby Hospitals (GPS Proximity)
    Portal-->>Patient: Displays Verified Hospitals with Accessibility Badges
    
    Patient->>Portal: Submits Intake Request (Chooses OPD Window, Wheelchair Escort, Shuttle)
    Patient->>Portal: Selects Consented Non-Clinical Factors to Disclose
    Portal->>Hospital: POST /api/requests (Pending Triage)
    
    Hospital->>Hospital: Reviews Consented Non-Clinical Accessibility Matrix
    Hospital->>Staff: Assigns Ground Escort / Allocates Morning Token
    Hospital->>Portal: PATCH /api/requests/:id/status (Accepted & Scheduled)
    
    Portal-->>Patient: Real-Time Notification (Token # & Escort Assigned)
    Patient->>Staff: Arrives at Hospital -> Meets Escort -> Completes Consultation Without Dropout
```

---

## 2. Hospital Triage & Token Quota Workflow

```mermaid
stateDiagram-v2
    [*] --> New: Patient Submits Intake Request
    New --> UnderReview: Triage Coordinator Inspects Non-Clinical Barriers
    UnderReview --> Accepted: Facility Allocates OPD Token & Escort
    UnderReview --> Rejected: Quota Exhausted / Redirected
    Accepted --> Completed: Patient Arrives & Attends Consultation
    Rejected --> [*]
    Completed --> [*]
```

### Operational Steps for Hospital Staff:
1. **Intake Queue** (`/hospital/requests`): Coordinator reviews incoming access requests.
2. **Barrier Inspection**: Reviews patient travel constraints (e.g. *"Arrives on 09:15 bus from 60 km; requires ground-floor wheelchair ramp"*).
3. **Capacity Allocation**: Assigns morning token and alerts ground ramp concierge.
4. **Quota Update**: Decrements available department token quota in real time.

---

## 3. Doctor Clinical Queue & Non-Clinical Guidance Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Doctor as OPD Physician
    participant Console as Doctor Console
    participant DB as Relational Database

    Doctor->>Console: Logs In (`doctor@pfis.org`)
    Console->>DB: GET /api/doctor/dashboard
    DB-->>Console: Returns Daily Monitored Queue with Non-Clinical Flags
    Doctor->>Console: Inspects Patient (Distance, Dialect, Escort Status)
    Console-->>Doctor: Shows Non-Clinical Context (Does NOT alter clinical autonomy)
    Doctor->>Doctor: Conducts Consultation with Sensitivity to Travel Constraints
```

---

## 4. ASHA Field Cadre Doorstep Logging Workflow

```mermaid
sequenceDiagram
    autonumber
    actor ASHA as Frontline ASHA Worker
    participant Field as ASHA Field Console
    participant API as PFIS API Engine

    ASHA->>Field: Visits Rural Household
    ASHA->>Field: Identifies Systemic Access Barrier (Lost Wage, Flooded Road, Missing Ayushman Card)
    ASHA->>Field: Taps "Log Barrier" (/asha/log-barrier)
    Field->>API: POST /api/asha/log-barrier
    API-->>Field: Confirms Telemetry Ingested
    API-->>API: Recalculates Cluster Friction & Alerts PHC Coordinator
```

---

## 5. Government Policy & District Intervention Workflow

```mermaid
flowchart TD
    StartGov([Government Official Logs In]) --> OpenDash[Open District Dashboard]
    OpenDash --> InspectLeakage[Analyze 5-Stage Care Leakage Funnel]
    InspectLeakage --> SpotDrop[Identify 42% Drop at Diagnostic Stage]
    SpotDrop --> Heatmap[Inspect Friction Map for Transit Deserts]
    Heatmap --> DeployIntervention[Deploy Mobile Diagnostic Camp Intervention]
    DeployIntervention --> TrackImpact[Monitor Real-Time Retention Gain]
```

---

## 6. Admin Master Simulation & 0/1 Knapsack Optimization

```mermaid
flowchart TD
    StartAdmin([Admin Logs In with Verified Email]) --> OpenConsole[Open Admin Console]
    OpenConsole --> LaunchSim[Launch What-If Simulator]
    LaunchSim --> ConfigPackage[Configure Policy Interventions]
    ConfigPackage --> RunKnapsack[Run 0/1 Knapsack Budget Optimizer]
    RunKnapsack --> OptimalResult[View Optimal Allocation for District Health Budget]
    OptimalResult --> ExportPolicy[Export Verified Implementation Plan]
```

---

## 7. Google OAuth & Role Onboarding Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User as New or Returning User
    participant Browser as Web Browser
    participant API as PFIS Backend
    participant Whitelist as Admin Whitelist

    User->>Browser: Clicks "Sign in with Google"
    Browser->>API: POST /api/auth/google (Google ID Token)
    
    alt Existing User
        API-->>Browser: Returns Signed JWT + Existing Profile
    else New User
        alt Email matches Admin Whitelist
            API-->>Browser: Auto-provisions Admin Role + Returns JWT
        else Public User
            API-->>Browser: Returns needsOnboarding: true
            Browser-->>User: Displays Onboarding Modal: "How would you like to use PFIS?"
            User->>Browser: Selects Role (Patient, Hospital, Doctor, ASHA, or Government)
            Browser->>API: POST /api/auth/complete-onboarding
            alt User attempted to submit role === 'admin'
                API-->>Browser: 403 Forbidden (Strict Security Boundary)
            else Valid Public Role Selected
                API-->>Browser: Returns Signed JWT + Initializes Role Profile
            end
        end
    end
```
