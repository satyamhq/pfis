# PFIS REST API Specification

The **Patient Friction Intelligence System (PFIS)** exposes an OpenAPI-compliant RESTful API. All requests and responses communicate via JSON unless otherwise specified.

---

## 1. Global Conventions

### 1.1 Base URL
```
Production: https://pfis.health.gov.in/api
Development: http://localhost:5000/api
```

### 1.2 Authentication Header
Endpoints requiring authentication must include the JSON Web Token in the HTTP `Authorization` header:
```http
Authorization: Bearer <your_jwt_token>
```

### 1.3 Standard HTTP Status Codes
| Code | Meaning | Description |
| :---: | :--- | :--- |
| `200` | OK | Request succeeded, returns requested resource or status |
| `201` | Created | Resource successfully created |
| `400` | Bad Request | Malformed payload or validation error |
| `401` | Unauthorized | Missing or expired JWT token |
| `403` | Forbidden | Insufficient role or unauthorized administrator attempt |
| `404` | Not Found | Target endpoint or resource does not exist |
| `409` | Conflict | Duplicate resource (e.g., email already registered) |
| `429` | Rate Limited | Exceeded IP rate limit window (1000 requests / 15 min) |
| `500` | Internal Error | Server-side execution exception |

---

## 2. Authentication & Session Management

### `POST /api/auth/register`
Registers a new user account.
- **Request Body**:
  ```json
  {
    "name": "Sunita Devi",
    "email": "sunita@example.com",
    "password": "SecurePassword@123",
    "role": "patient",
    "phone": "+91 98765 43210"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGci...",
    "user": {
      "id": "pat_101",
      "name": "Sunita Devi",
      "email": "sunita@example.com",
      "role": "patient"
    }
  }
  ```

### `POST /api/auth/login`
Authenticates credentials and returns a signed JWT.
- **Request Body**:
  ```json
  {
    "email": "sunita@example.com",
    "password": "SecurePassword@123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGci...",
    "user": {
      "id": "pat_101",
      "name": "Sunita Devi",
      "email": "sunita@example.com",
      "role": "patient"
    }
  }
  ```

### `POST /api/auth/google`
Handles Google OAuth 2.0 authentication.
- **New Public User**: Returns `needsOnboarding: true` prompting the user to complete their profile and choose an operational role.
- **Authorized Admin**: Auto-provisions administrative privileges if the email matches the verified `ADMIN_EMAILS` whitelist.

### `POST /api/auth/complete-onboarding`
Sets the public operational role for a newly authenticated Google user.
- **Allowed Roles**: `patient`, `hospital`, `doctor`, `asha`, `government`.
- **Security Rule**: Any request specifying `role: "admin"` is strictly rejected with `403 Forbidden` and logged in the security audit ledger.

### `GET /api/auth/me`
Fetches the active user profile and operational session context.

### `POST /api/auth/logout`
Terminates the session and logs the logout event.

---

## 3. Patient & Friction Intelligence APIs (`role: "patient"`)

### `GET /api/patients/me`
Retrieves the logged-in patient's profile and contact details.

### `PUT /api/patients/me`
Updates demographic parameters, location coordinates, and triggers an automated recalculation of the patient's Friction Fingerprint and Dropout Risk score.

### `GET /api/patients/me/friction`
Retrieves the 8-factor non-clinical friction profile:
```json
{
  "success": true,
  "frictionProfile": {
    "overallAccessibilityScore": 72,
    "dimensions": {
      "geographic": 65,
      "transit": 70,
      "financial": 80,
      "language": 40,
      "digital": 55,
      "documentation": 60,
      "familySupport": 75,
      "scheduling": 50
    },
    "primaryBarrier": "Financial & Wage Loss",
    "secondaryBarrier": "Transit Connectivity"
  }
}
```

### `GET /api/patients/me/risk`
Evaluates care-completion dropout risk and estimated journey completion percentage.

### `GET /api/patients/me/notifications`
Fetches real-time status alerts for appointments, transport dispatches, and token notifications.

---

## 4. Hospital Discovery & Appointment Booking

### `GET /api/hospitals/nearby`
Finds accredited facilities within a specified distance radius using geospatial Haversine calculations:
- **Query Parameters**:
  - `lat` (number): Patient latitude
  - `lng` (number): Patient longitude
  - `radius` (number, optional): Search radius in km (default: 50)
  - `department` (string, optional): Filter by medical specialty
  - `type` (string, optional): Facility type (`Government`, `Private`, `Charitable`)

### `GET /api/hospitals/:id`
Retrieves complete facility profile, live bed vacancies, OPD token quotas, treated illnesses, and emergency availability.

### `POST /api/requests`
Submits a non-clinical intake and appointment assistance request:
- **Request Body**:
  ```json
  {
    "hospitalId": "hosp_apollo_01",
    "department": "Cardiology",
    "preferredDate": "2026-09-10",
    "timeSlot": "Morning (09:00 - 12:00)",
    "chiefComplaint": "Shortness of breath on walking",
    "transportRequired": true,
    "escortRequired": false,
    "vernacularAssistance": true
  }
  ```

---

## 5. Document Vault APIs

### `GET /api/documents`
Lists all uploaded health cards, referral slips, and clinical records.

### `POST /api/documents/upload`
Uploads a document via `multipart/form-data` with automatic MIME-type validation and storage.

### `DELETE /api/documents/:id`
Soft-deletes a record from the vault.

---

## 6. Doctor & Clinical Console APIs (`role: "doctor"`)

### `GET /api/doctor/dashboard`
Returns the doctor's daily OPD patient queue, friction alerts, and medical autonomy disclaimers.

### `GET /api/doctor/patients`
Retrieves monitored patients with travel distance, primary non-clinical barrier, and escort needs.

### `GET /api/doctor/patients/:id`
Returns patient non-clinical friction context, journey timeline, and ASHA field logs.

---

## 7. ASHA Field Cadre APIs (`role: "asha"`)

### `GET /api/asha/dashboard`
Returns community household registry, urgent tasks, and high-friction household counts.

### `GET /api/asha/patients`
Lists village patients with transit, documentation, and digital literacy status.

### `POST /api/asha/log-barrier`
1-tap doorstep barrier logging:
```json
{
  "patientId": "pat_101",
  "barrierType": "Transit Deserts",
  "severity": "CRITICAL",
  "notes": "No bus service after 11 AM from village junction."
}
```

---

## 8. Hospital Triage Operations APIs (`role: "hospital"`)

### `GET /api/hospitals/profile/me`
Retrieves the logged-in hospital's profile and live operational metrics.

### `PUT /api/hospitals/profile/me`
Updates bed counts, OPD quotas, departments, and contact numbers.

### `GET /api/requests/hospital`
Returns the hospital's incoming access requests categorized by status (`new`, `under_review`, `accepted`, `rejected`, `completed`).

### `PATCH /api/requests/:id/status`
Updates request triage status and assigns OPD tokens.

---

## 9. Government Health Directorate APIs (`role: "government"`)

### `GET /api/government/dashboard`
Returns district-wide friction index, 5-stage care leakage funnel, and retention stats.

### `GET /api/government/friction-map`
Returns DPDP-compliant, privacy-preserved population density clusters with aggregated barrier breakdowns.

### `GET /api/government/interventions`
Lists active public health interventions across the district.

### `POST /api/government/interventions`
Deploys a new regional intervention package (e.g. Health Shuttle, Diagnostic Camp).

---

## 10. Simulation & Policy Optimization APIs

### `POST /api/simulation/run`
Simulates patient journey completion rates under various intervention presets:
- **Request Body**:
  ```json
  {
    "patientId": "pat_101",
    "activeInterventions": ["free_shuttle", "asha_escort", "teleconsult_kiosk"]
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "baselineCompletionRate": 38,
    "simulatedCompletionRate": 82,
    "absoluteGain": 44
  }
  ```

### `POST /api/simulation/optimize`
Algorithmic 0/1 Knapsack optimizer that calculates the optimal policy package to maximize patient retention under a given public budget constraint.

---

## 11. Admin Master Suite APIs (`role: "admin"`)

*Strictly restricted to verified admin emails (`ADMIN_EMAILS` whitelist).*

| Endpoint | Method | Purpose |
|---|:---:|---|
| `/api/admin/dashboard` | `GET` | District aggregate statistics and friction distribution. |
| `/api/admin/friction-map` | `GET` | Macro-geographic density heatmap clusters. |
| `/api/admin/care-leakage` | `GET` | Touchpoint drop-off and care retention funnels. |
| `/api/admin/care-failure` | `GET` | Causal root cause attribution models. |
| `/api/admin/patients` | `GET` | Master patient population registry with friction scores. |
| `/api/admin/hospitals` | `GET` | Accredited healthcare facility directory. |
| `/api/admin/hospitals` | `POST` | Onboard and accredit a new hospital facility. |
| `/api/admin/hospitals/:id` | `DELETE` | Remove a facility from the accredited directory. |
| `/api/admin/audit-logs` | `GET` | Immutable cryptographic security and access audit ledger. |
