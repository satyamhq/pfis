import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { DemoModeBanner } from '../components/common/DemoModeBanner';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const AdminLayout: React.FC = () => {
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

  if (user.role !== 'admin') {
    const roleRoutes: Record<string, string> = {
      patient: '/patient/dashboard',
      hospital: '/hospital/dashboard',
      doctor: '/doctor/dashboard',
      asha: '/asha/dashboard',
      government: '/government/dashboard',
    };
    return <Navigate to={roleRoutes[user.role] || '/login'} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70">
      <DemoModeBanner message="ADMINISTRATIVE HEALTH INTELLIGENCE SUITE: Population friction heatmaps, care leakage analytics, and What-If budget intervention simulations." />
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
