import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  Users,
  Clock,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Car,
  FileText,
  AlertOctagon,
  RefreshCw,
} from 'lucide-react';
import { doctorService, DoctorDashboardData } from '../../services/doctorService';
import { PageClarityRibbon } from '../../components/common/PageClarityRibbon';

export const DoctorDashboard: React.FC = () => {
  const [data, setData] = useState<DoctorDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<'ALL' | 'HIGH_FRICTION'>('ALL');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await doctorService.getDashboard();
      setData(res);
    } catch (err) {
      console.warn('Using demo doctor dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const patientsList = data?.recentPatients || [
    {
      _id: 'pat-sunita',
      patientCode: 'PAT-1001',
      age: 60,
      gender: 'Female',
      preferredLanguage: 'Punjabi',
      location: { city: 'Vill. Mehli', state: 'Punjab' },
      transportAvailability: 'Infrequent Bus (65km)',
      digitalAccessLevel: 'None / Feature Phone',
      activeFrictionProfileId: {
        overallFrictionScore: 70,
        frictionLevel: 'HIGH',
        topBarrier: 'Long Transit Distance & Irregular Bus Schedule',
      },
      activeCareRiskId: {
        riskCategory: 'CRITICAL',
        careCompletionProbability: 0.38,
        bottleneckStage: 'Follow-up & Diagnostics',
      },
      currentJourneyStage: 'Consultation',
    },
    {
      _id: 'pat-harbhajan',
      patientCode: 'PAT-1002',
      age: 68,
      gender: 'Male',
      preferredLanguage: 'Punjabi',
      location: { city: 'Phagwara Rural', state: 'Punjab' },
      transportAvailability: 'Needs Wheelchair Shuttle',
      digitalAccessLevel: 'Basic',
      activeFrictionProfileId: {
        overallFrictionScore: 58,
        frictionLevel: 'HIGH',
        topBarrier: 'Physical Mobility & Token Literacy',
      },
      activeCareRiskId: {
        riskCategory: 'HIGH',
        careCompletionProbability: 0.52,
        bottleneckStage: 'Diagnostics',
      },
      currentJourneyStage: 'Diagnostics',
    },
    {
      _id: 'pat-kavita',
      patientCode: 'PAT-1003',
      age: 34,
      gender: 'Female',
      preferredLanguage: 'Hindi',
      location: { city: 'Urban Sub-Center', state: 'Punjab' },
      transportAvailability: 'Moderate (Auto / E-Rickshaw)',
      digitalAccessLevel: 'Moderate',
      activeFrictionProfileId: {
        overallFrictionScore: 32,
        frictionLevel: 'LOW',
        topBarrier: 'Appointment Timing vs Work Hours',
      },
      activeCareRiskId: {
        riskCategory: 'LOW',
        careCompletionProbability: 0.84,
        bottleneckStage: 'Treatment Initiation',
      },
      currentJourneyStage: 'Treatment',
    },
  ];

  const filteredPatients = filter === 'HIGH_FRICTION'
    ? patientsList.filter((p: any) => (p.activeFrictionProfileId?.overallFrictionScore || 0) >= 50)
    : patientsList;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/5 via-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20 shrink-0">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {data?.doctor?.name || 'Dr. Rajesh Sharma, MD'}
              </h1>
              <span className="bg-purple-50 text-purple-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-200/80 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                Verified Physician
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {data?.doctor?.department || 'Cardiology & General Medicine'} • Reg: <span className="font-mono text-slate-700 font-semibold">{data?.doctor?.registrationNumber || 'MCI-PBI-2012-08492'}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 relative z-10">
          <button
            onClick={loadData}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5 shadow-2xs active:scale-[0.98]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            to="/doctor/patients"
            className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition flex items-center gap-1.5 active:scale-[0.98]"
          >
            <span>Full Patient Queue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Guidance Ribbon: What is this? Why is it useful? What should I do next? */}
      <PageClarityRibbon
        pageKey="doctor_dashboard"
        what="Clinical Decision-Support Station — pre-consultation non-clinical risk telemetry and patient adherence monitoring."
        why="Provides immediate visibility into transit distance, language dialect match, and caregiver support constraints to preempt follow-up care attrition."
        next="Filter by 'High-Friction Risk' or select 'Review Non-Clinical Context' on any queued patient to coordinate supportive interventions."
        actionText="Access Full Patient Queue"
        actionLink="/doctor/patients"
        badge="Clinical Station"
        role="doctor"
      />

      {/* Non-Clinical Clinical Decision-Support Notice */}
      <div className="p-4 bg-purple-50/70 border border-purple-200/70 rounded-2xl flex items-start gap-3 text-xs leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-purple-950">PFIS Clinical Decision-Support Architecture: </span>
          <span className="text-purple-900">
            PFIS highlights patient adherence risks caused by non-clinical barriers (transit distance, missing escort, dialect, digital literacy, and daily wage penalties). It does not evaluate clinical treatment protocols or replace your medical prescriptions.
          </span>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Monitored Cohort</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-slate-900 tabular-nums">{data?.metrics?.totalMonitoredPatients || 24}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Assigned OPD patients</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">High-Friction Risk</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-amber-600 tabular-nums">{data?.metrics?.highFrictionAtRiskCount || 7}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Severe transit / literacy barriers</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pending OPD Tokens</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-purple-600 tabular-nums">{data?.metrics?.pendingOpdConsultations || 12}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Morning clinical window</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Care Completion Rate</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-emerald-600 tabular-nums">{data?.metrics?.averageCareCompletionRate || '78.4%'}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">+14.2% with transit escorts</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">ASHA Escort Trips</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-black text-rose-600 tabular-nums">{data?.metrics?.activeEscortRequests || 3}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Doorstep pickup coordinated</p>
          </div>
        </div>
      </div>

      {/* 5-Stage Care Journey Funnel Overview */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">5-Stage Care Journey Progression & Bottlenecks</h2>
            <p className="text-xs text-slate-500 mt-0.5">Non-clinical friction monitoring from primary referral to long-term follow-up</p>
          </div>
          <span className="text-[11px] bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-bold self-start sm:self-auto border border-slate-200/60">
            Active Cohort Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          {[
            { stage: '1. Referral', completion: '88.5%', friction: 'Low (25)', color: 'border-emerald-500 bg-emerald-50/50 text-emerald-950', badgeColor: 'bg-emerald-100 text-emerald-800', desc: 'Pre-visit paperwork' },
            { stage: '2. Consultation', completion: '76.0%', friction: 'Moderate (40)', color: 'border-blue-500 bg-blue-50/50 text-blue-950', badgeColor: 'bg-blue-100 text-blue-800', desc: 'Dialect & timing' },
            { stage: '3. Diagnostics', completion: '49.5%', friction: 'CRITICAL (68)', color: 'border-amber-500 bg-amber-50/50 text-amber-950', badgeColor: 'bg-amber-100 text-amber-800', desc: 'Travel to lab (30km)' },
            { stage: '4. Treatment', completion: '41.0%', friction: 'Moderate (50)', color: 'border-purple-500 bg-purple-50/50 text-purple-950', badgeColor: 'bg-purple-100 text-purple-800', desc: 'Jan Aushadhi generic' },
            { stage: '5. Follow-up', completion: '27.5%', friction: 'CRITICAL (75)', color: 'border-rose-500 bg-rose-50/50 text-rose-950', badgeColor: 'bg-rose-100 text-rose-800', desc: 'Bus schedule drop-off' },
          ].map((s, idx) => (
            <div key={idx} className={`p-4 rounded-xl border-l-4 ${s.color} border border-slate-200/70 shadow-2xs flex flex-col justify-between space-y-3`}>
              <div>
                <div className="text-xs font-bold text-slate-800">{s.stage}</div>
                <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">{s.completion}</div>
                <div className="mt-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${s.badgeColor}`}>
                    {s.friction}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 font-medium border-t border-slate-200/50 pt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Queue with Non-Clinical Friction Indices */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Today's Patient Adherence & Friction Queue</h2>
            <p className="text-xs text-slate-500 mt-0.5">Review non-clinical barriers before prescribing or scheduling follow-up</p>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'ALL' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Patients ({patientsList.length})
            </button>
            <button
              onClick={() => setFilter('HIGH_FRICTION')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'HIGH_FRICTION' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              High Friction Only
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Location / Distance</th>
                <th className="py-3.5 px-4">Top Operational Barrier</th>
                <th className="py-3.5 px-4">Friction Index</th>
                <th className="py-3.5 px-4">Care Risk</th>
                <th className="py-3.5 px-4">Current Stage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {filteredPatients.map((p: any) => {
                const fp = p.activeFrictionProfileId || {};
                const cr = p.activeCareRiskId || {};
                const score = fp.overallFrictionScore || 45;
                return (
                  <tr key={p._id || p.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{p.name || `Patient (${p.patientCode})`}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{p.age} yrs • {p.gender} • {p.preferredLanguage}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.location?.city || 'Punjab Rural'}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{p.transportAvailability}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">{fp.topBarrier || 'Transport Schedule Mismatch'}</span>
                      <div className="text-[11px] text-slate-500 mt-0.5">Digital: {p.digitalAccessLevel}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          score >= 65
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : score >= 45
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {score} / 100 ({fp.frictionLevel || 'MEDIUM'})
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {cr.riskCategory || (score >= 60 ? 'HIGH RISK' : 'MODERATE')}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Comp. Prob: <span className="font-semibold text-slate-700">{Math.round((cr.careCompletionProbability || 0.65) * 100)}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-1 rounded-lg font-semibold border border-slate-200/60">
                        {p.currentJourneyStage || 'Consultation'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/doctor/patients/${p._id || p.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100/80 rounded-xl text-xs font-bold transition shadow-2xs"
                      >
                        <span>Review Factors</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
