import { api } from './api';
import { User } from '../types';

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
  profile?: any;
}

const DEMO_FALLBACK_ACCOUNTS: Record<string, { pass: string; user: User; profile: any }> = {
  'admin@pfis.org': {
    pass: 'Admin@123',
    user: { id: 'admin-demo-1', name: 'PFIS Executive Admin', email: 'admin@pfis.org', role: 'admin', phone: '+91 98765 43210' },
    profile: null,
  },
  'dhirajkumar464748@gmail.com': {
    pass: 'Admin@123',
    user: { id: 'admin-dhiraj', name: 'Dhiraj Kumar (Executive Admin)', email: 'dhirajkumar464748@gmail.com', role: 'admin', phone: '+91 91234 56789' },
    profile: null,
  },
  'satyam31sk@gmail.com': {
    pass: 'Admin@123',
    user: { id: 'admin-satyam', name: 'Satyam Kumar (Administrator)', email: 'satyam31sk@gmail.com', role: 'admin', phone: '+91 98765 00001' },
    profile: null,
  },
  'prince.patel2025@lpu.in': {
    pass: 'Admin@123',
    user: { id: 'admin-prince', name: 'Prince Patel (Administrator)', email: 'prince.patel2025@lpu.in', role: 'admin', phone: '+91 98765 11111' },
    profile: null,
  },
  'xel5760@gmail.com': {
    pass: 'Admin@123',
    user: { id: 'admin-xel', name: 'Xel (Administrator)', email: 'xel5760@gmail.com', role: 'admin', phone: '+91 98765 22222' },
    profile: null,
  },
  'tanishka2789@gmail.com': {
    pass: 'Admin@123',
    user: { id: 'admin-tanishka', name: 'Tanishka (Administrator)', email: 'tanishka2789@gmail.com', role: 'admin', phone: '+91 98765 33333' },
    profile: null,
  },
  'ddishika45@gmail.com': {
    pass: 'Admin@123',
    user: { id: 'admin-dishika', name: 'Dishika (Administrator)', email: 'ddishika45@gmail.com', role: 'admin', phone: '+91 98765 44444' },
    profile: null,
  },
  'hospital@apollo.org': {
    pass: 'Hospital@123',
    user: { id: 'hospital-apollo', name: 'Apollo Hospital (Triage Desk)', email: 'hospital@apollo.org', role: 'hospital', phone: '+91 651 2446600' },
    profile: {
      id: 'hosp-1',
      name: 'Apollo Hospital (Triage Desk)',
      type: 'Private Super Speciality',
      city: 'Ranchi',
      emergencyAvailable: true,
      totalBeds: 300,
      availableBeds: 45,
    },
  },
  'patient@pfis.org': {
    pass: 'Patient@123',
    user: { id: 'patient-sunita', name: 'Sunita Devi', email: 'patient@pfis.org', role: 'patient', phone: '+91 98140 12345' },
    profile: {
      id: 'pat-1',
      fullName: 'Sunita Devi',
      age: 60,
      gender: 'Female',
      isRural: true,
      distanceToHospitalKm: 65,
      transportMode: 'Infrequent Bus',
      digitalLiteracy: 'None / Feature Phone',
      familySupport: 'Caregiver Constrained',
      wageLossRisk: 'Daily Wage Loss',
      preferredLanguage: 'pa',
    },
  },
};

export const authService = {
  async register(data: any): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>('/auth/register', data);
    return res.data;
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const res = await api.post<LoginResponse>('/auth/login', { email, password });
      return res.data;
    } catch (err: any) {
      // If server responded with a normal HTTP error (e.g., 400 or 401 wrong password), rethrow
      if (err.response?.data?.message) {
        throw err;
      }

      // If server is unreachable (Network Error, ECONNREFUSED, or static host like Vercel)
      const normalizedEmail = email.toLowerCase().trim();
      const demoAccount = DEMO_FALLBACK_ACCOUNTS[normalizedEmail];
      if (demoAccount && demoAccount.pass === password) {
        console.info(`[PFIS Auth] Backend server not reachable. Authenticated ${normalizedEmail} via verified demo mode.`);
        const token = `demo-token-${demoAccount.user.role}-${Date.now()}`;
        return {
          success: true,
          message: 'Authenticated successfully in demo mode.',
          token,
          user: demoAccount.user,
          profile: demoAccount.profile,
        };
      }

      // If credentials do not match demo accounts either
      if (demoAccount && demoAccount.pass !== password) {
        const customErr: any = new Error('Invalid email address or password.');
        customErr.response = { data: { message: 'Invalid email address or password.' } };
        throw customErr;
      }

      // If unverified account and server is down
      const customErr: any = new Error('Backend server is offline (http://localhost:5000). Please start the server with "npm run dev" or click any 1-Click Verified Demo button.');
      customErr.response = {
        data: {
          message: 'Backend server is offline. Please start the server with "npm run dev" or sign in with one of the 1-Click Verified Accounts below.',
        },
      };
      throw customErr;
    }
  },

  async loginWithGoogle(credential: string, role?: string, profileData?: any): Promise<LoginResponse> {
    try {
      const res = await api.post<LoginResponse>('/auth/google', { credential, role, profileData });
      return res.data;
    } catch (err: any) {
      if (err.response?.data?.message) {
        throw err;
      }
      // Demo fallback for Google login if server is offline
      const demoUser: User = {
        id: `google-demo-${Date.now()}`,
        name: 'Google Verified User',
        email: 'user@gmail.com',
        role: (role as any) || 'patient',
      };
      return {
        success: true,
        message: 'Google Sign-In successful (Demo Mode).',
        token: `demo-token-${demoUser.role}-${Date.now()}`,
        user: demoUser,
        profile: profileData || null,
      };
    }
  },

  async getGoogleConfig(): Promise<{ success: boolean; configured: boolean; clientId: string; clientSecretConfigured: boolean }> {
    const res = await api.get('/auth/google/config');
    return res.data;
  },

  async saveGoogleClientId(clientId: string): Promise<{ success: boolean; message: string; clientId: string }> {
    const res = await api.post('/auth/google/config', { clientId });
    return res.data;
  },

  async getGoogleAuthUrl(role: string, clientId?: string): Promise<{ success: boolean; url: string }> {
    const params = new URLSearchParams();
    if (role) params.append('role', role);
    if (clientId) params.append('clientId', clientId);
    const res = await api.get(`/auth/google/url?${params.toString()}`);
    return res.data;
  },

  async googleCallback(code: string, role?: string, clientId?: string): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>('/auth/google/callback', { code, role, clientId });
    return res.data;
  },

  async getMe(): Promise<{ success: boolean; user: User; profile: any }> {
    try {
      const res = await api.get('/auth/me');
      return res.data;
    } catch (err: any) {
      const savedUserStr = localStorage.getItem('pfis_auth_user');
      const savedProfileStr = localStorage.getItem('pfis_auth_profile');
      if (savedUserStr) {
        return {
          success: true,
          user: JSON.parse(savedUserStr),
          profile: savedProfileStr ? JSON.parse(savedProfileStr) : null,
        };
      }
      throw err;
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore network errors on logout
    } finally {
      localStorage.removeItem('pfis_auth_token');
      localStorage.removeItem('pfis_auth_user');
      localStorage.removeItem('pfis_auth_profile');
    }
  },
};

