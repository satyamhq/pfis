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
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">
                {data?.official?.name || 'Dr. Arvind Verma (CMO)'}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {data?.official?.officialDesignation || 'Chief Medical Officer'}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              District: <span className="font-semibold text-slate-800">{data?.districtSummary?.districtName || 'Kapurthala'}</span>, {data?.districtSummary?.state || 'Punjab'} | Health Directorate Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/government/friction-map"
            className="px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Friction Heat-Map</span>
          </Link>
          <Link
            to="/government/interventions"
            className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <Sliders className="w-4 h-4" />
            <span>Policy Interventions</span>
          </Link>
        </div>
      </div>

      {/* DPDP Compliance Notice */}
      <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-bold">Privacy Guarantee:</span>
          <span>All population health indices are anonymized and aggregated across 817,000 citizens in Kapurthala District.</span>
        </div>
        <span className="bg-white text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300 font-semibold hidden sm:inline">
          DISHA Verified
        </span>
      </div>

      {/* District Macro Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Monitored Cohort</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">
              {data?.districtSummary?.monitoredPatientProfiles || '2,400+'}
            </div>
            <p className="text-xs text-slate-500 mt-1">Pop. Coverage: {data?.districtSummary?.totalPopulationCoverage || '817,000'}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">District Avg Friction</span>
            <AlertOctagon className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-600">
              {data?.districtSummary?.overallDistrictFrictionScore || 54.2} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">State Benchmark: {data?.districtSummary?.stateAverageBenchmark || 61.8} (Better)</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Public Health Facilities</span>
            <Building2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">
              {data?.districtSummary?.enrolledPublicFacilities || 12}
            </div>
            <p className="text-xs text-slate-500 mt-1">Civil Hospital, CHCs & Sub-Centers</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Care Retention</span>
            <TrendingUp className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-indigo-600">
              {data?.districtSummary?.overallCareRetentionRate || '43.2%'}
            </div>
            <p className="text-xs text-slate-500 mt-1">Target with interventions: 62.0%</p>
          </div>
        </div>
      </div>

      {/* 5-Stage Care Journey Leakage Funnel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">District Care Journey Leakage Funnel (5 Stages)</h2>
            <p className="text-sm text-slate-500">Tracking citizen drop-offs across non-clinical friction barriers</p>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Major Leakage at Diagnostics (34.8%)
          </span>
        </div>

        <div className="space-y-4">
          {leakageFunnel.map((step, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <span className="font-bold text-slate-900 text-sm">{step.stage}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-600">
                    Completed: <strong className="text-slate-900">{step.completedCount.toLocaleString()}</strong> / {step.incomingPatients.toLocaleString()}
                  </span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full ${
                      step.leakagePercent >= 30
                        ? 'bg-rose-100 text-rose-700'
                        : step.leakagePercent >= 15
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {step.leakagePercent}% Drop-off ({step.leakageCount.toLocaleString()} lost)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full ${
                    step.leakagePercent >= 30
                      ? 'bg-rose-500'
                      : step.leakagePercent >= 15
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${100 - step.leakagePercent}%` }}
                />
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Primary Friction Driver:</span>
                <span>{step.topDriver}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Systemic Bottlenecks & Macro Policy Recommendations */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Systemic Public Health Bottlenecks & Interventions</h2>
        <p className="text-sm text-slate-500 mb-5">High-ROI public health policy recommendations based on operational friction telemetry</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              rank: '#1 Diagnostic Deficit',
              impact: '34.8% Care Abandonment',
              policy: 'Deploy 2 Mobile Diagnostic Vans with rural ultrasound & routine blood analyzers.',
              roi: '+18.5% Care Completion Gain',
              badge: 'bg-rose-50 text-rose-700 border-rose-200',
            },
            {
              rank: '#2 Rural Transit Void',
              impact: '32.9% Follow-up Loss',
              policy: 'Partner with PRTC to run dedicated morning express shuttles from Mehli cluster.',
              roi: '+14.2% Follow-up Attendance',
              badge: 'bg-amber-50 text-amber-700 border-amber-200',
            },
            {
              rank: '#3 Documentation Friction',
              impact: '11.5% Intake Failure',
              policy: 'Deploy village-level CSC biometric eKYC camps via frontline ASHA network.',
              roi: '+9.4% Immediate Intake Rate',
              badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            },
          ].map((item, idx) => (
            <div key={idx} className={`p-5 rounded-xl border ${item.badge} flex flex-col justify-between`}>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider">{item.rank}</span>
                <div className="text-lg font-bold text-slate-900 mt-1">{item.impact}</div>
                <p className="text-xs text-slate-700 mt-2 font-medium leading-relaxed">{item.policy}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>Projected ROI:</span>
                <span>{item.roi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
