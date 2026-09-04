import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const DemoModeBanner: React.FC<{ message?: string }> = ({
  message = 'PFIS NON-CLINICAL INTELLIGENCE: Identifies practical healthcare access barriers. Does NOT diagnose diseases or provide medical treatment recommendations.',
}) => {
  return (
    <div className="bg-teal-50/90 text-teal-900 border-b border-teal-200/80 text-xs py-1.5 px-4 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 text-center">
        <ShieldAlert className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
        <span className="font-medium tracking-wide">
          <strong className="text-teal-950 font-bold">PFIS Operational System</strong> — {message}
        </span>
      </div>
    </div>
  );
};

