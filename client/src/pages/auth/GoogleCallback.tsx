import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export const GoogleCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuthSession } = useAuth();

  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  const hasCalledRef = React.useRef(false);

  useEffect(() => {
    // 1. If already authenticated, redirect straight to dashboard
    const existingToken = localStorage.getItem('pfis_token');
    const existingUser = localStorage.getItem('pfis_user');
    if (existingToken && existingUser) {
      try {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
          return;
        } else if (parsedUser.role === 'hospital') {
          navigate('/hospital/dashboard', { replace: true });
          return;
        } else {
          navigate('/patient/dashboard', { replace: true });
          return;
        }
      } catch {}
    }

    // 2. Prevent React 18 StrictMode double-fetch from consuming code twice
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    const handleCallback = async () => {
      const code = searchParams.get('code');
      const rawState = searchParams.get('state') || 'admin';
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

      let role = 'admin';
      let clientId = '';
      try {
        const parsed = JSON.parse(decodeURIComponent(rawState));
        role = parsed.role || 'admin';
        clientId = parsed.clientId || '';
      } catch {
        role = rawState || 'admin';
      }

      try {
        const res = await authService.googleCallback(code, role, clientId);
        if (res.success && res.token && res.user) {
          setAuthSession(res.token, res.user, res.profile);

          setUserProfile(res.user);
          setStatus('success');

          setTimeout(() => {
            if (res.user.role === 'admin') navigate('/admin/dashboard', { replace: true });
            else if (res.user.role === 'hospital') navigate('/hospital/dashboard', { replace: true });
            else navigate('/patient/dashboard', { replace: true });
          }, 600);
        } else {
          // If token was already created
          const tokenNow = localStorage.getItem('pfis_token');
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
        const tokenNow = localStorage.getItem('pfis_token');
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
