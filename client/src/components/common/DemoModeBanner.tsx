import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const DemoModeBanner: React.FC<{ message?: string }> = ({
  message = 'PFIS NON-CLINICAL INTELLIGENCE: Identifies practical healthcare access barriers. Does NOT diagnose diseases or provide medical treatment recommendations.',
}) => {
  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-1.5 px-4 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 text-center">
        <ShieldAlert className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
        <span className="font-medium tracking-wide">
          <strong className="text-teal-300">PFIS Operational System</strong> — {message}
        </span>
      </div>
    </div>
  );
};
