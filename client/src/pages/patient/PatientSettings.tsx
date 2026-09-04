import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  Mic,
  Volume2,
  Sparkles,
  Save,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const PatientSettings: React.FC = () => {
  const {
    currentLanguage,
    currentDialect,
    simpleLanguageMode,
    voiceEnabled,
    textToSpeechEnabled,
    supportedLanguages,
    changeLanguage,
    changeDialect,
    toggleSimpleLanguageMode,
    setVoiceEnabled,
    setTextToSpeechEnabled,
    speakText,
  } = useLanguage();

  const { t } = useTranslation();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const sampleComplex = t(
    'patient.accessibilityRiskDesc',
    'Estimated operational barrier risk during healthcare completion.'
  );
  const sampleSimple = t(
    'simple.accessibilityHigh',
    'Getting to the hospital and completing treatment may be difficult for you.'
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/90 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold mb-3 border border-teal-200">
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('settings.languageSection', 'Language & Accessibility')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('settings.title', 'Language & Accessibility Preferences')}
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            {t(
              'settings.subtitle',
              'Customize your native language, regional dialect, and assistive speech tools'
            )}
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold">
            {t('settings.savedSuccess', 'Preferences saved successfully!')}
          </span>
        </div>
      )}

      {/* Section 1: Language Selection */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t('settings.languageSection', '1. Language & Regional Dialect')}
            </h2>
            <p className="text-xs text-slate-500">
              Select your primary language for all navigation, buttons, and reports
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
            {t('settings.preferredLanguage', 'Preferred Language')} (11 Supported)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {supportedLanguages.map((lang) => {
              const isSelected = currentLanguage.code === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50 text-teal-900 font-bold shadow-sm ring-2 ring-teal-500/20'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-base">{lang.nativeName}</span>
                  <span className="text-xs text-slate-400 font-normal">{lang.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dialect selector */}
        {currentLanguage.dialects && currentLanguage.dialects.length > 1 && (
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              {t('settings.preferredDialect', 'Preferred Dialect (Optional)')} — {currentLanguage.nativeName}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {currentLanguage.dialects.map((d) => {
                const isSelected = currentDialect === d.code;
                return (
                  <button
                    key={d.code}
                    type="button"
                    onClick={() => changeDialect(d.code)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50 text-teal-900 font-semibold'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>{d.nativeName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Simple Language Mode */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {t('settings.simpleModeSection', '2. Low-Literacy & Simple Language Mode')}
              </h2>
              <p className="text-xs text-slate-500">
                {t(
                  'settings.simpleModeDesc',
                  'Replaces technical terms with short, everyday words and simpler sentences.'
                )}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleSimpleLanguageMode}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              simpleLanguageMode
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {simpleLanguageMode ? 'ENABLED (सक्रिय)' : 'DISABLED (निष्क्रिय)'}
          </button>
        </div>

        {/* Preview box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Live Preview in {currentLanguage.nativeName}:
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-white border border-slate-200">
              <span className="font-semibold text-slate-500 block mb-1">Standard Mode:</span>
              <p className="text-slate-700">{sampleComplex}</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <span className="font-semibold text-amber-700 block mb-1">
                Simple Language Mode:
              </span>
              <p className="text-amber-900 font-medium">{sampleSimple}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Voice & Audio Tools */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t('settings.speechSection', '3. Voice Input & Text-to-Speech (TTS)')}
            </h2>
            <p className="text-xs text-slate-500">
              {t(
                'settings.speechDesc',
                'Use voice search and listen to important accessibility cards read aloud.'
              )}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <Mic className="w-5 h-5 text-teal-600" />
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  {t('settings.enableVoice', 'Enable Microphone Voice Input')}
                </div>
                <div className="text-xs text-slate-500">Speak queries in {currentLanguage.nativeName}</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={voiceEnabled}
              onChange={(e) => setVoiceEnabled(e.target.checked)}
              className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  {t('settings.enableTTS', 'Enable Text-to-Speech (Audio Read-Aloud)')}
                </div>
                <div className="text-xs text-slate-500">Listen to cards in {currentLanguage.nativeName}</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={textToSpeechEnabled}
              onChange={(e) => setTextToSpeechEnabled(e.target.checked)}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Test Speech button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => speakText(sampleSimple)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-100 text-teal-800 text-xs font-semibold hover:bg-teal-200 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Test Audio Read-Aloud (आवाज़ का परीक्षण करें)</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} className="flex items-center gap-2 px-6 py-3">
          <Save className="w-4 h-4" />
          <span>{t('settings.savePreferences', 'Save Language & Accessibility Settings')}</span>
        </Button>
      </div>
    </div>
  );
};
