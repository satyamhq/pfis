import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  AlertTriangle,
  Users,
  Building2,
  TrendingDown,
  Car,
  CheckCircle2,
  Sparkles,
  Shield,
  Activity,
} from 'lucide-react';
import { governmentService } from '../../services/governmentService';

export const GovernmentFrictionMap: React.FC = () => {
  const [clusters, setClusters] = useState<any[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await governmentService.getFrictionMap();
        setClusters(res.clusters || []);
        if (res.clusters?.length > 0) {
          setSelectedCluster(res.clusters[0]);
        }
      } catch (err) {
        console.warn('Fallback friction map data:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const defaultClusters = [
    {
      district: 'Kapurthala (Rural Mehli & Phagwara)',
      latitude: 31.224,
      longitude: 75.7708,
      averageFrictionScore: 58.4,
      frictionCategory: 'HIGH',
      primaryFrictionDriver: 'Transit Schedule Mismatch (Infrequent Buses)',
      monitoredCitizens: 4200,
      hospitalBedUtilization: '74%',
      highRiskHouseholdsPercent: 38.5,
      suggestedAction: 'Route morning express shuttle from village Mehli to CHC Phagwara.',
    },
    {
      district: 'Jalandhar Central & Cantt',
      latitude: 31.326,
      longitude: 75.5762,
      averageFrictionScore: 36.1,
      frictionCategory: 'LOW',
      primaryFrictionDriver: 'OPD Queue Congestion & Peak Wait Times',
      monitoredCitizens: 12500,
      hospitalBedUtilization: '89%',
      highRiskHouseholdsPercent: 14.2,
      suggestedAction: 'Expand evening OPD shift and introduce automated token kiosk.',
    },
    {
      district: 'Hoshiarpur Sub-Mountain Foothills',
      latitude: 31.5273,
      longitude: 75.9149,
      averageFrictionScore: 71.3,
      frictionCategory: 'CRITICAL',
      primaryFrictionDriver: 'Remote Hilly Distance & Zero Direct Transit',
      monitoredCitizens: 3100,
      hospitalBedUtilization: '62%',
      highRiskHouseholdsPercent: 54.0,
      suggestedAction: 'Deploy weekly Mobile Medical Van with telemedicine linkage.',
    },
    {
      district: 'Shaheed Bhagat Singh Nagar (Nawanshahr)',
      latitude: 31.1256,
      longitude: 76.1189,
      averageFrictionScore: 49.7,
      frictionCategory: 'MODERATE',
      primaryFrictionDriver: 'Digital Token Literacy & Language Dialect',
      monitoredCitizens: 5800,
      hospitalBedUtilization: '68%',
      highRiskHouseholdsPercent: 26.8,
      suggestedAction: 'Distribute Punjabi audio care guidance cards via ASHA workers.',
    },
  ];

  const activeClusters = clusters.length > 0 ? clusters : defaultClusters;
  const current = selectedCluster || activeClusters[0];

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
          <h1 className="text-2xl font-bold text-slate-900">District Healthcare Friction Heat-Map</h1>
          <p className="text-sm text-slate-500 mt-1">
            Geospatial non-clinical accessibility clustering across Kapurthala and Doaba Region
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            <Shield className="w-3.5 h-3.5" />
            DPDP Act Anonymized Telemetry
          </span>
        </div>
      </div>

      {/* Interactive Map & Clusters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cluster List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Healthcare Sub-Divisions ({activeClusters.length})
          </h2>
          {activeClusters.map((c, idx) => {
            const isSelected = current?.district === c.district;
            return (
              <div
                key={idx}
                onClick={() => setSelectedCluster(c)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{c.district}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.frictionCategory === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-700'
                        : c.frictionCategory === 'HIGH'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {c.frictionCategory}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Avg Friction: <strong>{c.averageFrictionScore} / 100</strong></span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">
                  Driver: {c.primaryFrictionDriver}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Cluster Deep-Dive */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Sub-Division Telemetry</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{current?.district}</h3>
              </div>
              <span
                className={`text-xs font-extrabold px-3 py-1 rounded-full w-fit ${
                  current?.frictionCategory === 'CRITICAL'
                    ? 'bg-rose-100 text-rose-700'
                    : current?.frictionCategory === 'HIGH'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                Friction Score: {current?.averageFrictionScore} / 100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="text-xs text-slate-500">Monitored Citizens</div>
                <div className="text-xl font-bold text-slate-900 mt-1">
                  {current?.monitoredCitizens?.toLocaleString() || '4,200'}
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="text-xs text-slate-500">Hospital Bed Utilization</div>
                <div className="text-xl font-bold text-slate-900 mt-1">
                  {current?.hospitalBedUtilization || '74%'}
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="text-xs text-slate-500">High-Risk Households</div>
                <div className="text-xl font-bold text-rose-600 mt-1">
                  {current?.highRiskHouseholdsPercent || '38.5'}%
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs space-y-1">
              <div className="font-bold text-amber-900">Primary Systemic Bottleneck:</div>
              <div className="text-amber-800">{current?.primaryFrictionDriver}</div>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs space-y-1">
              <div className="font-bold text-emerald-900">Recommended Policy Intervention:</div>
              <div className="text-emerald-800">{current?.suggestedAction || 'Deploy mobile diagnostic lab unit and rural feeder shuttles.'}</div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                to="/government/interventions"
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition flex items-center gap-1.5"
              >
                <span>Simulate Policy for this Sub-Division</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
