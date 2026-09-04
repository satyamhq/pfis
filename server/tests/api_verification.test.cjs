const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5000/api';

async function req(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${options.method || 'GET'} ${url} returned ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function runAPITests() {
  console.log('===========================================================');
  console.log('  PFIS CORE API & OPERATIONAL INTELLIGENCE SUITE           ');
  console.log('===========================================================');

  // 1. Health Check
  const health = await req(`${BASE_URL}/health`);
  console.log('[PASS] /api/health: OK | Status:', health.status, '| System:', health.system);

  // 2. Patient Authentication & Endpoints
  const patientRes = await req(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: 'patient@pfis.org', password: 'Patient@123' })
  });
  console.log('[PASS] Patient Login: OK | User:', patientRes.user?.name, '| Role:', patientRes.user?.role);
  const patientHeaders = { Authorization: `Bearer ${patientRes.token}` };

  const meRes = await req(`${BASE_URL}/patients/me`, { headers: patientHeaders });
  console.log('[PASS] /patients/me: OK | Patient Name:', meRes.patient?.fullName || meRes.patient?.name);

  const frictionRes = await req(`${BASE_URL}/patients/me/friction`, { headers: patientHeaders });
  const score = frictionRes.frictionProfile?.overallFrictionScore ?? frictionRes.frictionProfile?.overallScore;
  console.log('[PASS] /patients/me/friction: OK | Friction Score:', score);

  const riskRes = await req(`${BASE_URL}/patients/me/risk`, { headers: patientHeaders });
  console.log('[PASS] /patients/me/risk: OK | Risk Level:', riskRes.careRisk?.riskLevel || riskRes.careRisk?.riskCategory || 'Calculated');

  const patientReqs = await req(`${BASE_URL}/requests/patient`, { headers: patientHeaders });
  console.log('[PASS] /requests/patient: OK | Active Requests:', patientReqs.requests?.length);

  const notifRes = await req(`${BASE_URL}/notifications`, { headers: patientHeaders });
  console.log('[PASS] /notifications: OK | Unread Count:', notifRes.notifications?.length);

  const nearbyRes = await req(`${BASE_URL}/hospitals/nearby?lat=31.2229&lng=75.7725&radiusKm=50`, { headers: patientHeaders });
  console.log('[PASS] /hospitals/nearby: OK | Facilities Found:', nearbyRes.hospitals?.length);

  // 3. Hospital Authentication & Endpoints
  const apolloRes = await req(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: 'hospital@apollo.org', password: 'Hospital@123' })
  });
  console.log('[PASS] Hospital Login: OK | Facility:', apolloRes.user?.name);
  const apolloHeaders = { Authorization: `Bearer ${apolloRes.token}` };

  const hospProf = await req(`${BASE_URL}/hospitals/profile/me`, { headers: apolloHeaders });
  console.log('[PASS] /hospitals/profile/me: OK | Hospital Profile Loaded');

  const hospReqs = await req(`${BASE_URL}/requests/hospital`, { headers: apolloHeaders });
  console.log('[PASS] /requests/hospital: OK | Triage Queue Size:', hospReqs.requests?.length);

  // 4. Admin Intelligence Endpoints
  const adminRes = await req(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: 'admin@pfis.org', password: 'Admin@123' })
  });
  console.log('[PASS] Master Admin Login: OK | Role:', adminRes.user?.role);
  const adminHeaders = { Authorization: `Bearer ${adminRes.token}` };

  const adminDash = await req(`${BASE_URL}/admin/dashboard`, { headers: adminHeaders });
  console.log('[PASS] /admin/dashboard: OK | Total Patients:', adminDash.stats?.totalPatients, '| Avg Friction:', adminDash.stats?.averageFrictionScore);

  const adminMap = await req(`${BASE_URL}/admin/friction-map`, { headers: adminHeaders });
  console.log('[PASS] /admin/friction-map: OK | District Nodes:', adminMap.clusters?.length || adminMap.length || 'Active');

  const simRes = await req(`${BASE_URL}/simulation/run`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      selectedCodes: ['TRANSPORT_SUBSIDY', 'TELEMEDICINE_ACCESS'],
      baselineProbability: 38,
      cohortSize: 1000
    })
  });
  console.log('[PASS] /api/simulation/run: OK | Simulated Completion Rate:', `${simRes.simulation?.simulatedCompletionProbability}%`);

  console.log('===========================================================');
  console.log('  ALL CORE API ENDPOINTS VERIFIED (100% PASS)             ');
  console.log('===========================================================');
}

if (require.main === module) {
  runAPITests().catch((err) => {
    console.error('API Verification Failed:', err);
    process.exit(1);
  });
}

module.exports = { runAPITests };
