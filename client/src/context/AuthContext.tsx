import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService, LoginResponse } from '../services/authService';

interface AuthContextType {
  user: User | null;
  profile: any;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<LoginResponse>;
  loginWithGoogle: (credential: string, role?: string, profileData?: any) => Promise<LoginResponse>;
  register: (data: any) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setAuthSession: (token: string, user: User, profile?: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('pfis_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [profile, setProfile] = useState<any>(() => {
    const saved = localStorage.getItem('pfis_auth_profile');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('pfis_auth_token');
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success) {
            setUser(res.user);
            setProfile(res.profile);
            localStorage.setItem('pfis_auth_user', JSON.stringify(res.user));
            if (res.profile) {
              localStorage.setItem('pfis_auth_profile', JSON.stringify(res.profile));
            }
          }
        } catch (e) {
          console.warn('[AuthContext] Session invalid, clearing local storage.');
          setUser(null);
          setProfile(null);
          setToken(null);
          localStorage.removeItem('pfis_auth_token');
          localStorage.removeItem('pfis_auth_user');
          localStorage.removeItem('pfis_auth_profile');
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, [token]);

  const login = async (email: string, pass: string): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const res = await authService.login(email, pass);
      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        setProfile(res.profile || null);
        localStorage.setItem('pfis_auth_token', res.token);
        localStorage.setItem('pfis_auth_user', JSON.stringify(res.user));
        if (res.profile) {
          localStorage.setItem('pfis_auth_profile', JSON.stringify(res.profile));
        }
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (credential: string, role?: string, profileData?: any): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const res = await authService.loginWithGoogle(credential, role, profileData);
      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        setProfile(res.profile || null);
        localStorage.setItem('pfis_auth_token', res.token);
        localStorage.setItem('pfis_auth_user', JSON.stringify(res.user));
        if (res.profile) {
          localStorage.setItem('pfis_auth_profile', JSON.stringify(res.profile));
        }
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const res = await authService.register(data);
      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        setProfile(res.profile || null);
        localStorage.setItem('pfis_auth_token', res.token);
        localStorage.setItem('pfis_auth_user', JSON.stringify(res.user));
        if (res.profile) {
          localStorage.setItem('pfis_auth_profile', JSON.stringify(res.profile));
        }
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setProfile(null);
    setToken(null);
    localStorage.removeItem('pfis_auth_profile');
  };

  const refreshProfile = async () => {
    if (token) {
      const res = await authService.getMe();
      if (res.success) {
        setUser(res.user);
        setProfile(res.profile);
        localStorage.setItem('pfis_auth_user', JSON.stringify(res.user));
        if (res.profile) {
          localStorage.setItem('pfis_auth_profile', JSON.stringify(res.profile));
        }
      }
    }
  };

  const setAuthSession = (newToken: string, newUser: User, newProfile?: any) => {
    setToken(newToken);
    setUser(newUser);
    setProfile(newProfile || null);
    localStorage.setItem('pfis_auth_token', newToken);
    localStorage.setItem('pfis_auth_user', JSON.stringify(newUser));
    if (newProfile) {
      localStorage.setItem('pfis_auth_profile', JSON.stringify(newProfile));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        refreshProfile,
        setAuthSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
