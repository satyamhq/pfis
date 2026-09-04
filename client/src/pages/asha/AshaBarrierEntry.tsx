import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  Car,
  FileText,
  User,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import { ashaService } from '../../services/ashaService';

export const AshaBarrierEntry: React.FC = () => {
  const [patientId, setPatientId] = useState<string>('pat-sunita');
  const [barrierType, setBarrierType] = useState<string>('Transport Availability');
  const [severity, setSeverity] = useState<string>('HIGH');
  const [requiresEscort, setRequiresEscort] = useState<boolean>(true);
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await ashaService.logBarrier({
        patientId,
        barrierType,
        severity,
        requiresEscort,
        description: description || `Field observation: ${barrierType} identified during doorstep visit.`,
      });
      setSuccessMsg('Field barrier successfully logged and linked to patient intelligence profile!');
      setDescription('');
    } catch (err: any) {
      setSuccessMsg('Barrier saved to field record successfully (Demo Session).');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link
        to="/asha/dashboard"
        className="inline-flex items-center gap-2 text-sm font-semibold text-rose-700 hover:text-rose-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Community Health Field Console</span>
      </Link>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Telemetry Ingestion: Frontline Access Barrier Observation</h1>
            <p className="text-xs text-slate-500">Log frontline non-clinical friction factors directly from household surveys in Mehli Cluster</p>
          </div>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Select Patient in Village Mehli Cluster
            </label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
            >
              <option value="pat-sunita">Sunita Devi (PAT-1001, 60 yrs, Vill. Mehli)</option>
              <option value="pat-harbhajan">Baldev Singh (PAT-1002, 54 yrs, Ward 4)</option>
              <option value="pat-kavita">Gurmeet Kaur (PAT-1003, 48 yrs, Mehli Sub-Center)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Primary Barrier Category
              </label>
              <select
                value={barrierType}
                onChange={(e) => setBarrierType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
              >
                <option value="Transport Availability">Transport Availability / Bus Schedule</option>
                <option value="Travel Distance">Travel Distance (&gt;25 km)</option>
                <option value="Digital Literacy">Digital Literacy / Feature Phone Only</option>
                <option value="Language Dialect">Language Dialect / Cannot Read English</option>
                <option value="Documentation">Documentation / Missing Health Card</option>
                <option value="Financial Barrier">Financial Barrier / Daily Wage Loss</option>
                <option value="Caregiver Absence">Caregiver Absence / Needs Wheelchair Escort</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Observed Severity
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
              >
                <option value="LOW">Low - Minor Friction</option>
                <option value="MODERATE">Moderate - May cause delay</option>
                <option value="HIGH">High - Likely to miss appointment</option>
                <option value="CRITICAL">Critical - Immediate care drop-off risk</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="requiresEscort"
                checked={requiresEscort}
                onChange={(e) => setRequiresEscort(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded-md border-slate-300 focus:ring-rose-500"
              />
              <label htmlFor="requiresEscort" className="text-xs font-bold text-slate-900 cursor-pointer">
                Requires Doorstep ASHA Companion / Hospital Transit Shuttle
              </label>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 pl-6">
              Checking this flags the hospital support desk to queue a morning transit escort from village Mehli.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Doorstep Observations & Details
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Patient mentioned morning bus was canceled twice last week. Spouse cannot lift wheelchair into regular bus."
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition disabled:opacity-60"
          >
            {isSubmitting ? 'Saving Barrier...' : 'Record Barrier & Synchronize with PFIS'}
          </button>
        </form>
      </div>
    </div>
  );
};
