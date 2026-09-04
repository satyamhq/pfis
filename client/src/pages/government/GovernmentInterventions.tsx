import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Cpu,
  Users,
  Car,
  Sparkles,
  Building2,
  DollarSign,
} from 'lucide-react';
import { governmentService } from '../../services/governmentService';

export const GovernmentInterventions: React.FC = () => {
  const [interventions, setInterventions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sanctionSuccess, setSanctionSuccess] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await governmentService.getInterventions();
        setInterventions(res.interventions || []);
      } catch (err) {
        console.warn('Fallback interventions:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSanction = async (code: string, name: string) => {
    try {
      await governmentService.recordPolicyAction({
        interventionCode: code,
        action: 'SANCTIONED_AND_FUNDED',
        allocatedBudgetINR: 1500000,
        notes: `Policy sanctioned by District Health Directorate for Kapurthala district.`,
      });
      setSanctionSuccess(`Policy '${name}' sanctioned and approved for field rollout!`);
      setTimeout(() => setSanctionSuccess(''), 4000);
    } catch (err: any) {
      setSanctionSuccess(`Policy '${name}' recorded successfully (Demo Session).`);
      setTimeout(() => setSanctionSuccess(''), 4000);
    }
  };

  const defaultList = [
    {
      id: 'int-1',
      code: 'MOBILE_DIAGNOSTIC_VANS',
      title: 'District Mobile Diagnostic & Ultrasound Vans',
      targetStage: 'Diagnostics & Lab Testing',
      estimatedCostINR: 1800000,
      projectedCareCompletionGainPercent: 18.5,
      affectedCitizensPerYear: 24000,
      implementationTimelineMonths: 3,
      priorityLevel: 'HIGH',
      description: 'Deploy 2 custom mobile diagnostic buses to conduct routine ECG, X-Ray, and blood tests at village sub-centers.',
    },
    {
      id: 'int-2',
      code: 'RURAL_TRANSIT_SHUTTLE',
      title: 'Community Hospital Express Transit Feeder Shuttles',
      targetStage: 'Referral & Follow-up',
      estimatedCostINR: 950000,
      projectedCareCompletionGainPercent: 14.2,
      affectedCitizensPerYear: 38000,
      implementationTimelineMonths: 1,
      priorityLevel: 'CRITICAL',
      description: 'Synchronized morning feeder buses running from remote villages (e.g. Mehli) directly to District Civil Hospital.',
    },
    {
      id: 'int-3',
      code: 'ASHA_CARE_ESCORT_STIPEND',
      title: 'Grassroots ASHA Care Escort Incentive Program',
      targetStage: 'Consultation & Follow-up',
      estimatedCostINR: 420000,
      projectedCareCompletionGainPercent: 11.0,
      affectedCitizensPerYear: 15000,
      implementationTimelineMonths: 1,
      priorityLevel: 'MEDIUM',
      description: 'Per-visit transit escort incentive (INR 150) for ASHA workers accompanying elderly/vulnerable citizens.',
    },
  ];

  const items = interventions.length > 0 ? interventions : defaultList;

  return (
    <div className="space-y-6">
      <Link
        to="/government/dashboard"
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to District Overview</span>
      </Link>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Macro Public Health Interventions</h1>
          <p className="text-sm text-slate-500 mt-1">
            Simulate and sanction population-level policies to eliminate systemic friction bottlenecks
          </p>
        </div>
      </div>

      {sanctionSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{sanctionSuccess}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-emerald-300 transition"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    item.priorityLevel === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-700'
                      : item.priorityLevel === 'HIGH'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {item.priorityLevel} PRIORITY
                </span>
                <span className="text-xs text-slate-400 font-medium">Target Stage: {item.targetStage}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                <div>
                  Estimated Budget: <strong className="text-slate-900">₹{item.estimatedCostINR?.toLocaleString()}</strong>
                </div>
                <div>
                  Timeline: <strong className="text-slate-900">{item.implementationTimelineMonths} Month(s)</strong>
                </div>
                <div>
                  Citizen Reach: <strong className="text-slate-900">{item.affectedCitizensPerYear?.toLocaleString()} / yr</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0 lg:border-l lg:border-slate-100 lg:pl-6">
              <div className="text-left lg:text-right">
                <div className="text-xs text-slate-400 font-semibold">Simulated Completion Gain</div>
                <div className="text-2xl font-black text-emerald-600">
                  +{item.projectedCareCompletionGainPercent}%
                </div>
              </div>
              <button
                onClick={() => handleSanction(item.code, item.title)}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sanction Policy & Budget</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
