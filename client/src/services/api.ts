import axios from 'axios';

export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pfis_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle HTML fallback from static servers (Vercel) & 401s
api.interceptors.response.use(
  (response) => {
    // If static hosting returned HTML instead of JSON for an API call
    if (typeof response.data === 'string' && response.data.trim().startsWith('<!DOCTYPE html')) {
      const error: any = new Error('Backend server is not running or API endpoint not available.');
      error.isServerDown = true;
      return Promise.reject(error);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // If unauthorized on protected route, clean up local state
      const isLoginRoute = window.location.pathname.includes('/login') || window.location.pathname.includes('/register');
      if (!isLoginRoute && localStorage.getItem('pfis_auth_token')) {
        localStorage.removeItem('pfis_auth_token');
        localStorage.removeItem('pfis_auth_user');
        localStorage.removeItem('pfis_auth_profile');
        window.location.href = '/login?session_expired=true';
      }
    }
    return Promise.reject(error);
  }
);
