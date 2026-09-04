import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';
import { CareRisk } from '../../types';
import { CompletionGauge } from '../../components/charts/CompletionGauge';
import { JourneyTimeline } from '../../components/patient/JourneyTimeline';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { PageClarityRibbon } from '../../components/common/PageClarityRibbon';
import { ShieldAlert, AlertTriangle, CheckCircle2, HeartHandshake, Compass } from 'lucide-react';

export const AccessibilityRisk: React.FC = () => {
  const [careRisk, setCareRisk] = useState<CareRisk | null>(null);
  const [careJourney, setCareJourney] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRisk = async () => {
      try {
        const rRes = await patientService.getAccessibilityRisk();
        if (rRes.success) setCareRisk(rRes.careRisk);

        const jRes = await patientService.getCareJourney();
        if (jRes.success) setCareJourney(jRes.careJourney);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadRisk();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  const completionProb = careRisk?.careCompletionProbability ?? 82;
  const riskCategory = careRisk?.riskCategory ?? 'LOW';
  const bottleneckStage = careRisk?.bottleneckStage ?? 'Travel & Physical Transit';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Guidance Ribbon: What is this? Why is it useful? What should I do next? */}
      <PageClarityRibbon
        pageKey="patient_journey_risk"
        what="Care Journey Continuum & Attrition Trajectory — predictive operational modeling of care completion."
        why="Identifies non-clinical attrition vulnerabilities across 9 care continuum stages to preempt premature drop-out."
        next="Review the operational bottleneck stage and evaluate recommended community mitigation pathways."
        actionText="Find Hospitals"
        actionLink="/patient/hospitals"
        badge="Journey Risk"
        role="patient"
      />

      {/* Header Risk Overview */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-teal-600 shrink-0" />
                Journey Risk
              </h2>
              <StatusBadge status={riskCategory} size="sm" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Non-clinical operational estimate of physical, logistical, and administrative completion likelihood
            </p>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="p-3.5 bg-teal-50 text-slate-800 rounded-xl text-xs flex items-start gap-3 border border-teal-200">
          <HeartHandshake className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
          <p className="text-slate-700 leading-relaxed">
            <strong className="text-teal-900">Operational Decision Notice:</strong> {careRisk?.disclaimer || 'This is an estimated operational accessibility index based on socio-geographic friction factors. This is NOT a clinical diagnosis or medical prediction.'}
          </p>
        </div>

        {/* Center Gauge & Bottleneck Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2">
          <div className="flex justify-center">
            <CompletionGauge
              score={completionProb}
              size={190}
              label="Completion"
              sublabel="Forecast"
            />
          </div>

          <div className="md:col-span-2 space-y-3 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Bottleneck</span>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-600" />
                {bottleneckStage}
              </h4>
              <p className="text-slate-600 leading-relaxed">
                The greatest operational drop-off hazard for this profile occurs during physical travel and transit timing prior to specialist intake.
              </p>
            </div>

            {/* Primary Risk Factors */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Risk Drivers
              </span>
              <div className="space-y-1.5">
                {(careRisk?.primaryRiskFactors || []).map((rf, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="space-y-0.5">
                      <strong className="text-slate-900">{rf.factorName}</strong>
                      <p className="text-[11px] text-slate-500">{rf.operationalImpact}</p>
                    </div>
                    <StatusBadge status={rf.severity} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Mitigation Pathways */}
        {careRisk?.mitigationPathways && careRisk.mitigationPathways.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Recommended Actions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {careRisk.mitigationPathways.map((mit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 font-semibold"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>{mit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 9-Stage Care Journey Progression */}
      {careJourney && (
        <JourneyTimeline
          stages={careJourney.stages}
          currentStageIndex={careJourney.currentStageIndex}
        />
      )}
    </div>
  );
};
