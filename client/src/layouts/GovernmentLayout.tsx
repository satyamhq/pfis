import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { DemoModeBanner } from '../components/common/DemoModeBanner';
import { useAuth } from '../context/AuthContext';
import { Loader2, ShieldCheck, Lock } from 'lucide-react';

export const GovernmentLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'government' && user.role !== 'admin') {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DemoModeBanner message="GOVERNMENT HEALTH PLANNING SUITE: District-wide care leakage monitoring, macro-level friction heatmaps, and simulated intervention policies." />

      {/* Privacy-Preserving Compliance Banner */}
      <div className="bg-emerald-900 text-emerald-100 px-4 py-2 text-xs flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-semibold text-white">
            PRIVACY-PRESERVING AGGREGATE VIEW:
          </span>
          <span className="text-emerald-200 hidden md:inline">
            Individual citizen PII (names, phone numbers, exact addresses) is masked. All metrics represent anonymized district-level population intelligence.
          </span>
          <div className="ml-auto flex items-center gap-1 text-emerald-300 bg-emerald-800 px-2 py-0.5 rounded-full text-[11px] font-medium border border-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>DPDP Act & DISHA Compliant</span>
          </div>
        </div>
      </div>

      <Navbar />
      <div className="flex-grow flex max-w-7xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
