import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { Activity, Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const { simpleLanguageMode } = useLanguage();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resetLink, setResetLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await api.post('/auth/forgot-password', { email });
      if (res.data.success) {
        setIsSubmitted(true);
        if (res.data.resetLink) {
          setResetLink(res.data.resetLink);
        }
        toast.success(
          simpleLanguageMode
            ? 'Password reset instructions have been created.'
            : 'Password recovery instructions have been dispatched.'
        );
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        'Unable to process request. Please ensure this email is registered.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Brand Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
              <Activity className="w-5 h-5 text-teal-600" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">PFIS</span>
          </Link>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {simpleLanguageMode ? 'Reset Your Account Password' : 'Account Password Recovery'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {simpleLanguageMode
              ? 'Enter your email to receive a password reset link.'
              : 'Enter your registered email address to receive password update instructions.'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {simpleLanguageMode ? 'Your Email Address' : 'Registered Email ID'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. patient@pfis.org or yourname@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 transition-all shadow-2xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs tracking-wide shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{simpleLanguageMode ? 'Send Reset Link' : 'Generate Recovery Link'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-2 space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {simpleLanguageMode ? 'Reset Link Ready!' : 'Recovery Link Generated'}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  We have verified account <span className="font-semibold text-teal-700">{email}</span>.
                </p>
              </div>

              {resetLink && (
                <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-left">
                  <p className="text-[11px] font-bold text-teal-800 mb-1">Instant Demo Reset Link:</p>
                  <Link
                    to={resetLink}
                    className="text-xs text-teal-700 underline hover:text-teal-900 break-all font-mono"
                  >
                    Click here to set your new password
                  </Link>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Try another email
              </button>
            </div>
          )}

          {/* Bottom navigation */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link to="/auth/login" className="inline-flex items-center gap-1.5 hover:text-teal-600 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
            <Link to="/auth/register" className="hover:text-teal-600 transition-colors">
              Create New Account
            </Link>
          </div>
        </div>

        {/* Non-Clinical Guardrail Notice */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-teal-600" />
            <span>PFIS is a non-clinical healthcare accessibility navigation portal.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
