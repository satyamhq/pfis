import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  MapPin,
  Sparkles,
  ShieldAlert,
  FolderLock,
  User,
  Building2,
  ListOrdered,
  Users,
  GitFork,
  BarChart3,
  Cpu,
  History,
  Sliders,
  Layers,
  Settings,
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  Landmark,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  if (!user) return null;

  const role = user.role;

  const patientLinks = [
    { name: t('nav.dashboard', 'Dashboard'), path: '/patient/dashboard', icon: LayoutDashboard },
    { name: t('nav.hospitals', 'Hospitals'), path: '/patient/hospitals', icon: MapPin },
    { name: 'Teleconsult', path: '/patient/teleconsult', icon: Layers },
    { name: 'Digital Twin', path: '/patient/digital-twin', icon: Sparkles },
    { name: t('nav.frictionProfile', 'Friction Profile'), path: '/patient/friction', icon: Sparkles },
    { name: t('nav.accessibilityRisk', 'Journey Risk'), path: '/patient/risk', icon: ShieldAlert },
    { name: t('nav.myRequests', 'Intake Requests'), path: '/patient/requests', icon: ListOrdered },
    { name: t('nav.myDocuments', 'Documents'), path: '/patient/documents', icon: FolderLock },
    { name: t('auth.fullName', 'Profile'), path: '/patient/profile', icon: User },
    { name: t('nav.settings', 'Settings'), path: '/patient/settings', icon: Settings },
  ];

  const hospitalLinks = [
    { name: t('nav.dashboard', 'Dashboard'), path: '/hospital/dashboard', icon: LayoutDashboard },
    { name: t('nav.triageQueue', 'Intake Queue'), path: '/hospital/requests', icon: ListOrdered },
    { name: 'Teleconsult', path: '/hospital/teleconsult', icon: Layers },
    { name: t('nav.opdManagement', 'Departments'), path: '/hospital/departments', icon: Layers },
    { name: t('nav.hospitalProfile', 'Hospital Profile'), path: '/hospital/profile', icon: Building2 },
    { name: t('nav.settings', 'Settings'), path: '/hospital/settings', icon: Settings },
  ];

  const doctorLinks = [
    { name: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'Patient Queue', path: '/doctor/patients', icon: Users },
    { name: 'Teleconsult', path: '/doctor/teleconsult', icon: Layers },
    { name: 'Settings', path: '/doctor/settings', icon: Settings },
  ];

  const ashaLinks = [
    { name: 'Dashboard', path: '/asha/dashboard', icon: LayoutDashboard },
    { name: 'Households', path: '/asha/patients', icon: Users },
    { name: 'Log Barrier', path: '/asha/log-barrier', icon: Sparkles },
    { name: 'Tasks', path: '/asha/notifications', icon: Layers },
    { name: 'Settings', path: '/asha/settings', icon: Settings },
  ];

  const governmentLinks = [
    { name: 'Dashboard', path: '/government/dashboard', icon: LayoutDashboard },
    { name: 'Friction Map', path: '/government/friction-map', icon: MapPin },
    { name: 'Interventions', path: '/government/interventions', icon: Sliders },
    { name: 'Care Leakage', path: '/government/leakage', icon: GitFork },
    { name: 'Simulator', path: '/government/simulator', icon: Cpu },
    { name: 'Settings', path: '/government/settings', icon: Settings },
  ];

  const adminLinks = [
    { name: t('nav.dashboard', 'Dashboard'), path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Simulator', path: '/admin/simulator', icon: Cpu },
    { name: 'Budget Optimizer', path: '/admin/interventions', icon: Sliders },
    { name: 'Friction Map', path: '/admin/friction-map', icon: MapPin },
    { name: 'Care Leakage', path: '/admin/care-leakage', icon: GitFork },
    { name: 'Root Cause', path: '/admin/care-failure', icon: BarChart3 },
    { name: 'Patient Registry', path: '/admin/patients', icon: Users },
    { name: 'Hospital Directory', path: '/admin/hospitals', icon: Building2 },
    { name: 'Audit Ledger', path: '/admin/audit-logs', icon: History },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  let links = patientLinks;
  let roleIcon = <User className="w-4 h-4 text-emerald-600" />;
  let roleBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
  let roleTitle = 'Patient';

  if (role === 'hospital') {
    links = hospitalLinks;
    roleIcon = <Building2 className="w-4 h-4 text-indigo-600" />;
    roleBadge = 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
    roleTitle = 'Hospital';
  } else if (role === 'doctor') {
    links = doctorLinks;
    roleIcon = <Stethoscope className="w-4 h-4 text-teal-600" />;
    roleBadge = 'bg-teal-50 text-teal-700 border-teal-200/80';
    roleTitle = 'Doctor';
  } else if (role === 'asha') {
    links = ashaLinks;
    roleIcon = <HeartHandshake className="w-4 h-4 text-amber-600" />;
    roleBadge = 'bg-amber-50 text-amber-700 border-amber-200/80';
    roleTitle = 'ASHA Worker';
  } else if (role === 'government') {
    links = governmentLinks;
    roleIcon = <Landmark className="w-4 h-4 text-blue-600" />;
    roleBadge = 'bg-blue-50 text-blue-700 border-blue-200/80';
    roleTitle = 'Government';
  } else if (role === 'admin') {
    links = adminLinks;
    roleIcon = <Shield className="w-4 h-4 text-purple-600" />;
    roleBadge = 'bg-purple-50 text-purple-700 border-purple-200/80';
    roleTitle = 'Admin';
  }

  return (
    <aside className="w-64 bg-white/95 backdrop-blur-md border-r border-slate-200/80 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex shrink-0">
      <div className="space-y-5">
        {/* Active Role Indicator Card */}
        <div className={`p-3 rounded-2xl border ${roleBadge} flex items-center gap-2.5 shadow-2xs`}>
          <div className="p-1.5 rounded-xl bg-white shadow-2xs">
            {roleIcon}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block leading-tight">
              Active Environment
            </span>
            <span className="text-xs font-black truncate block text-slate-900">
              {roleTitle}
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <h5 className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
            Navigation Menu
          </h5>
          <div className="mt-2 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 relative group ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-50/90 to-teal-50/40 text-teal-800 border border-teal-200/80 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 bg-teal-600 rounded-r-full" />
                      )}
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isActive ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      />
                      <span className="truncate">{link.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Non-Clinical Safeguard Card */}
      <div className="p-3.5 bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-2xl border border-slate-200/80 text-[11px] text-slate-600 leading-snug space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <ShieldAlert className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Non-Clinical Safeguard</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          {t('common.nonClinicalNotice', 'Operational access barrier intelligence only. No medical diagnosis or clinical prescription.')}
        </p>
      </div>
    </aside>
  );
};
