import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  MapPin,
  TrendingDown,
  TrendingUp,
  Cpu,
  BarChart3,
  GitFork,
  CheckCircle2,
  AlertOctagon,
  Users,
  Building2,
  Lock,
  ChevronRight,
  Sliders,
} from 'lucide-react';
import { governmentService, GovernmentDashboardData } from '../../services/governmentService';

export const GovernmentDashboard: React.FC = () => {
  const [data, setData] = useState<GovernmentDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await governmentService.getDashboard();
        setData(res);
      } catch (err) {
        console.warn('Using demo government dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const leakageFunnel = data?.careJourneyLeakage || [
    {
      stage: '1. Referral to Facility',
      incomingPatients: 10000,
      completedCount: 8850,
      leakageCount: 1150,
      leakagePercent: 11.5,
      topDriver: 'Cross-district transit cost & lost referral forms',
    },
    {
      stage: '2. Clinical Consultation',
      incomingPatients: 8850,
      completedCount: 7600,
      leakageCount: 1250,
      leakagePercent: 14.1,
      topDriver: 'Long OPD wait times & daily wage forfeiture',
    },
    {
      stage: '3. Diagnostics & Lab Testing',
      incomingPatients: 7600,
      completedCount: 4950,
      leakageCount: 2650,
      leakagePercent: 34.8,
      topDriver: 'Lack of local testing equipment; 30+ km travel needed',
    },
    {
      stage: '4. Treatment Initiation',
      incomingPatients: 4950,
      completedCount: 4100,
      leakageCount: 850,
      leakagePercent: 17.2,
      topDriver: 'Out-of-pocket prescription expenses',
    },
    {
      stage: '5. Continuity & Follow-up',
      incomingPatients: 4100,
      completedCount: 2750,
      leakageCount: 1350,
      leakagePercent: 32.9,
      topDriver: 'Infrequent return transit & lack of symptom urgency',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/5 via-teal-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {data?.official?.name || 'Dr. Arvind Verma (CMO)'}
              </h1>
              <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                {data?.official?.officialDesignation || 'Chief Medical Officer'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              District: <span className="font-semibold text-slate-800">{data?.districtSummary?.districtName || 'Kapurthala'}</span>, {data?.districtSummary?.state || 'Punjab'} • <span className="text-slate-600">Health Directorate Portal</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 relative z-10">
          <Link
            to="/government/friction-map"
            className="px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200/80 transition flex items-center gap-1.5 shadow-2xs active:scale-[0.98]"
          >
            <MapPin className="w-4 h-4" />
            <span>Friction Heat-Map</span>
          </Link>
          <Link
            to="/government/interventions"
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition flex items-center gap-1.5 active:scale-[0.98]"
          >
            <Sliders className="w-4 h-4" />
            <span>Policy Interventions</span>
          </Link>
        </div>
      </div>

      {/* DPDP Compliance Notice */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-md bg-emerald-100/80 text-emerald-700 shrink-0">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-emerald-900">DPDP Act 2023 Privacy Guarantee: </span>
            <span className="text-emerald-800">All population health indices are anonymized and aggregated across 817,000 citizens in Kapurthala District.</span>
          </div>
        </div>
        <span className="bg-white text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 text-[10px] font-bold self-start sm:self-auto shadow-2xs">
          DISHA Compliant
        </span>
      </div>

      {/* District Macro Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Monitored Cohort</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              {data?.districtSummary?.monitoredPatientProfiles || '2,400+'}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Pop. Coverage: {data?.districtSummary?.totalPopulationCoverage || '817,000'}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">District Avg Friction</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-amber-600 tabular-nums">
              {data?.districtSummary?.overallDistrictFrictionScore || 54.2} <span className="text-xs text-slate-400 font-semibold">/ 100</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">State Benchmark: {data?.districtSummary?.stateAverageBenchmark || 61.8} (Favorable)</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Public Health Facilities</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              {data?.districtSummary?.enrolledPublicFacilities || 12}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Civil Hospital, CHCs & Sub-Centers</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Overall Care Retention</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-indigo-600 tabular-nums">
              {data?.districtSummary?.overallCareRetentionRate || '43.2%'}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Target with interventions: 62.0%</p>
          </div>
        </div>
      </div>

      {/* 5-Stage Care Journey Leakage Funnel */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">District Care Journey Leakage Funnel (5 Stages)</h2>
            <p className="text-xs text-slate-500 mt-0.5">Tracking citizen drop-offs across non-clinical friction barriers</p>
          </div>
          <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 self-start sm:self-auto">
            Major Leakage at Diagnostics (34.8%)
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {leakageFunnel.map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-2xs">
                    {idx + 1}
                  </div>
                  <span className="font-bold text-slate-900 text-sm">{step.stage}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="text-slate-600">
                    Completed: <strong className="text-slate-900 tabular-nums">{step.completedCount.toLocaleString()}</strong> / {step.incomingPatients.toLocaleString()}
                  </span>
                  <span
                    className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] border ${
                      step.leakagePercent >= 30
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : step.leakagePercent >= 15
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {step.leakagePercent}% Drop-off ({step.leakageCount.toLocaleString()} lost)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    step.leakagePercent >= 30
                      ? 'bg-rose-500'
                      : step.leakagePercent >= 15
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${100 - step.leakagePercent}%` }}
                />
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5">
                <span className="font-semibold text-slate-700">Primary Friction Driver:</span>
                <span>{step.topDriver}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Systemic Bottlenecks & Macro Policy Recommendations */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">Systemic Public Health Bottlenecks & Interventions</h2>
          <p className="text-xs text-slate-500 mt-0.5">High-ROI public health policy recommendations based on operational friction telemetry</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              rank: '#1 Diagnostic Deficit',
              impact: '34.8% Care Abandonment',
              policy: 'Deploy 2 Mobile Diagnostic Vans with rural ultrasound & routine blood analyzers.',
              roi: '+18.5% Care Completion Gain',
              badge: 'bg-rose-50/60 text-rose-700 border-rose-200',
            },
            {
              rank: '#2 Rural Transit Void',
              impact: '32.9% Follow-up Loss',
              policy: 'Partner with PRTC to run dedicated morning express shuttles from Mehli cluster.',
              roi: '+14.2% Follow-up Attendance',
              badge: 'bg-amber-50/60 text-amber-700 border-amber-200',
            },
            {
              rank: '#3 Documentation Friction',
              impact: '11.5% Intake Failure',
              policy: 'Deploy village-level CSC biometric eKYC camps via frontline ASHA network.',
              roi: '+9.4% Immediate Intake Rate',
              badge: 'bg-emerald-50/60 text-emerald-700 border-emerald-200',
            },
          ].map((item, idx) => (
            <div key={idx} className={`p-5 rounded-2xl border ${item.badge} flex flex-col justify-between space-y-4 shadow-2xs`}>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider">{item.rank}</span>
                <div className="text-lg font-black text-slate-900 mt-1">{item.impact}</div>
                <p className="text-xs text-slate-700 mt-2 font-medium leading-relaxed">{item.policy}</p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>Projected ROI:</span>
                <span className="bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200">{item.roi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
