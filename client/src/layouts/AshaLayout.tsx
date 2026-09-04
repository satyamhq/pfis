import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { DemoModeBanner } from '../components/common/DemoModeBanner';
import { useAuth } from '../context/AuthContext';
import { Loader2, HeartHandshake, Wifi } from 'lucide-react';

export const AshaLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'asha' && user.role !== 'admin') {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70">
      <DemoModeBanner message="ASHA GRASSROOTS HEALTH ACTIVIST PORTAL: Doorstep barrier tracking, transit accompaniment, and vernacular care cards." />

      {/* Field Active Status Banner */}
      <div className="bg-rose-50 border-b border-rose-200 text-rose-950 px-4 py-2 text-xs flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 max-w-7xl 2xl:max-w-[1440px] mx-auto w-full">
          <HeartHandshake className="w-4 h-4 text-rose-600 shrink-0" />
          <span className="font-semibold">
            COMMUNITY SUB-CENTER CLUSTER:
          </span>
          <span className="text-rose-800">
            Assigned Village Cluster (Mehli Sub-Center) | Kapurthala, Punjab
          </span>
          <div className="ml-auto flex items-center gap-1.5 text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200 text-[11px] font-medium">
            <Wifi className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>Field Sync Online</span>
          </div>
        </div>
      </div>

      <Navbar />
      <div className="flex-grow flex max-w-7xl 2xl:max-w-[1440px] mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
