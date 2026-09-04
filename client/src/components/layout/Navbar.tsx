import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  MapPin,
  Bell,
  LogOut,
  User as UserIcon,
  Shield,
  Building2,
  Menu,
  X,
  Sparkles,
  Settings as SettingsIcon,
  Laptop,
  Layers,
  LayoutDashboard,
  Cpu,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { LanguageSelector } from '../common/LanguageSelector';
import { SimpleModeToggle } from '../common/SimpleModeToggle';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => routerLocation.pathname === path;

  // Close notification popover when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isNotifOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [routerLocation.pathname]);

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'admin':
        return {
          label: t('nav.adminView', 'Admin'),
          icon: <Shield className="w-3.5 h-3.5 text-amber-500" />,
          bg: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
        };
      case 'hospital':
        return {
          label: t('nav.hospitalView', 'Hospital'),
          icon: <Building2 className="w-3.5 h-3.5 text-blue-500" />,
          bg: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
        };
      case 'patient':
      default:
        return {
          label: t('nav.patientView', 'Patient'),
          icon: <UserIcon className="w-3.5 h-3.5 text-teal-600" />,
          bg: 'bg-teal-500/10 text-teal-700 border-teal-500/20',
        };
    }
  };

  const roleMeta = getRoleBadge(user?.role);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Ambient Glow Line */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-teal-500 via-emerald-400 to-indigo-500" />

      {/* Main Bar with Glassmorphic Backdrop */}
      <div className="bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
            {/* Brand & Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 via-brand-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/25 group-hover:scale-105 group-hover:shadow-teal-500/40 transition-all duration-300">
                  <Activity className="w-5 h-5 stroke-[2.3]" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-white"></span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-lg tracking-tight bg-gradient-to-r from-slate-900 via-teal-900 to-slate-800 bg-clip-text text-transparent">
                      PFIS
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200/80 uppercase tracking-wide">
                      {t('nav.version', 'v1.0')}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-500 -mt-0.5 tracking-tight hidden sm:inline">
                    {t('nav.platformTagline', 'Patient Friction Intelligence')}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600">
              {/* PATIENT NAV */}
              {user?.role === 'patient' && (
                <>
                  <Link
                    to="/patient/hospitals"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/patient/hospitals')
                        ? 'bg-teal-50 text-teal-700 border border-teal-200/80 font-bold shadow-xs'
                        : 'hover:text-teal-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{t('nav.findHospitalsDoctors', 'Find Hospitals & Doctors')}</span>
                  </Link>

                  <Link
                    to="/patient/teleconsult"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/patient/teleconsult')
                        ? 'bg-blue-50 text-blue-700 border border-blue-200/80 font-bold shadow-xs'
                        : 'hover:text-blue-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{t('nav.liveTeleconsult', 'Live Teleconsult')}</span>
                  </Link>

                  <Link
                    to="/patient/digital-twin"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/patient/digital-twin')
                        ? 'bg-teal-50 text-teal-700 border border-teal-200/80 font-bold shadow-xs'
                        : 'hover:text-teal-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{t('nav.digitalTwin', 'Digital Twin')}</span>
                  </Link>

                  <Link
                    to="/patient/dashboard"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/patient/dashboard')
                        ? 'bg-slate-100 text-slate-900 font-bold border border-slate-300/80 shadow-xs'
                        : 'hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{t('nav.dashboard', 'Dashboard')}</span>
                  </Link>
                </>
              )}

              {/* HOSPITAL NAV */}
              {user?.role === 'hospital' && (
                <>
                  <Link
                    to="/hospital/dashboard"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/hospital/dashboard')
                        ? 'bg-teal-50 text-teal-700 border border-teal-200/80 font-bold shadow-xs'
                        : 'hover:text-teal-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{t('nav.hospitalDesk', 'Hospital Desk')}</span>
                  </Link>
                  <Link
                    to="/hospital/requests"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/hospital/requests')
                        ? 'bg-teal-50 text-teal-700 border border-teal-200/80 font-bold shadow-xs'
                        : 'hover:text-teal-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{t('nav.patientQueue', 'Patient Queue')}</span>
                  </Link>
                  <Link
                    to="/hospital/teleconsult"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/hospital/teleconsult')
                        ? 'bg-blue-50 text-blue-700 border border-blue-200/80 font-bold shadow-xs'
                        : 'hover:text-blue-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{t('nav.teleTriage', 'Tele-Triage')}</span>
                  </Link>
                  <Link
                    to="/hospital/departments"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/hospital/departments')
                        ? 'bg-teal-50 text-teal-700 border border-teal-200/80 font-bold shadow-xs'
                        : 'hover:text-teal-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{t('nav.departmentsOpd', 'Departments & OPD')}</span>
                  </Link>
                </>
              )}

              {/* ADMIN NAV */}
              {user?.role === 'admin' && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/admin/dashboard')
                        ? 'bg-teal-50 text-teal-700 border border-teal-200/80 font-bold shadow-xs'
                        : 'hover:text-teal-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{t('nav.systemIntelligence', 'System Intelligence')}</span>
                  </Link>
                  <Link
                    to="/admin/simulator"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/admin/simulator')
                        ? 'bg-teal-50 text-teal-700 border border-teal-200/80 font-bold shadow-xs'
                        : 'hover:text-teal-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{t('nav.whatIfSimulator', 'What-If Simulator')}</span>
                  </Link>
                  <Link
                    to="/admin/digital-twin"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/admin/digital-twin')
                        ? 'bg-teal-50 text-teal-700 border border-teal-200/80 font-bold shadow-xs'
                        : 'hover:text-teal-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{t('nav.digitalTwin', 'Digital Twin')}</span>
                  </Link>
                  <Link
                    to="/admin/interventions"
                    className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                      isActive('/admin/interventions')
                        ? 'bg-teal-50 text-teal-700 border border-teal-200/80 font-bold shadow-xs'
                        : 'hover:text-teal-600 hover:bg-slate-100/80'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{t('nav.budgetOptimizer', 'Budget Optimizer')}</span>
                  </Link>

                  {/* Portal Quick-Switcher for Admin */}
                  <div className="flex items-center gap-1 ml-1.5 p-1 rounded-xl bg-slate-100/80 border border-slate-200/80">
                    <Link
                      to="/patient/dashboard"
                      className="px-2 py-0.5 rounded-lg text-[11px] font-semibold text-slate-600 hover:bg-white hover:text-teal-700 transition-all flex items-center gap-1.5"
                      title={t('nav.patientView', 'Patient View')}
                    >
                      <UserIcon className="w-3 h-3 text-teal-600 shrink-0" />
                      <span>{t('nav.patientView', 'Patient View')}</span>
                    </Link>
                    <Link
                      to="/hospital/dashboard"
                      className="px-2 py-0.5 rounded-lg text-[11px] font-semibold text-slate-600 hover:bg-white hover:text-blue-700 transition-all flex items-center gap-1.5"
                      title={t('nav.hospitalView', 'Hospital View')}
                    >
                      <Building2 className="w-3 h-3 text-blue-600 shrink-0" />
                      <span>{t('nav.hospitalView', 'Hospital View')}</span>
                    </Link>
                  </div>
                </>
              )}

              {/* PUBLIC VISITOR NAV */}
              {!isAuthenticated && (
                <>
                  <Link
                    to="/patient/hospitals"
                    className="px-3 py-1.5 rounded-xl hover:text-teal-600 hover:bg-slate-100/80 transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>{t('nav.findHospitals', 'Find Hospitals')}</span>
                  </Link>
                  <Link
                    to="/architecture"
                    className="px-3 py-1.5 rounded-xl text-teal-700 bg-teal-50 hover:bg-teal-100/80 font-bold transition-colors flex items-center gap-1.5 border border-teal-200/80 shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>{t('nav.systemArchitecture', 'System Architecture')}</span>
                  </Link>
                  <Link
                    to="/about"
                    className="px-3 py-1.5 rounded-xl hover:text-teal-600 hover:bg-slate-100/80 transition-colors"
                  >
                    <span>{t('nav.aboutPlatform', 'About Platform')}</span>
                  </Link>
                </>
              )}
            </nav>

            {/* Right Action Controls: Simple Mode, Language, Notifications, Auth Profile */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Simple Mode Toggle */}
              <div className="hidden lg:block">
                <SimpleModeToggle />
              </div>

              {/* Global Language Selector (11 Indic Languages) */}
              <LanguageSelector />

              {/* Notification Bell with Dropdown */}
              {isAuthenticated && (
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className={`p-2 rounded-xl text-slate-600 hover:bg-slate-100/80 border transition-all duration-150 relative ${
                      isNotifOpen
                        ? 'bg-teal-50 border-teal-200 text-teal-700 shadow-xs'
                        : 'border-transparent'
                    }`}
                    title={t('nav.notifications', 'Notifications')}
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center animate-pulse shadow-xs">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {isNotifOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 py-3 z-50 overflow-hidden">
                      <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-teal-600" />
                          <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                            {t('nav.notifications', 'Notifications')}
                          </h4>
                        </div>
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {unreadCount} {t('nav.unread', 'unread')}
                        </span>
                      </div>

                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                            <CheckCircle2 className="w-6 h-6 text-slate-300" />
                            <span>{t('nav.noNotifications', 'No notifications yet.')}</span>
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif._id}
                              onClick={() => {
                                markAsRead(notif._id);
                                if (notif.actionUrl) {
                                  setIsNotifOpen(false);
                                  navigate(notif.actionUrl);
                                }
                              }}
                              className={`p-3.5 hover:bg-slate-50/90 cursor-pointer transition-colors ${
                                !notif.isRead ? 'bg-teal-50/40' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-xs font-semibold text-slate-900 leading-snug">
                                  {notif.title}
                                </p>
                                {!notif.isRead && (
                                  <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-1" />
                                )}
                              </div>
                              <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                                {notif.message}
                              </p>
                              <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                                <span>
                                  {new Date(notif.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                                {notif.actionUrl && (
                                  <span className="text-teal-600 font-semibold flex items-center gap-0.5">
                                    {t('common.view', 'View')} <ChevronRight className="w-3 h-3" />
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* User Profile Pill or Sign In / Register Buttons */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-1 sm:gap-1.5 pl-1.5 sm:pl-2 border-l border-slate-200">
                  {/* Settings Button */}
                  <Link
                    to={
                      user.role === 'patient'
                        ? '/patient/settings'
                        : user.role === 'hospital'
                        ? '/hospital/settings'
                        : '/admin/settings'
                    }
                    title={t('nav.settings', 'Settings & Language')}
                    className="p-2 text-slate-500 hover:text-teal-600 hover:bg-slate-100/80 rounded-xl transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4" />
                  </Link>

                  {/* Profile Capsule */}
                  <Link
                    to={
                      user.role === 'patient'
                        ? '/patient/profile'
                        : user.role === 'hospital'
                        ? '/hospital/profile'
                        : '/admin/dashboard'
                    }
                    className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl hover:bg-slate-100/80 border border-slate-200/60 transition-all text-left group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-slate-800 to-slate-700 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
                      {roleMeta.icon}
                    </div>
                    <div className="hidden lg:flex flex-col">
                      <span className="text-xs font-bold text-slate-900 leading-tight">
                        {user.name?.split(' ')[0]}
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${roleMeta.bg} uppercase tracking-wider mt-0.5 inline-block w-fit`}>
                        {roleMeta.label}
                      </span>
                    </div>
                  </Link>

                  {/* Sign Out Button */}
                  <button
                    onClick={handleLogout}
                    title={t('nav.logout', 'Sign Out')}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login?role=admin"
                    className="text-xs font-bold text-slate-700 hover:text-teal-600 px-3 py-1.5 rounded-xl hover:bg-slate-100/80 transition-all"
                  >
                    {t('nav.adminSignIn', 'Admin Sign In')}
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs font-bold bg-gradient-to-r from-teal-600 to-brand-600 hover:from-teal-500 hover:to-brand-500 text-white px-3.5 py-1.5 rounded-xl shadow-xs shadow-teal-500/20 transition-all"
                  >
                    {t('nav.register', 'Register')}
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100/80 rounded-xl transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Backdrop Blur */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          {/* Top Controls in Drawer */}
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <SimpleModeToggle />
            <Link
              to={
                user?.role === 'patient'
                  ? '/patient/settings'
                  : user?.role === 'hospital'
                  ? '/hospital/settings'
                  : '/admin/settings'
              }
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-semibold text-teal-700 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200"
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>{t('nav.settings', 'Settings & Language')}</span>
            </Link>
          </div>

          {/* Links for Patients */}
          {user?.role === 'patient' && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                {t('nav.patientView', 'Patient Services')}
              </div>
              <Link
                to="/patient/hospitals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
              >
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>{t('nav.findHospitalsDoctors', 'Find Hospitals & Doctors')}</span>
              </Link>
              <Link
                to="/patient/teleconsult"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              >
                <Laptop className="w-4 h-4 text-blue-600" />
                <span>{t('nav.liveTeleconsult', 'Live Teleconsultation')}</span>
              </Link>
              <Link
                to="/patient/digital-twin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t('nav.digitalTwin', 'Digital Twin Simulator')}</span>
              </Link>
              <Link
                to="/patient/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <LayoutDashboard className="w-4 h-4 text-slate-500" />
                <span>{t('nav.patientDashboard', 'Patient Dashboard')}</span>
              </Link>
              <Link
                to="/patient/friction"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>{t('nav.frictionProfile', 'Friction Profile')}</span>
              </Link>
              <Link
                to="/patient/documents"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-500" />
                <span>{t('nav.myDocuments', 'Document Vault')}</span>
              </Link>
            </div>
          )}

          {/* Links for Hospitals */}
          {user?.role === 'hospital' && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                {t('nav.hospitalView', 'Hospital Desk')}
              </div>
              <Link
                to="/hospital/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <LayoutDashboard className="w-4 h-4 text-teal-600" />
                <span>{t('nav.hospitalDashboard', 'Hospital Dashboard')}</span>
              </Link>
              <Link
                to="/hospital/requests"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Layers className="w-4 h-4 text-teal-600" />
                <span>{t('nav.patientQueue', 'Patient Queue')}</span>
              </Link>
              <Link
                to="/hospital/teleconsult"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              >
                <Laptop className="w-4 h-4 text-blue-600" />
                <span>{t('nav.teleTriage', 'Tele-Triage')}</span>
              </Link>
              <Link
                to="/hospital/departments"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Building2 className="w-4 h-4 text-teal-600" />
                <span>{t('nav.departmentsOpd', 'Departments & OPD')}</span>
              </Link>
            </div>
          )}

          {/* Links for Admins */}
          {user?.role === 'admin' && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                {t('nav.adminView', 'System Administration')}
              </div>
              <Link
                to="/admin/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <LayoutDashboard className="w-4 h-4 text-amber-500" />
                <span>{t('nav.adminDashboard', 'Admin Dashboard')}</span>
              </Link>
              <Link
                to="/admin/simulator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
              >
                <Cpu className="w-4 h-4 text-teal-600" />
                <span>{t('nav.whatIfSimulator', 'What-If Simulator')}</span>
              </Link>
              <Link
                to="/admin/digital-twin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t('nav.digitalTwin', 'Digital Twin')}</span>
              </Link>
              <Link
                to="/admin/interventions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Layers className="w-4 h-4 text-teal-600" />
                <span>{t('nav.budgetOptimizer', 'Budget Optimizer')}</span>
              </Link>

              {/* Admin Switcher Pills */}
              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <Link
                  to="/patient/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 py-1.5 text-center text-xs font-semibold rounded-lg bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5 text-teal-600" />
                  <span>{t('nav.patientView', 'Patient View')}</span>
                </Link>
                <Link
                  to="/hospital/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 py-1.5 text-center text-xs font-semibold rounded-lg bg-blue-50 text-blue-800 border border-blue-200 flex items-center justify-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t('nav.hospitalView', 'Hospital View')}</span>
                </Link>
              </div>
            </div>
          )}

          {/* Links for Public Visitors */}
          {!isAuthenticated && (
            <div className="space-y-1">
              <Link
                to="/patient/hospitals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>{t('nav.findHospitals', 'Find Nearby Hospitals')}</span>
              </Link>
              <Link
                to="/architecture"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-teal-700 hover:bg-teal-50"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>{t('nav.systemArchitecture', 'System Architecture')}</span>
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>{t('nav.aboutPlatform', 'About Platform')}</span>
              </Link>
              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <Link
                  to="/login?role=admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-bold rounded-xl border border-slate-200 text-slate-700"
                >
                  {t('nav.adminSignIn', 'Admin Sign In')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-bold rounded-xl bg-teal-600 text-white shadow-xs"
                >
                  {t('nav.register', 'Register')}
                </Link>
              </div>
            </div>
          )}

          {/* Logout in Drawer if authenticated */}
          {isAuthenticated && (
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50/60 border border-rose-200/80"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('nav.logout', 'Sign Out')}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
