import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle, ArrowRight } from 'lucide-react';

export interface PageClarityRibbonProps {
  pageKey: string;
  what: string;
  why: string;
  next: string;
  actionText?: string;
  actionLink?: string;
  onAction?: () => void;
  badge?: string;
  role?: 'patient' | 'doctor' | 'asha' | 'hospital' | 'government' | 'admin';
  defaultCollapsed?: boolean;
}

export const PageClarityRibbon: React.FC<PageClarityRibbonProps> = ({
  pageKey,
  what,
  why,
  next,
  actionText,
  actionLink,
  onAction,
  badge = 'Quick Guide',
  role = 'patient',
  defaultCollapsed = false,
}) => {
  const storageKey = `pfis_clarity_${pageKey}`;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) return saved === 'true';
    } catch {
      // ignore
    }
    return defaultCollapsed;
  });

  const toggle = () => {
    setIsCollapsed((prev) => {
      const nextState = !prev;
      try {
        localStorage.setItem(storageKey, String(nextState));
      } catch {
        // ignore
      }
      return nextState;
    });
  };

  const getRoleColors = () => {
    switch (role) {
      case 'doctor':
        return {
          border: 'border-purple-200/80',
          bg: 'bg-gradient-to-r from-purple-50/70 via-indigo-50/40 to-white',
          badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
          accent: 'text-purple-700',
          iconBg: 'bg-purple-600 text-white',
          btn: 'bg-purple-600 hover:bg-purple-700 text-white',
        };
      case 'asha':
        return {
          border: 'border-rose-200/80',
          bg: 'bg-gradient-to-r from-rose-50/70 via-amber-50/40 to-white',
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
          accent: 'text-rose-700',
          iconBg: 'bg-rose-600 text-white',
          btn: 'bg-rose-600 hover:bg-rose-700 text-white',
        };
      case 'hospital':
        return {
          border: 'border-blue-200/80',
          bg: 'bg-gradient-to-r from-blue-50/70 via-sky-50/40 to-white',
          badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
          accent: 'text-blue-700',
          iconBg: 'bg-blue-600 text-white',
          btn: 'bg-blue-600 hover:bg-blue-700 text-white',
        };
      case 'government':
        return {
          border: 'border-teal-200/80',
          bg: 'bg-gradient-to-r from-teal-50/70 via-cyan-50/40 to-white',
          badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
          accent: 'text-teal-700',
          iconBg: 'bg-teal-600 text-white',
          btn: 'bg-teal-600 hover:bg-teal-700 text-white',
        };
      case 'admin':
        return {
          border: 'border-slate-300/80',
          bg: 'bg-gradient-to-r from-slate-100/80 via-slate-50 to-white',
          badgeBg: 'bg-slate-200 text-slate-800 border-slate-300',
          accent: 'text-slate-800',
          iconBg: 'bg-slate-800 text-white',
          btn: 'bg-slate-900 hover:bg-slate-800 text-white',
        };
      case 'patient':
      default:
        return {
          border: 'border-teal-200/80',
          bg: 'bg-gradient-to-r from-teal-50/70 via-emerald-50/30 to-white',
          badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
          accent: 'text-teal-700',
          iconBg: 'bg-teal-600 text-white',
          btn: 'bg-teal-600 hover:bg-teal-700 text-white',
        };
    }
  };

  const colors = getRoleColors();

  return (
    <div
      className={`rounded-2xl border ${colors.border} ${colors.bg} shadow-xs transition-all duration-200 overflow-hidden`}
    >
      <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-7 h-7 rounded-lg ${colors.iconBg} flex items-center justify-center shadow-xs shrink-0`}>
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${colors.badgeBg} uppercase tracking-wider`}>
              {badge}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {what}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {actionText && (actionLink || onAction) && !isCollapsed && (
            <div className="hidden sm:block">
              {actionLink ? (
                <Link
                  to={actionLink}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-xs ${colors.btn}`}
                >
                  <span>{actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={onAction}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-xs ${colors.btn}`}
                >
                  <span>{actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={toggle}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors flex items-center gap-1 text-xs font-medium"
            title={isCollapsed ? 'Show Operational Briefing' : 'Minimize Briefing'}
          >
            <span className="hidden md:inline text-[11px] text-slate-500">
              {isCollapsed ? 'Operational Briefing' : 'Minimize Briefing'}
            </span>
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4 text-slate-600" />
            ) : (
              <ChevronUp className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1 border-t border-slate-200/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
            {/* 1. What is this */}
            {/* 1. Module Scope */}
            <div className="p-3 rounded-xl bg-white/80 border border-slate-100 shadow-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                <span>Operational Scope</span>
              </div>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed pl-5.5">
                {what}
              </p>
            </div>

            {/* 2. Strategic Utility */}
            <div className="p-3 rounded-xl bg-white/80 border border-slate-100 shadow-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                <span>Strategic Relevance</span>
              </div>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed pl-5.5">
                {why}
              </p>
            </div>

            {/* 3. Recommended Action */}
            <div className="p-3 rounded-xl bg-white/80 border border-slate-100 shadow-xs space-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                  <span>Recommended Action</span>
                </div>
                <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed pl-5.5">
                  {next}
                </p>
              </div>
              {actionText && (actionLink || onAction) && (
                <div className="pt-2 sm:hidden">
                  {actionLink ? (
                    <Link
                      to={actionLink}
                      className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${colors.btn}`}
                    >
                      <span>{actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={onAction}
                      className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${colors.btn}`}
                    >
                      <span>{actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
