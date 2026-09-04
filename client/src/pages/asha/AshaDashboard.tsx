import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  Users,
  Home,
  Car,
  AlertTriangle,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  ChevronRight,
  PlusCircle,
  FileText,
  Volume2,
} from 'lucide-react';
import { ashaService, AshaDashboardData } from '../../services/ashaService';
import { PageClarityRibbon } from '../../components/common/PageClarityRibbon';

export const AshaDashboard: React.FC = () => {
  const [data, setData] = useState<AshaDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await ashaService.getDashboard();
        setData(res);
      } catch (err) {
        console.warn('Using demo ASHA dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const fieldTasks = data?.fieldTasks || [
    {
      id: 'task-1',
      patientName: 'Sunita Devi (Vill. Mehli)',
      barrier: 'Transit Attrition & Infrequent Bus (65km)',
      task: 'Accompany patient to Civil Hospital morning bus stop (07:30 AM departure)',
      status: 'SCHEDULED',
      urgency: 'HIGH',
    },
    {
      id: 'task-2',
      patientName: 'Baldev Singh (Ward 4)',
      barrier: 'Missing Health Card & Digital eKYC',
      task: 'Assist with CSC kiosk biometric validation for Ayushman card',
      status: 'PENDING',
      urgency: 'MEDIUM',
    },
    {
      id: 'task-3',
      patientName: 'Gurmeet Kaur (Mehli Sub-Center)',
      barrier: 'Punjabi Vernacular Audio Care Instructions',
      task: 'Review color-coded medication timings using Punjabi audio care summary',
      status: 'COMPLETED',
      urgency: 'LOW',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-rose-500/5 via-pink-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 shrink-0">
            <HeartHandshake className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {data?.ashaWorker?.name || 'Kamla Devi (Senior ASHA Worker)'}
              </h1>
              <span className="bg-rose-50 text-rose-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-rose-200/80">
                {data?.ashaWorker?.workerId || 'ASHA-PB-KPR-042'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Assigned: <span className="font-semibold text-slate-700">{data?.ashaWorker?.assignedVillage || 'Mehli Cluster'}</span> • {data?.ashaWorker?.primaryHealthCenter || 'CHC Phagwara, Kapurthala'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 relative z-10">
          <Link
            to="/asha/log-barrier"
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition flex items-center gap-1.5 active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Barrier</span>
          </Link>
          <Link
            to="/asha/request-transit"
            className="px-4 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition flex items-center gap-1.5 active:scale-[0.98]"
          >
            <Car className="w-4 h-4" />
            <span>Transit Support</span>
          </Link>
        </div>
      </div>

      {/* Guidance Ribbon: What is this? Why is it useful? What should I do next? */}
      <PageClarityRibbon
        pageKey="asha_dashboard"
        what="Community Health Worker Field Console — cluster cohort management, barrier telemetry, and transit dispatch."
        why="Identifies grassroots households facing acute transit attrition, lost referral paperwork, or daily wage barriers to ensure continuum of care."
        next="Execute 'Log Field Barrier' for doorstep telemetry or dispatch community transit vouchers for upcoming specialist consultations."
        actionText="Log Barrier"
        actionLink="/asha/log-barrier"
        badge="Field Console"
        role="asha"
      />

      {/* Community Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Households</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Home className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-slate-900 tabular-nums">{data?.metrics?.assignedHouseholds || 142}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Village Mehli & Sub-Center</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Monitored Patients</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-rose-600 tabular-nums">{data?.metrics?.monitoredPatients || 28}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Chronic & maternal care cohort</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Friction Homes</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-amber-600 tabular-nums">{data?.metrics?.highFrictionHouseholds || 7}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Require doorstep intervention</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Transit Trips</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-emerald-600 tabular-nums">{data?.metrics?.pendingEscortTrips || 4}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Morning bus & shuttle escorts</p>
          </div>
        </div>
      </div>

      {/* Frontline Doorstep Field Tasks */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Urgent Tasks</h2>
            <p className="text-xs text-slate-500 mt-0.5">Field tasks prioritized by patient care drop-off probability</p>
          </div>
          <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            Active
          </span>
        </div>

        <div className="space-y-3">
          {fieldTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-rose-300 transition-colors bg-slate-50/60"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-2xs ${
                    task.urgency === 'HIGH'
                      ? 'bg-rose-500'
                      : task.urgency === 'MEDIUM'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                >
                  {task.urgency === 'HIGH' ? '!' : '✓'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{task.patientName}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        task.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : task.status === 'SCHEDULED'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-rose-700 mt-0.5">Barrier: {task.barrier}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{task.task}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to="/asha/log-barrier"
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition shadow-2xs"
                >
                  Update Status
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Patient Barrier Matrix */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">Households</h2>
            <p className="text-xs text-slate-500 mt-0.5">Verified grassroots status across Mehli & Ward 4 Sub-Center</p>
          </div>
          <Link
            to="/asha/patients"
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>All Patients</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Demographics</th>
                <th className="py-3.5 px-4">Primary Non-Clinical Barrier</th>
                <th className="py-3.5 px-4">Friction Level</th>
                <th className="py-3.5 px-4">Assistance Status</th>
                <th className="py-3.5 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {[
                {
                  id: '1',
                  name: 'Sunita Devi',
                  demographics: '60 yrs • Female • Punjabi',
                  barrier: 'Infrequent Public Bus & Mobility Limitation',
                  score: 70,
                  level: 'CRITICAL',
                  status: 'Morning Transit Escort Assigned',
                },
                {
                  id: '2',
                  name: 'Baldev Singh',
                  demographics: '54 yrs • Male • Punjabi',
                  barrier: 'Documentation / Missing Ayushman Card',
                  score: 55,
                  level: 'HIGH',
                  status: 'eKYC Biometrics Pending at CSC',
                },
                {
                  id: '3',
                  name: 'Gurmeet Kaur',
                  demographics: '48 yrs • Female • Punjabi',
                  barrier: 'Language Dialect / Prescription Illiteracy',
                  score: 42,
                  level: 'MODERATE',
                  status: 'Bilingual Audio Card Delivered',
                },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.name}</td>
                  <td className="py-3.5 px-4 text-[11px] text-slate-500">{row.demographics}</td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-slate-800">{row.barrier}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                        row.level === 'CRITICAL'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : row.level === 'HIGH'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {row.score} / 100 ({row.level})
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to="/asha/request-transit"
                      className="text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-3 py-1.5 rounded-xl border border-rose-200/60 transition shadow-2xs inline-block active:scale-[0.98]"
                    >
                      Request Shuttle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
