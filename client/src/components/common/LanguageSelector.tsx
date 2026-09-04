import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
  showDialect?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  compact = false,
  className = '',
  showDialect = false,
}) => {
  const {
    currentLanguage,
    currentDialect,
    supportedLanguages,
    changeLanguage,
    changeDialect,
  } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isDialectOpen, setIsDialectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsDialectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-xs ${
          compact
            ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-teal-400'
            : 'bg-slate-50/90 text-slate-700 border-slate-200/80 hover:bg-white hover:border-teal-400'
        }`}
        title="Choose Language"
      >
        <div className="w-5 h-5 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-600">
          <Globe className="w-3.5 h-3.5" />
        </div>
        <span className="font-semibold">{currentLanguage.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Language Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl z-50 py-2 max-h-96 overflow-y-auto">
          <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              Select Language
            </span>
            <span className="text-[10px] font-semibold bg-teal-50 text-teal-600 px-1.5 py-0.5 rounded-md">
              11 Indic
            </span>
          </div>
          <div className="py-1 px-1.5 space-y-0.5">
            {supportedLanguages.map((lang) => {
              const isSelected = lang.code === currentLanguage.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-medium transition-all ${
                    isSelected
                      ? 'bg-teal-50 text-teal-800 font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold">{lang.nativeName}</span>
                    <span className="text-[11px] text-slate-400">({lang.name})</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </button>
              );
            })}
          </div>

          {/* Optional Dialects section */}
          {showDialect && currentLanguage.dialects && currentLanguage.dialects.length > 1 && (
            <div className="mt-2 pt-2 border-t border-slate-100 px-3">
              <div className="text-xs font-semibold text-slate-400 mb-1.5">
                Regional Dialect ({currentLanguage.nativeName}):
              </div>
              <div className="space-y-1">
                {currentLanguage.dialects.map((d) => (
                  <button
                    key={d.code}
                    onClick={() => {
                      changeDialect(d.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1 text-xs rounded transition-colors ${
                      currentDialect === d.code
                        ? 'bg-teal-100 text-teal-800 font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{d.nativeName}</span>
                    {currentDialect === d.code && <Check className="w-3 h-3 text-teal-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
