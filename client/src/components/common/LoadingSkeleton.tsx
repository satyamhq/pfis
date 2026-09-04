import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number; className?: string }> = ({
  rows = 4,
  className = '',
}) => {
  return (
    <div className={`space-y-4 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-2xs ${className}`}>
      <div className="h-6 shimmer-bg rounded-lg w-1/4"></div>
      <div className="space-y-2.5 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-4 shimmer-bg rounded-md"
            style={{ width: `${Math.max(65, 100 - i * 10)}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export const CardSkeleton: React.FC<{ count?: number; className?: string }> = ({
  count = 4,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-card"
        >
          <div className="flex justify-between items-center">
            <div className="h-3 shimmer-bg rounded w-24"></div>
            <div className="h-10 w-10 shimmer-bg rounded-xl"></div>
          </div>
          <div className="h-8 shimmer-bg rounded-lg w-28"></div>
          <div className="h-3 shimmer-bg rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 4,
}) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 overflow-hidden shadow-card">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="h-5 shimmer-bg rounded w-36"></div>
        <div className="h-8 shimmer-bg rounded-xl w-24"></div>
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-4 flex items-center justify-between gap-4">
            {Array.from({ length: columns }).map((_, c) => (
              <div
                key={c}
                className="h-4 shimmer-bg rounded"
                style={{ width: `${c === 0 ? 30 : 20}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const HeroBannerSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-card space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2.5 w-full max-w-md">
          <div className="h-5 shimmer-bg rounded-full w-40"></div>
          <div className="h-8 shimmer-bg rounded-xl w-3/4"></div>
          <div className="h-4 shimmer-bg rounded w-full"></div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-10 shimmer-bg rounded-xl w-28"></div>
          <div className="h-10 shimmer-bg rounded-xl w-36"></div>
        </div>
      </div>
    </div>
  );
};
