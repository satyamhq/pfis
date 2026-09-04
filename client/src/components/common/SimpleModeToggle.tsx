import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

interface SimpleModeToggleProps {
  className?: string;
}

export const SimpleModeToggle: React.FC<SimpleModeToggleProps> = ({ className = '' }) => {
  const { simpleLanguageMode, toggleSimpleLanguageMode } = useLanguage();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleSimpleLanguageMode}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-xs ${
        simpleLanguageMode
          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-400 shadow-sm shadow-amber-500/20 ring-2 ring-amber-300/40'
          : 'bg-slate-50/90 text-slate-700 border-slate-200/80 hover:bg-white dark:bg-slate-800/90 dark:text-slate-200 dark:border-slate-700/80 dark:hover:bg-slate-750'
      } ${className}`}
      title={
        simpleLanguageMode
          ? t('common.simpleLanguageActive', 'Simple Mode Active')
          : t('common.simpleLanguage', 'Simple Language Mode')
      }
    >
      <Sparkles className={`w-3.5 h-3.5 ${simpleLanguageMode ? 'text-amber-100 animate-spin-slow' : 'text-amber-500'}`} />
      <span>{t('common.simpleLanguage', 'Simple Mode')}</span>
      {simpleLanguageMode && (
        <span className="ml-0.5 px-1.5 py-0.2 rounded-md bg-amber-700/60 text-[9px] font-extrabold uppercase tracking-wide">
          ON
        </span>
      )}
    </button>
  );
};
