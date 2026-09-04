import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200/80 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-teal-600/20">
                <Activity className="w-5 h-5 stroke-[2.3]" />
              </div>
              <span className="font-black text-base tracking-tight text-slate-900">
                Patient Friction Intelligence System (PFIS)
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              Healthcare may be available, but is it practically accessible? PFIS identifies non-clinical
              socio-geographic barriers—from transit deficits to loss of daily subsistence wages—and empowers
              health administrators to simulate high-yield community interventions.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                DPDP Privacy Preserving
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80 text-[11px] font-bold">
                <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
                Non-Clinical Safety Mandate
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Operational Telemetry Active
              </span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
              Platform & Portals
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/patient/hospitals" className="text-slate-600 hover:text-teal-600 transition-colors">
                  Find Nearby Hospitals
                </Link>
              </li>
              <li>
                <Link to="/patient/friction" className="text-slate-600 hover:text-teal-600 transition-colors">
                  Friction Fingerprint Engine
                </Link>
              </li>
              <li>
                <Link to="/admin/simulator" className="text-slate-600 hover:text-teal-600 transition-colors">
                  What-If Policy Simulator
                </Link>
              </li>
              <li>
                <Link to="/admin/care-leakage" className="text-slate-600 hover:text-teal-600 transition-colors">
                  Care Leakage Funnel
                </Link>
              </li>
              <li>
                <Link to="/admin/friction-map" className="text-slate-600 hover:text-teal-600 transition-colors">
                  Population Friction Heatmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Governance */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
              Governance & Safety
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-teal-600 transition-colors">
                  Non-Clinical Safety Mandate
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="text-slate-600 hover:text-teal-600 transition-colors">
                  System Architecture
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-teal-600 transition-colors">
                  Institutional Integration Desk
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Consent & Telemetry Auditing</span>
              </li>
              <li>
                <span className="text-slate-400">National Healthcare Decision AI</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Patient Friction Intelligence System (PFIS). All rights reserved.</p>
          <p className="text-[11px] text-slate-400 text-center sm:text-right font-medium">
            National Healthcare Access Intelligence • Operational Decision Support Platform
          </p>
        </div>
      </div>
    </footer>
  );
};
