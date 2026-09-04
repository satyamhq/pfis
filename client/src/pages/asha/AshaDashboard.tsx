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
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">
                {data?.ashaWorker?.name || 'Kamla Devi (Senior ASHA Worker)'}
              </h1>
              <span className="bg-rose-100 text-rose-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {data?.ashaWorker?.workerId || 'ASHA-PB-KPR-042'}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              Assigned: {data?.ashaWorker?.assignedVillage || 'Mehli Cluster'} • {data?.ashaWorker?.primaryHealthCenter || 'CHC Phagwara, Kapurthala'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/asha/log-barrier"
            className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Field Barrier</span>
          </Link>
          <Link
            to="/asha/request-transit"
            className="px-4 py-2 text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition flex items-center gap-2"
          >
            <Car className="w-4 h-4" />
            <span>Request Transit Support</span>
          </Link>
        </div>
      </div>

      {/* Community Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Village Households</span>
            <Home className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">{data?.metrics?.assignedHouseholds || 142}</div>
            <p className="text-xs text-slate-500 mt-1">Village Mehli & Sub-Center</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Monitored Patients</span>
            <Users className="w-5 h-5 text-rose-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-rose-600">{data?.metrics?.monitoredPatients || 28}</div>
            <p className="text-xs text-slate-500 mt-1">Chronic & maternal care cohort</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">High-Friction Homes</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-600">{data?.metrics?.highFrictionHouseholds || 7}</div>
            <p className="text-xs text-slate-500 mt-1">Require doorstep intervention</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Transit Trips</span>
            <Car className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-emerald-600">{data?.metrics?.pendingEscortTrips || 4}</div>
            <p className="text-xs text-slate-500 mt-1">Morning bus & shuttle escorts</p>
          </div>
        </div>
      </div>

      {/* Frontline Doorstep Field Tasks */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Today's Doorstep Support Action List</h2>
            <p className="text-sm text-slate-500">Field tasks prioritized by patient care drop-off probability</p>
          </div>
          <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            Field Day Active
          </span>
        </div>

        <div className="space-y-3">
          {fieldTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-rose-300 transition bg-slate-50/50"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
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
                  <p className="text-xs text-slate-600 mt-1">{task.task}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/asha/log-barrier"
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition"
                >
                  Update Status
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Patient Barrier Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Assigned Community Patients & Household Barriers</h2>
            <p className="text-sm text-slate-500">Verified grassroots status across Mehli & Ward 4 Sub-Center</p>
          </div>
          <Link
            to="/asha/patients"
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            <span>View All Patients</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Patient Name</th>
                <th className="py-3.5 px-4 font-semibold">Demographics</th>
                <th className="py-3.5 px-4 font-semibold">Primary Non-Clinical Barrier</th>
                <th className="py-3.5 px-4 font-semibold">Friction Level</th>
                <th className="py-3.5 px-4 font-semibold">Assistance Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
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
                <tr key={row.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.name}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">{row.demographics}</td>
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-800">{row.barrier}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        row.level === 'CRITICAL'
                          ? 'bg-rose-100 text-rose-700'
                          : row.level === 'HIGH'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {row.score} / 100 ({row.level})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-emerald-700">{row.status}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to="/asha/request-transit"
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition"
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
