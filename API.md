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
| `429` | Rate Limited | Exceeded IP rate limit window (1000 requests / 15 min) |
| `500` | Internal Error | Server-side execution exception |

---

## 2. Authentication & Session Management

### `POST /api/auth/register`
Creates a new patient or hospital staff account. If `role: "admin"` is requested by an unauthorized email, the backend automatically downgrades the account to `"patient"`.
- **Request Body**:
  ```json
  {
    "name": "Aarav Sharma",
    "email": "aarav@example.com",
    "password": "SecurePassword@123",
    "role": "patient"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGci...",
    "user": { "id": "...", "name": "Aarav Sharma", "email": "aarav@example.com", "role": "patient" }
  }
  ```

### `POST /api/auth/login`
Authenticates user credentials and issues a signed JWT.
- **Request Body**:
  ```json
  { "email": "patient@pfis.org", "password": "Patient@123" }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGci...",
    "user": { "id": "...", "role": "patient", "is_admin": false },
    "profile": { "id": "...", "patientId": "..." }
  }
  ```

### `POST /api/auth/google`
Authenticates Google OAuth 2.0 Identity Token credential.
- **Request Body**:
  ```json
  { "credential": "...", "role": "patient" }
  ```

### `GET /api/auth/me`
Retrieves authenticated user profile and active session context.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**: Current user object, permissions, and profile.

---

## 3. Patient Accessibility & Friction Intelligence

### `GET /api/patients/me`
Retrieves full patient socio-demographic and accessibility profile.

### `PUT /api/patients/me`
Updates patient non-clinical accessibility factors and automatically recalculates 8-dimension friction scores and care risk levels.
- **Request Body**:
  ```json
  {
    "age": 42,
    "preferredLanguage": "hi",
    "transportAvailability": "PUBLIC_BUS",
    "digitalAccessLevel": "SHARED_SMARTPHONE",
    "financialAccessibility": "BPL_CARD",
    "documentationStatus": "AADHAAR_AVAILABLE"
  }
  ```

### `GET /api/patients/me/friction`
Returns computed 8-dimension friction radar metrics, friction grade, and top non-clinical barrier.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "frictionProfile": {
      "overallFrictionScore": 68,
      "overallAccessibilityScore": 32,
      "frictionLevel": "MODERATE",
      "topBarrier": "Transport Availability",
      "dimensionScores": {
        "travelDistance": 75,
        "transportAvailability": 85,
        "financialConstraint": 60,
        "documentation": 20,
        "digitalAccess": 80,
        "languageLiteracy": 45,
        "referralContinuity": 70,
        "diagnosticAccessibility": 50
      }
    }
  }
  ```

### `GET /api/patients/me/risk`
Returns estimated care completion drop-off risk, predicted failure stage, and mitigation recommendations.

---

## 4. Hospital Discovery & GIS Geolocation

### `GET /api/hospitals/nearby`
Finds healthcare facilities sorted by non-clinical friction index and geodesic distance.
- **Query Parameters**:
  - `lat`: User latitude (e.g. `31.2229`)
  - `lng`: User longitude (e.g. `75.7725`)
  - `radiusKm`: Search radius in kilometers (default: `50`)
  - `hasEmergency`: `true` / `false` filter for 24/7 casualty

### `GET /api/hospitals/:id`
Retrieves detailed profile, OPD schedules, transport links, and wheelchair accessibility for a specific hospital.

---

## 5. Non-Clinical Assistance Requests

### `GET /api/requests/patient`
Lists all active and completed non-clinical assistance requests submitted by the logged-in patient.

### `POST /api/requests`
Submits a non-clinical support request (e.g., ASHA escort, community transport, wheelchair assistance).
- **Request Body**:
  ```json
  {
    "hospitalId": "hosp_1",
    "requestType": "COMMUNITY_TRANSPORT",
    "pickupAddress": "Village Raipur, Jalandhar",
    "preferredDate": "2026-09-10T10:00:00Z",
    "notes": "Elderly patient with mobility limitations"
  }
  ```

### `PATCH /api/requests/:id/status`
Updates request status (`HOSPITAL_RECEIVED`, `ACCEPTED`, `ESCORT_DISPATCHED`, `COMPLETED`). Restricted to Hospital Staff and Administrators.

---

## 6. What-If Simulation & Optimization Engine

### `GET /api/simulation/catalog`
Returns the standardized directory of non-clinical healthcare interventions, baseline impact factors, and unit costs in INR.

### `POST /api/simulation/run`
Executes mathematical simulation modeling the population care-completion improvement under chosen interventions.
- **Request Body**:
  ```json
  {
    "selectedCodes": ["TRANSPORT_SUBSIDY", "TELEMEDICINE_ACCESS"],
    "baselineProbability": 38,
    "cohortSize": 1000
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "simulation": {
      "baselineCompletionProbability": 38,
      "simulatedCompletionProbability": 54.8,
      "improvementDeltaPercent": 16.8,
      "estimatedPatientsHelped": 168,
      "totalBudgetINR": 350000
    }
  }
  ```

---

## 7. Administrative Intelligence Suite (Admin RBAC Protected)

*All routes below require `role: "admin"` and verified email membership in the `ADMIN_EMAILS` whitelist.*

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/admin/dashboard` | `GET` | District aggregate stats, average friction, active requests |
| `/api/admin/friction-map` | `GET` | Geographic friction density clusters and high-risk nodes |
| `/api/admin/care-leakage` | `GET` | Funnel drop-off analytics across journey touchpoints |
| `/api/admin/care-failure` | `GET` | Root cause analysis of care abandonment |
| `/api/admin/patients` | `GET` | District patient registry with accessibility tags |
| `/api/admin/hospitals` | `GET` | Master hospital directory and capacity metrics |
| `/api/admin/audit-logs` | `GET` | Immutable security and transaction audit trail |
