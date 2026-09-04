import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  badge?: string;
  badgeType?: 'success' | 'warning' | 'danger' | 'info';
  trend?: string;
  trendPositive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-teal-600 bg-teal-50 border-teal-100',
  badge,
  badgeType = 'info',
  trend,
  trendPositive,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
        onClick ? 'cursor-pointer hover:border-teal-300 hover:-translate-y-0.5 active:translate-y-0' : ''
      } ${className}`}
    >
      {/* Subtle background glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-teal-500/10 transition-colors" />

      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="space-y-2 min-w-0 flex-1">
          {/* Top Title & Badge */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {title}
            </p>
            {badge && (
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase border shrink-0 ${
                  badgeType === 'success'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : badgeType === 'warning'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : badgeType === 'danger'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-teal-50 text-teal-700 border-teal-200'
                }`}
              >
                {badge}
              </span>
            )}
          </div>

          {/* Metric Value */}
          <div className="pt-0.5">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 tabular-nums leading-none">
              {value}
            </h3>
          </div>

          {/* Subtitle & Trend */}
          {(subtitle || trend) && (
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              {trend && (
                <span
                  className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full ${
                    trendPositive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                      : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                  }`}
                >
                  {trendPositive ? (
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-rose-600" />
                  )}
                  <span>{trend}</span>
                </span>
              )}
              {subtitle && (
                <span className="text-slate-500 text-[11px] leading-relaxed">
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-2xl border ${iconColor} shrink-0 shadow-2xs flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};
