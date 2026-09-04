import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { DemoModeBanner } from '../components/common/DemoModeBanner';
import { useAuth } from '../context/AuthContext';
import { Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const DoctorLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'doctor' && user.role !== 'admin') {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DemoModeBanner message="DOCTOR DECISION-SUPPORT PORTAL: Tracking non-clinical care journey friction, transit barriers, and diagnostic drop-off risks." />
      
      {/* High-Visibility Clinical Decision-Support Notice */}
      <div className="bg-amber-500/10 border-b border-amber-300 text-amber-900 px-4 py-2 text-xs flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-semibold">
            NON-CLINICAL DECISION SUPPORT NOTICE:
          </span>
          <span className="text-amber-800 hidden sm:inline">
            PFIS highlights logistical, socio-economic, and travel friction. It does not evaluate clinical diagnosis or replace licensed physician judgment.
          </span>
          <div className="ml-auto flex items-center gap-1 text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-medium text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>MCI / Verified Physician Session</span>
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
