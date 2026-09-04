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
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">
                {data?.doctor?.name || 'Dr. Rajesh Sharma, MD'}
              </h1>
              <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Physician
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              {data?.doctor?.department || 'Cardiology & General Medicine'} | Reg: {data?.doctor?.registrationNumber || 'MCI-PBI-2012-08492'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="px-3.5 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            to="/doctor/patients"
            className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <span>Full Patient Queue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Non-Clinical Clinical Decision-Support Notice */}
      <div className="p-4 bg-purple-50/80 border border-purple-200/80 rounded-2xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div className="text-sm">
          <span className="font-bold text-purple-900">PFIS Clinical Decision-Support Architecture: </span>
          <span className="text-purple-800">
            PFIS highlights patient adherence risks caused by non-clinical barriers (transit distance, missing escort, dialect, digital literacy, and daily wage penalties). It does not evaluate clinical treatment protocols or replace your medical prescriptions.
          </span>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Monitored Cohort</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">{data?.metrics?.totalMonitoredPatients || 24}</div>
            <p className="text-xs text-slate-500 mt-1">Assigned OPD patients</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">High-Friction Risk</span>
            <AlertOctagon className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-600">{data?.metrics?.highFrictionAtRiskCount || 7}</div>
            <p className="text-xs text-slate-500 mt-1">Severe travel / literacy barriers</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending OPD Tokens</span>
            <Clock className="w-5 h-5 text-purple-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-purple-600">{data?.metrics?.pendingOpdConsultations || 12}</div>
            <p className="text-xs text-slate-500 mt-1">Morning clinical window</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Care Completion Rate</span>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-emerald-600">{data?.metrics?.averageCareCompletionRate || '78.4%'}</div>
            <p className="text-xs text-slate-500 mt-1">+14.2% with transit escorts</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">ASHA Escort Trips</span>
            <Car className="w-5 h-5 text-rose-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-rose-600">{data?.metrics?.activeEscortRequests || 3}</div>
            <p className="text-xs text-slate-500 mt-1">Doorstep pickup coordinated</p>
          </div>
        </div>
      </div>

      {/* 5-Stage Care Journey Funnel Overview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">5-Stage Care Journey Progression & Bottlenecks</h2>
            <p className="text-sm text-slate-500">Non-clinical friction monitoring from primary referral to long-term follow-up</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
            Active Cohort Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {[
            { stage: '1. Referral', completion: '88.5%', friction: 'Low (25)', color: 'border-emerald-500 bg-emerald-50/50', desc: 'Pre-visit paperwork' },
            { stage: '2. Consultation', completion: '76.0%', friction: 'Moderate (40)', color: 'border-blue-500 bg-blue-50/50', desc: 'Dialect & timing' },
            { stage: '3. Diagnostics', completion: '49.5%', friction: 'CRITICAL (68)', color: 'border-amber-500 bg-amber-50/50', desc: 'Travel to lab (30km)' },
            { stage: '4. Treatment', completion: '41.0%', friction: 'Moderate (50)', color: 'border-purple-500 bg-purple-50/50', desc: 'Jan Aushadhi generic' },
            { stage: '5. Follow-up', completion: '27.5%', friction: 'CRITICAL (75)', color: 'border-rose-500 bg-rose-50/50', desc: 'Bus schedule drop-off' },
          ].map((s, idx) => (
            <div key={idx} className={`p-4 rounded-xl border-l-4 ${s.color} border border-slate-200/60`}>
              <div className="text-xs font-bold text-slate-700">{s.stage}</div>
              <div className="text-lg font-bold text-slate-900 mt-1">{s.completion}</div>
              <div className="text-xs text-slate-500 mt-1">Friction: {s.friction}</div>
              <p className="text-[11px] text-slate-600 mt-2 font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Queue with Non-Clinical Friction Indices */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Today's Patient Adherence & Friction Queue</h2>
            <p className="text-sm text-slate-500">Review non-clinical barriers before prescribing or scheduling follow-up</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === 'ALL' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Patients ({patientsList.length})
            </button>
            <button
              onClick={() => setFilter('HIGH_FRICTION')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === 'HIGH_FRICTION' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              High Friction Only
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Patient</th>
                <th className="py-3.5 px-4 font-semibold">Location / Distance</th>
                <th className="py-3.5 px-4 font-semibold">Top Operational Barrier</th>
                <th className="py-3.5 px-4 font-semibold">Friction Index</th>
                <th className="py-3.5 px-4 font-semibold">Care Risk</th>
                <th className="py-3.5 px-4 font-semibold">Current Stage</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((p: any) => {
                const fp = p.activeFrictionProfileId || {};
                const cr = p.activeCareRiskId || {};
                const score = fp.overallFrictionScore || 45;
                return (
                  <tr key={p._id || p.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{p.name || `Patient (${p.patientCode})`}</div>
                      <div className="text-xs text-slate-500">{p.age} yrs • {p.gender} • {p.preferredLanguage}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.location?.city || 'Punjab Rural'}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{p.transportAvailability}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800">{fp.topBarrier || 'Transport Schedule Mismatch'}</span>
                      <div className="text-xs text-slate-500">Digital: {p.digitalAccessLevel}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          score >= 65
                            ? 'bg-rose-100 text-rose-700'
                            : score >= 45
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {score} / 100 ({fp.frictionLevel || 'MEDIUM'})
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">
                        {cr.riskCategory || (score >= 60 ? 'HIGH RISK' : 'MODERATE')}
                      </div>
                      <div className="text-xs text-slate-500">
                        Comp. Prob: {Math.round((cr.careCompletionProbability || 0.65) * 100)}%
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                        {p.currentJourneyStage || 'Consultation'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/doctor/patients/${p._id || p.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-bold transition"
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
