import React from 'react';

export interface StatusBadgeProps {
  status: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', pulse }) => {
  const normalized = (status || '').toUpperCase().replace(/\s+/g, '_');

  let bgClass = 'bg-slate-100 text-slate-700 border-slate-200/90';
  let dotColor = 'bg-slate-400';
  let shouldPulse = pulse ?? false;

  if (['ACCEPTED', 'ACTIVE', 'COMPLETED', 'HEALTHY', 'LOW', 'SUCCESS'].includes(normalized)) {
    bgClass = 'bg-emerald-50 text-emerald-700 border-emerald-200/90';
    dotColor = 'bg-emerald-500';
  } else if (['UNDER_REVIEW', 'PENDING', 'MEDIUM', 'MODERATE', 'IN_PROGRESS', 'HOSPITAL_RECEIVED'].includes(normalized)) {
    bgClass = 'bg-amber-50 text-amber-800 border-amber-200/90';
    dotColor = 'bg-amber-500';
    if (pulse === undefined) shouldPulse = true;
  } else if (['HIGH', 'AT_RISK', 'REQUEST_SENT'].includes(normalized)) {
    bgClass = 'bg-orange-50 text-orange-800 border-orange-200/90';
    dotColor = 'bg-orange-500';
    if (pulse === undefined) shouldPulse = true;
  } else if (['REJECTED', 'CANCELLED', 'CRITICAL', 'COMPOUND_CRITICAL', 'BLOCKED', 'REVOKED', 'FAILED'].includes(normalized)) {
    bgClass = 'bg-rose-50 text-rose-700 border-rose-200/90';
    dotColor = 'bg-rose-500';
    if (pulse === undefined) shouldPulse = true;
  }

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[10px] gap-1 font-semibold',
    sm: 'px-2.5 py-0.5 text-[11px] gap-1.5 font-semibold',
    md: 'px-3 py-1 text-xs gap-1.5 font-semibold',
    lg: 'px-3.5 py-1.5 text-sm gap-2 font-bold',
  };

  const formatText = (text: string) => {
    return text.replace(/_/g, ' ');
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-2xs tracking-wide transition-all ${bgClass} ${sizeClasses[size]}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {shouldPulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColor}`} />
      </span>
      <span>{formatText(status)}</span>
    </span>
  );
};
