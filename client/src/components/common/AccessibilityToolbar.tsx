import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Eye,
  Type,
  SunMoon,
  Sparkles,
  Volume2,
  VolumeX,
  Gauge,
  RotateCcw,
  Check,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

export const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    textSize,
    cycleTextSize,
    highContrast,
    toggleHighContrast,
    reduceMotion,
    toggleReduceMotion,
    resetAccessibility,
  } = useAccessibility();

  const {
    simpleLanguageMode,
    toggleSimpleLanguageMode,
    textToSpeechEnabled,
    setTextToSpeechEnabled,
    voiceEnabled,
    setVoiceEnabled,
  } = useLanguage();

  return (
    <aside aria-label="Accessibility options" className="fixed bottom-6 left-6 z-[9990] flex flex-col items-start gap-2">
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        aria-label="Open Accessibility Toolbar"
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white text-slate-800 font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all border border-slate-200 text-xs tracking-wide"
      >
        <Eye className="w-4 h-4 text-teal-600" />
        <span className="hidden sm:inline">Accessibility Controls</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {/* Expanded Accessibility Settings Panel */}
      {isOpen && (
        <section
          id="accessibility-panel"
          aria-label="Accessibility controls settings"
          className="w-72 sm:w-80 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-2 duration-200 flex flex-col gap-3.5"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Accessibility Tools (WCAG 2.1)
            </h3>
            <button
              type="button"
              onClick={resetAccessibility}
              className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1 font-medium"
              title="Reset all settings to default"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* 1. Text Size Control */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-brand-600" />
              <div>
                <p className="text-xs font-bold text-slate-800">Text Size</p>
                <p className="text-[10px] text-slate-500 capitalize">{textSize} (100% - 130%)</p>
              </div>
            </div>
            <button
              type="button"
              onClick={cycleTextSize}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-brand-700 transition-colors"
            >
              {textSize === 'normal' ? 'Normal' : textSize === 'large' ? 'Large (115%)' : 'Extra (130%)'}
            </button>
          </div>

          {/* 2. High Contrast Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SunMoon className="w-4 h-4 text-brand-600" />
              <div>
                <p className="text-xs font-bold text-slate-800">High Contrast</p>
                <p className="text-[10px] text-slate-500">Maximum readability borders</p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleHighContrast}
              className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                highContrast ? 'bg-teal-600 justify-end' : 'bg-slate-200 justify-start'
              }`}
              aria-pressed={highContrast}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                {highContrast && <Check className="w-2.5 h-2.5 text-teal-600" />}
              </div>
            </button>
          </div>

          {/* 3. Simple Language Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <div>
                <p className="text-xs font-bold text-slate-800">Simple Language</p>
                <p className="text-[10px] text-slate-500">Plain words, no medical jargon</p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleSimpleLanguageMode}
              className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                simpleLanguageMode ? 'bg-amber-500 justify-end' : 'bg-slate-200 justify-start'
              }`}
              aria-pressed={simpleLanguageMode}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                {simpleLanguageMode && <Check className="w-2.5 h-2.5 text-amber-600" />}
              </div>
            </button>
          </div>

          {/* 4. Voice & Screen Reader Assistance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {textToSpeechEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
              <div>
                <p className="text-xs font-bold text-slate-800">Voice Assistance</p>
                <p className="text-[10px] text-slate-500">Read aloud important buttons & cards</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setTextToSpeechEnabled(!textToSpeechEnabled);
                setVoiceEnabled(!voiceEnabled);
              }}
              className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                textToSpeechEnabled ? 'bg-emerald-600 justify-end' : 'bg-slate-200 justify-start'
              }`}
              aria-pressed={textToSpeechEnabled}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                {textToSpeechEnabled && <Check className="w-2.5 h-2.5 text-emerald-600" />}
              </div>
            </button>
          </div>

          {/* 5. Reduce Animation / Motion */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-indigo-500" />
              <div>
                <p className="text-xs font-bold text-slate-800">Reduce Motion</p>
                <p className="text-[10px] text-slate-500">Disable transitions & pulses</p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleReduceMotion}
              className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                reduceMotion ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
              }`}
              aria-pressed={reduceMotion}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                {reduceMotion && <Check className="w-2.5 h-2.5 text-indigo-600" />}
              </div>
            </button>
          </div>
        </section>
      )}
    </aside>
  );
};
