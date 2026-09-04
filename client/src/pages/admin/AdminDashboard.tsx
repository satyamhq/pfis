import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import {
  Shield,
  Users,
  Building2,
  ListOrdered,
  Sparkles,
  TrendingUp,
  Cpu,
  Sliders,
  MapPin,
  GitFork,
  BarChart3,
  ArrowRight,
  AlertTriangle,
  Activity,
  CheckCircle2,
  Clock,
  KeyRound,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [statsRes, logsRes] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getAuditLogs(15),
        ]);

        if (statsRes.success) {
          setStats(statsRes.stats);
        }

        if (logsRes.success) {
          // Filter to authentication and major activity events
          const authEvents = (logsRes.logs || []).filter((l: any) =>
            l.action?.startsWith('AUTH_') || l.action === 'PATIENT_PROFILE_UPDATED'
          );
          setRecentLogs(authEvents.length > 0 ? authEvents : logsRes.logs.slice(0, 10));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  const googleLoginsCount = recentLogs.filter(
    (l) => l.action === 'AUTH_GOOGLE_LOGIN' || l.details?.provider === 'google'
  ).length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-card border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-500/5 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2.5 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200/80">
            <Shield className="w-3.5 h-3.5 text-teal-600" />
            <span>Population Health Intelligence & Operations</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            PFIS Administrative Control Suite
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Live real-time monitoring of all authenticated user logins (Patient, Clinical Hospital, and Google accounts),
            friction heatmaps, and population-level care completion metrics.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 w-full md:w-auto relative z-10">
          <Link to="/admin/simulator" className="w-full sm:w-auto">
            <Button variant="primary" size="sm" className="w-full sm:w-auto justify-center shadow-xs" icon={<Cpu className="w-4 h-4" />}>
              What-If Simulator
            </Button>
          </Link>
          <Link to="/admin/audit-logs" className="w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="w-full sm:w-auto justify-center shadow-xs" icon={<Activity className="w-4 h-4" />}>
              Audit Trail
            </Button>
          </Link>
        </div>
      </div>

      {/* Official Master Admin Verification Bar */}
      <div className="bg-purple-50/70 border border-purple-200/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 flex flex-wrap items-center gap-2">
              <span>Master Administrator Account:</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-mono text-[11px] font-bold border border-purple-200">
                admin@pfis.org
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Role: System Health Director • Permanent Master Admin Security • Database Relational Store Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-purple-200/60 shrink-0">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-emerald-700">
            Audit Stream Live
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Monitored Population"
          value={stats?.totalPatients || 0}
          subtitle="Registered patients in registry"
          icon={Users}
          trend="+18% this month"
          trendPositive={true}
          badge="Live System"
          badgeType="success"
        />

        <StatCard
          title="Connected Hospitals"
          value={stats?.totalHospitals || 0}
          subtitle="Verified facility network"
          icon={Building2}
          badge="State Network"
          badgeType="info"
        />

        <StatCard
          title="Active Intake Requests"
          value={stats?.activeRequests || 0}
          subtitle="Tokens & consults pending triage"
          icon={ListOrdered}
          trend="+5 new today"
          trendPositive={false}
          badge="Needs Review"
          badgeType="warning"
        />

        <StatCard
          title="Avg Friction Index"
          value={stats?.avgFrictionScore || 58}
          subtitle="0 (Zero Friction) to 100"
          icon={TrendingUp}
          trend="State Target: <40"
          trendPositive={false}
          badge="State Average"
          badgeType="warning"
        />
      </div>

      {/* Live Who Is Logged In & Recent Security Activity */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-600" />
              <span>Live User Logins & Real-Time Security Feed</span>
            </h2>
            <p className="text-xs text-slate-500">
              Live audit stream showing authenticated users (Google accounts, patients, hospitals, admin) in relational database.
            </p>
          </div>

          <Link
            to="/admin/audit-logs"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 self-start sm:self-auto"
          >
            <span>View Full Audit Stream</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentLogs.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            No login events recorded yet.
          </p>
        ) : (
          <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[620px] text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100">
                <tr>
                  <th className="p-3.5 rounded-l-xl">User / Account</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Auth Method</th>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5 rounded-r-xl text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {recentLogs.map((log: any, idx: number) => {
                  const isGoogle =
                    log.action === 'AUTH_GOOGLE_LOGIN' ||
                    log.details?.provider === 'google';
                  const userName = log.userId?.name || log.details?.name || 'Verified User';
                  const userEmail = log.userId?.email || log.details?.email || 'user@pfis.org';
                  const userRole = log.actorRole || log.userId?.role || 'patient';
                  const timeStr = log.createdAt || log.timestamp;
                  const dateFormatted = timeStr ? new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Just now';

                  return (
                    <tr key={log._id || idx} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow-2xs shrink-0 ${
                            userRole === 'admin'
                              ? 'bg-purple-100 text-purple-700'
                              : userRole === 'hospital'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{userName}</span>
                            <span className="text-[11px] text-slate-400 font-mono">{userEmail}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 capitalize font-semibold text-slate-700">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                          userRole === 'admin'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : userRole === 'hospital'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {userRole}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {isGoogle ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold shadow-2xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Google Cloud OAuth
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200/60">
                            <KeyRound className="w-3 h-3" />
                            Direct Password
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{dateFormatted}</span>
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Navigation Cards into Intelligence Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          to="/admin/patients"
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 shadow-card hover:shadow-card-hover hover:border-teal-300 transition-all space-y-3 group active:scale-[0.99]"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200/80 shadow-2xs group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-700 transition-colors flex items-center justify-between">
            <span>Patient Registry</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            View all registered patients and Google users with individual friction fingerprints and contact records.
          </p>
        </Link>

        <Link
          to="/admin/friction-map"
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 shadow-card hover:shadow-card-hover hover:border-blue-300 transition-all space-y-3 group active:scale-[0.99]"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200/80 shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors flex items-center justify-between">
            <span>Population Friction Map</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Geographic heatmap identifying high-friction clusters, travel deserts, and district barrier distributions.
          </p>
        </Link>

        <Link
          to="/admin/simulator"
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 shadow-card hover:shadow-card-hover hover:border-indigo-300 transition-all space-y-3 group active:scale-[0.99]"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200/80 shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-700 transition-colors flex items-center justify-between">
            <span>What-If Simulator</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Simulate completion gains from Community Shuttles, Satellite Diagnostics, and ASHA escorts in real-time.
          </p>
        </Link>
      </div>
    </div>
  );
};
