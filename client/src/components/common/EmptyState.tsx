import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = Inbox,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-200/90 shadow-2xs ${className}`}
    >
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-teal-50/60 border border-slate-200/80 flex items-center justify-center text-teal-600 shadow-2xs">
          <Icon className="w-7 h-7" />
        </div>
      </div>
      <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1.5 mb-5 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
