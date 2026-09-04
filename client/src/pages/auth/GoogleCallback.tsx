import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { OnboardingModal } from './OnboardingModal';

export const GoogleCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuthSession } = useAuth();

  const [status, setStatus] = useState<'processing' | 'success' | 'onboarding' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [onboardingData, setOnboardingData] = useState<{ email: string; name?: string; avatarUrl?: string } | null>(null);

  const hasCalledRef = React.useRef(false);

  const getDashboardPath = (roleName: string) => {
    switch (roleName) {
      case 'admin': return '/admin/dashboard';
      case 'hospital': return '/hospital/dashboard';
      case 'doctor': return '/doctor/dashboard';
      case 'asha': return '/asha/dashboard';
      case 'government': return '/government/dashboard';
      case 'patient':
      default: return '/patient/dashboard';
    }
  };

  useEffect(() => {
    // 1. If already authenticated, redirect straight to dashboard
    const existingToken = localStorage.getItem('pfis_auth_token') || localStorage.getItem('pfis_token');
    const existingUser = localStorage.getItem('pfis_auth_user') || localStorage.getItem('pfis_user');
    if (existingToken && existingUser) {
      try {
        const parsedUser = JSON.parse(existingUser);
        navigate(getDashboardPath(parsedUser.role), { replace: true });
        return;
      } catch {}
    }

    // 2. Prevent React 18 StrictMode double-fetch from consuming code twice
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    const handleCallback = async () => {
      const code = searchParams.get('code');
      const rawState = searchParams.get('state') || 'patient';
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setStatus('error');
        setErrorMessage(`Google authentication was cancelled or rejected (${errorParam}).`);
        return;
      }

      if (!code) {
        setStatus('error');
        setErrorMessage('No authorization code was received from Google.');
        return;
      }

      let role = 'patient';
      let clientId = '';
      try {
        const parsed = JSON.parse(decodeURIComponent(rawState));
        role = parsed.role || 'patient';
        clientId = parsed.clientId || '';
      } catch {
        role = rawState || 'patient';
      }

      try {
        const res = await authService.googleCallback(code, role, clientId);

        // Check if user is new public user requiring onboarding role selection
        if (res.needsOnboarding) {
          setOnboardingData({
            email: res.email || '',
            name: res.name || '',
            avatarUrl: res.avatarUrl || '',
          });
          setStatus('onboarding');
          return;
        }

        if (res.success && res.token && res.user) {
          setAuthSession(res.token, res.user, res.profile);

          setUserProfile(res.user);
          setStatus('success');

          const targetRole = res.user.role;
          setTimeout(() => {
            navigate(getDashboardPath(targetRole), { replace: true });
          }, 600);
        } else {
          // If token was already created
          const tokenNow = localStorage.getItem('pfis_auth_token') || localStorage.getItem('pfis_token');
          if (tokenNow) {
            navigate('/admin/dashboard', { replace: true });
            return;
          }
          setStatus('error');
          setErrorMessage(res.message || 'Authentication failed during Google profile verification.');
        }
      } catch (err: any) {
        console.error('[GoogleCallback Page Error]', err);
        // If already authenticated in localStorage despite duplicate request error
        const tokenNow = localStorage.getItem('pfis_auth_token') || localStorage.getItem('pfis_token');
        if (tokenNow) {
          navigate('/admin/dashboard', { replace: true });
          return;
        }

        setStatus('error');
        const rawMsg = err.response?.data?.message || '';
        if (rawMsg.toLowerCase().includes('bad request') || rawMsg.toLowerCase().includes('invalid_grant')) {
          setErrorMessage(
            'The Google login authorization code has expired or was already consumed. Please return to Login and click "Sign in with Google" again, or use 1-click password login.'
          );
        } else {
          setErrorMessage(rawMsg || 'Failed to exchange authorization code with Google Cloud OAuth.');
        }
      }
    };

    handleCallback();
  }, [searchParams, navigate, setAuthSession]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      {status === 'onboarding' && onboardingData && (
        <OnboardingModal
          email={onboardingData.email}
          name={onboardingData.name}
          avatarUrl={onboardingData.avatarUrl}
        />
      )}

      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 text-center space-y-6">
        {status === 'processing' && (
          <div className="space-y-4">
            <div className="relative flex justify-center">
              <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Verifying with Google Cloud...
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Securely completing OAuth 2.0 exchange and initializing your non-clinical profile.
              </p>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Google Cloud Client Secret Connected</span>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="relative flex justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-emerald-600" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Welcome, {userProfile?.name || 'Authenticated User'}!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Google account verified successfully. Redirecting you to your portal dashboard...
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-5">
            <div className="relative flex justify-center">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center">
                <AlertCircle className="w-9 h-9 text-rose-600" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Authentication Error
              </h2>
              <p className="text-xs text-rose-600 mt-2 bg-rose-50 p-3 rounded-xl border border-rose-200 text-left leading-relaxed">
                {errorMessage}
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-600/20 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Login</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
