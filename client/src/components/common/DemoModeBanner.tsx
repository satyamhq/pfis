import React, { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

export const DemoModeBanner: React.FC<{ message?: string }> = ({
  message = 'PFIS NON-CLINICAL INTELLIGENCE: Identifies practical healthcare access barriers. Does NOT diagnose diseases or provide medical treatment recommendations.',
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-slate-200 border-b border-teal-500/20 text-[11px] py-1.5 px-3 sm:px-6 flex items-center justify-between z-50">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 flex-1">
          <ShieldAlert className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span className="font-medium tracking-wide">
            <strong className="text-teal-300 font-bold">PFIS Safety Protocol</strong> — {message}
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-0.5 rounded transition-colors shrink-0 cursor-pointer hidden sm:block"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
