const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5000/api';

const ADMIN_EMAILS = [
  'satyam31sk@gmail.com',
  'prince.patel2025@lpu.in',
  'dhirajkumar464748@gmail.com',
  'tanishka2789@gmail.com',
  'ddishika45@gmail.com',
];

async function req(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

async function runRBACTests() {
  console.log('===========================================================');
  console.log('  PFIS RBAC & PRIVILEGE SECURITY REGRESSION SUITE          ');
  console.log('===========================================================');

  // 1. Verify 5 Authorized Admin Logins & Dash Access
  console.log('\n--- 1. VERIFYING 5 AUTHORIZED ADMIN LOGINS ---');
  for (const email of ADMIN_EMAILS) {
    const res = await req(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password: 'Admin@123' })
    });

    if (res.status === 200 && res.data.user?.role === 'admin') {
      console.log(`[PASS] Admin ${email} -> Granted role: admin`);
    } else {
      throw new Error(`[FAIL] Login failed for admin: ${email}. Status: ${res.status}`);
    }

    const dashRes = await req(`${BASE_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${res.data.token}` }
    });
    if (dashRes.status === 200 && dashRes.data.success) {
      console.log(`       -> Access /api/admin/dashboard: GRANTED (200 OK)`);
    } else {
      throw new Error(`[FAIL] Admin dashboard rejected for ${email}. Status: ${dashRes.status}`);
    }
  }

  // 2. Verify Patient is blocked from Admin Endpoints
  console.log('\n--- 2. VERIFYING PATIENT AUTHORIZATION BOUNDARY ---');
  const patientLogin = await req(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: 'patient@pfis.org', password: 'Patient@123' })
  });
  const patientDash = await req(`${BASE_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${patientLogin.data.token}` }
  });
  if (patientDash.status === 403) {
    console.log(`[PASS] Patient blocked from /api/admin/dashboard: 403 Forbidden`);
  } else {
    throw new Error(`[FAIL] Patient was NOT blocked! Status: ${patientDash.status}`);
  }

  // 3. Verify Hospital is blocked from Admin Endpoints
  console.log('\n--- 3. VERIFYING HOSPITAL AUTHORIZATION BOUNDARY ---');
  const hospitalLogin = await req(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: 'hospital@apollo.org', password: 'Hospital@123' })
  });
  const hospitalDash = await req(`${BASE_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${hospitalLogin.data.token}` }
  });
  if (hospitalDash.status === 403) {
    console.log(`[PASS] Hospital blocked from /api/admin/dashboard: 403 Forbidden`);
  } else {
    throw new Error(`[FAIL] Hospital was NOT blocked! Status: ${hospitalDash.status}`);
  }

  // 4. Verify Privilege Escalation is Prevented on Registration
  console.log('\n--- 4. VERIFYING PRIVILEGE ESCALATION PREVENTION ---');
  const fakeEmail = `security_probe_${Date.now()}@unauthorized.com`;
  const regRes = await req(`${BASE_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'Unauthorized Probe',
      email: fakeEmail,
      password: 'ProbePassword@123',
      role: 'admin' // Attempted self-promotion
    })
  });
  if (regRes.status === 201 && regRes.data.user?.role === 'patient') {
    console.log(`[PASS] Role override prevented: Requested 'admin', enforced '${regRes.data.user.role}'`);
  } else {
    throw new Error(`[FAIL] Registration granted admin to unauthorized user! Role: ${regRes.data.user?.role}`);
  }

  console.log('===========================================================');
  console.log('  RBAC & PRIVILEGE SECURITY REGRESSION PASSED (100%)       ');
  console.log('===========================================================');
}

if (require.main === module) {
  runRBACTests().catch((err) => {
    console.error('RBAC Regression Failed:', err);
    process.exit(1);
  });
}

module.exports = { runRBACTests };
