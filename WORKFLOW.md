# PFIS Operational Workflows & User Journeys

This document outlines the end-to-end operational workflows, state machines, and user journeys executed across the **Patient Friction Intelligence System (PFIS)**.

---

## 1. End-to-End Patient Journey Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Patient as Vulnerable Patient / Caregiver
    participant Portal as PFIS Patient Portal
    participant Engine as Friction & Risk Engine
    participant Hospital as Hospital Triage Console
    participant Staff as Hospital Ground Staff (Sahayak)

    Patient->>Portal: Registers / Logs In (or 1-Click Demo Access)
    Patient->>Portal: Inputs Non-Clinical Accessibility Parameters (Distance, Bus transit, Wage loss, etc.)
    Portal->>Engine: POST /api/patients/me (Save Profile)
    Engine-->>Portal: Computes 8-Dimension Friction Score & Dropout Risk
    Portal-->>Patient: Displays Explainable Friction Fingerprint & Bottlenecks
    
    Patient->>Portal: Searches Nearby Hospitals (GPS Proximity)
    Portal-->>Patient: Displays Verified Hospitals with Accessibility Badges
    
    Patient->>Portal: Submits Intake Request (Chooses OPD Window, Wheelchair Escort, Transport Shuttle)
    Patient->>Portal: Selects Consented Non-Clinical Factors to Disclose
    Portal->>Hospital: POST /api/requests (Pending Triage)
    
    Hospital->>Hospital: Reviews Consented Non-Clinical Accessibility Matrix
    Hospital->>Staff: Assigns Ground Escort / Allocates Morning Token
    Hospital->>Portal: PATCH /api/requests/:id/status (Approved & Scheduled)
    
    Portal-->>Patient: Real-Time Notification (Token # & Escort Assigned)
    Patient->>Staff: Arrives at Hospital -> Meets Escort -> Completes Consultation Without Dropout
```

### Key Stages Explained:
1. **Intake & Demographics**: The patient or an ASHA health worker records the patient's distance from the facility, transit frequency, phone type, literacy level, caregiver availability, and daily wage dependency.
2. **Explainable Scoring**: The system calculates the friction score (0–100) and displays plain-language mitigation actions.
3. **Consent Handshake**: The patient decides exactly which operational factors (e.g., mobility disability, transit schedule) are transmitted to the receiving hospital.
4. **Closing the Loop**: The hospital nodal officer reviews the request, reserves an OPD token matching the patient's transit arrival, and arranges a ramp concierge.

---

## 2. Hospital Triage & Token Quota Workflow

```mermaid
stateDiagram-v2
    [*] --> Pending: Patient Submits Request
    Pending --> Processing: Nodal Officer Opens Request
    Processing --> Approved: Facility Can Accommodate Access Needs
    Processing --> Declined: Capacity Exhausted / Redirected
    Approved --> Scheduled: Token Number & Escort Assigned
    Scheduled --> Completed: Patient Arrives & Attends OPD
    Declined --> [*]
    Completed --> [*]
```

### Operational Steps for Hospital Staff:
1. **Request Intake**: Staff navigate to `/hospital/requests` to review the prioritized queue.
2. **Accessibility Inspection**: Staff review the patient's consented barriers (e.g., *"Patient arriving by 09:30 AM bus; needs wheelchair ramp assistance at Gate 1"*).
3. **Action Allocation**: Staff assign a patient concierge or reserve a subsidized transport seat.
4. **Token Decrement**: The department's daily token counter automatically decrements to prevent overcrowding.
5. **Patient Notification**: An automatic notification is dispatched to the patient's dashboard with arrival instructions.

---

## 3. Administrative Policy & What-If Simulation Workflow

```mermaid
flowchart TD
    StartAdmin([Admin Logs In with Authorized Email]) --> LoadDash[Load Statewide Health Intelligence Overview]
    LoadDash --> InspectMap[Examine Population Friction Heatmap & Clusters]
    InspectMap --> IdentifyDrop[Identify Leakage Hotspot: e.g. 52% Drop in Diagnostics]
    IdentifyDrop --> OpenSim[Launch What-If Simulation Engine]
    OpenSim --> AdjustSliders[Configure Proposed Interventions: e.g., 70% Transport Subsidy + 50% ASHA Navigators]
    AdjustSliders --> RunSim[Execute Diminishing-Returns Simulation Algorithm]
    RunSim --> ReviewResults[Review Projected Care Completion Gain & Lives Helped]
    ReviewResults --> RunOpt[Launch Budget Optimizer for Fixed Cap e.g. ₹10,00,000]
    RunOpt --> FinalPolicy[Export Optimal Resource Allocation Plan for District Health Society]
```

### Operational Steps for Administrators:
1. **Monitor Drop-out Leakage**: Review the 5-stage patient attrition funnel (`/admin/care-leakage`) to identify where patients are lost.
2. **Attribute Failure Root Causes**: Run Why Care Failed attribution (`/admin/care-failure`) to separate transit failure from financial or documentation barriers.
3. **Simulate Interventions**: Use `/admin/simulator` to test policy packages and assess whether community transport vouchers yield higher completion rates than teleconsultation kiosks.
4. **Optimize Expenditure**: Input available district funding into `/admin/interventions` to receive an optimal knapsack allocation.

---

## 4. Authentication, RBAC & Security Session Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Admin
    participant Client as Web Browser
    participant API as API Server
    participant DB as Relational Database
    participant Audit as Audit Logging Service

    User->>Client: Enters Credentials / Google OAuth
    Client->>API: POST /api/auth/login
    API->>DB: Query User Record by Email
    
    alt User is Authorized Admin (Email in Whitelist)
        API->>DB: Enforce role = 'admin' & is_admin = true
    else User is Regular Patient / Hospital
        API->>DB: Enforce role = 'patient' or 'hospital' (Demote if falsely claiming admin)
    end

    API->>API: Generate Signed JWT with Role & User ID (7-day expiry)
    API-->>Client: Return Token & User Profile
    Client->>Client: Store pfis_auth_token & pfis_auth_profile in localStorage

    Note over Client,API: User calls Protected Admin Route (/api/admin/dashboard)
    Client->>API: GET /api/admin/dashboard (Bearer JWT)
    API->>API: [authenticate] Middleware verifies token signature & expiration
    API->>API: [requireAdmin] Middleware verifies role === 'admin' AND email in Whitelist
    
    alt Verification Passes
        API->>DB: Fetch Aggregated Population Analytics
        API-->>Client: 200 OK with Admin Dashboard Data
    else Verification Fails (Unauthorized Attempt)
        API->>Audit: Log SECURITY_UNAUTHORIZED_ADMIN_ATTEMPT
        API-->>Client: 403 Forbidden
    end

    Note over Client,API: User Logs Out
    User->>Client: Clicks Logout
    Client->>API: POST /api/auth/logout
    Client->>Client: Purge pfis_auth_token, pfis_auth_user, pfis_auth_profile from localStorage
    Client-->>User: Redirect to /login
```
