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
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  if (!user) return null;

  const role = user.role;

  const patientLinks = [
    { name: t('nav.dashboard', 'Dashboard'), path: '/patient/dashboard', icon: LayoutDashboard },
    { name: 'Digital Twin Simulator', path: '/patient/digital-twin', icon: Sparkles },
    { name: 'Live Teleconsultation', path: '/patient/teleconsult', icon: Layers },
    { name: t('nav.hospitals', 'Find Nearby Hospitals'), path: '/patient/hospitals', icon: MapPin },
    { name: t('nav.frictionProfile', 'Friction Profile'), path: '/patient/friction', icon: Sparkles },
    { name: t('nav.accessibilityRisk', 'Accessibility Risk'), path: '/patient/risk', icon: ShieldAlert },
    { name: t('nav.myRequests', 'My Hospital Requests'), path: '/patient/requests', icon: ListOrdered },
    { name: t('nav.myDocuments', 'Document Vault'), path: '/patient/documents', icon: FolderLock },
    { name: t('auth.fullName', 'Profile & Location'), path: '/patient/profile', icon: User },
    { name: t('nav.settings', 'Settings & Language'), path: '/patient/settings', icon: Settings },
  ];

  const hospitalLinks = [
    { name: t('nav.dashboard', 'Hospital Dashboard'), path: '/hospital/dashboard', icon: LayoutDashboard },
    { name: t('nav.triageQueue', 'Patient Requests Queue'), path: '/hospital/requests', icon: ListOrdered },
    { name: 'Teleconsultation Triage', path: '/hospital/teleconsult', icon: Layers },
    { name: t('nav.opdManagement', 'Departments & OPD'), path: '/hospital/departments', icon: Layers },
    { name: t('nav.hospitalProfile', 'Hospital Profile'), path: '/hospital/profile', icon: Building2 },
    { name: t('nav.settings', 'Settings & Language'), path: '/hospital/settings', icon: Settings },
  ];

  const doctorLinks = [
    { name: 'Decision Support Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'Patient Friction Queue', path: '/doctor/patients', icon: Users },
    { name: 'Non-Clinical Alerts', path: '/doctor/dashboard', icon: ShieldAlert },
    { name: 'Care Journey Tracker', path: '/doctor/patients', icon: GitFork },
  ];

  const ashaLinks = [
    { name: 'Grassroots Dashboard', path: '/asha/dashboard', icon: LayoutDashboard },
    { name: 'Village Patient Registry', path: '/asha/patients', icon: Users },
    { name: 'Log Field Barrier', path: '/asha/log-barrier', icon: Sparkles },
    { name: 'Transit & Escort Requests', path: '/asha/request-transit', icon: ListOrdered },
  ];

  const governmentLinks = [
    { name: 'District Health Overview', path: '/government/dashboard', icon: LayoutDashboard },
    { name: 'Friction Heat-Map', path: '/government/friction-map', icon: MapPin },
    { name: 'Care Leakage Funnel', path: '/government/dashboard', icon: GitFork },
    { name: 'Macro Policy Interventions', path: '/government/interventions', icon: Sliders },
  ];

  const adminLinks = [
    { name: t('nav.dashboard', 'System Dashboard'), path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Friction Digital Twin', path: '/admin/digital-twin', icon: Sparkles },
    { name: t('nav.whatIfSimulator', 'What-If Simulator'), path: '/admin/simulator', icon: Cpu },
    { name: t('nav.budgetOptimizer', 'Budget Optimizer'), path: '/admin/interventions', icon: Sliders },
    { name: t('nav.populationMap', 'Population Friction Map'), path: '/admin/friction-map', icon: MapPin },
    { name: t('nav.careLeakage', 'Care Leakage Funnel'), path: '/admin/care-leakage', icon: GitFork },
    { name: t('nav.whyCareFailed', 'Why Did Care Fail'), path: '/admin/care-failure', icon: BarChart3 },
    { name: t('nav.patientRegistry', 'Patient Registry'), path: '/admin/patients', icon: Users },
    { name: t('nav.hospitalRegistry', 'Hospital Registry'), path: '/admin/hospitals', icon: Building2 },
    { name: t('nav.auditLogs', 'Audit & Compliance Logs'), path: '/admin/audit-logs', icon: History },
    { name: t('nav.settings', 'Settings & Language'), path: '/admin/settings', icon: Settings },
  ];

  let links = patientLinks;
  if (role === 'hospital') links = hospitalLinks;
  else if (role === 'doctor') links = doctorLinks;
  else if (role === 'asha') links = ashaLinks;
  else if (role === 'government') links = governmentLinks;
  else if (role === 'admin') links = adminLinks;

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        <div>
          <h5 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {role.toUpperCase()} {t('nav.dashboard', 'PORTAL')}
          </h5>
          <div className="mt-3 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 border border-brand-200 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Non-Clinical Safeguard Card */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-snug space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <ShieldAlert className="w-3.5 h-3.5 text-teal-600" />
          <span>Non-Clinical AI</span>
        </div>
        <p>{t('common.nonClinicalNotice', 'Operational access barrier intelligence only. No medical diagnosis.')}</p>
      </div>
    </aside>
  );
};
