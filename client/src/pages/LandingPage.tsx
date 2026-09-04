import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  MapPin,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Bus,
  FileCheck2,
  Users2,
  Coins,
  Clock,
  Laptop,
  Languages,
  Building2,
  Cpu,
  AlertCircle,
  Shield,
  ShieldAlert,
  Lock,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { TTSButton } from '../components/common/TTSButton';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, login } = useAuth();
  const navigate = useNavigate();

  const handleQuickDemoLogin = async (email: string, pass: string, redirectUrl: string) => {
    try {
      await login(email, pass);
      navigate(redirectUrl);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 bg-gradient-to-b from-teal-50/70 via-white to-slate-50 border-b border-slate-200/80">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d94880a_1px,transparent_1px),linear-gradient(to_bottom,#0d94880a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/80 shadow-xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{t('landing.heroTag', 'National Healthcare Accessibility Platform • Non-Clinical AI')}</span>
            </div>

            {/* Hero Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {t('landing.heroTitle1', 'Healthcare may be available.')}{' '}
              <span className="bg-gradient-to-r from-brand-600 via-teal-600 to-teal-500 bg-clip-text text-transparent block mt-1">
                {t('landing.heroTitle2', 'But is it actually accessible?')}
              </span>
            </h1>

            {/* Subheading with Audio Read */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {t(
                  'landing.heroSubtitle',
                  'PFIS identifies the practical barriers—from transit deficits and documentation gaps to wage loss—that prevent patients from completing care, helping healthcare systems choose high-impact interventions.'
                )}
              </p>
              <TTSButton
                text={`${t('landing.heroTitle1')} ${t('landing.heroTitle2')} ${t('landing.heroSubtitle')}`}
                label={t('common.listen', 'Listen')}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-4 w-full">
              <Link to="/patient/hospitals" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md shadow-teal-600/20" icon={<MapPin className="w-5 h-5" />}>
                  {t('landing.findHospitals', 'Find Nearby Hospitals')}
                </Button>
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link to="/login?role=admin" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto" icon={<Shield className="w-4 h-4 text-purple-600" />}>
                      Admin Sign In
                    </Button>
                  </Link>
                  <Link to="/login?role=hospital" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto" icon={<Building2 className="w-4 h-4 text-indigo-600" />}>
                      {t('landing.hospitalPortal', 'Hospital Portal')}
                    </Button>
                  </Link>
                  <Link to="/login?role=patient" className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      {t('landing.patientLogin', 'Patient Portal')}
                    </Button>
                  </Link>
                </>
              ) : (
                <Link
                  to={
                    user?.role === 'patient'
                      ? '/patient/dashboard'
                      : user?.role === 'hospital'
                      ? '/hospital/dashboard'
                      : user?.role === 'doctor'
                      ? '/doctor/dashboard'
                      : user?.role === 'asha'
                      ? '/asha/dashboard'
                      : user?.role === 'government'
                      ? '/government/dashboard'
                      : '/admin/dashboard'
                  }
                  className="w-full sm:w-auto"
                >
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto" icon={<ArrowRight className="w-4 h-4" />}>
                    {t('landing.goToDashboard', 'Go to Your Dashboard')}
                  </Button>
                </Link>
              )}
            </div>

            {/* 1-Click Instant Demo Launcher Bar (All 6 Roles) */}
            <div className="pt-8 max-w-4xl mx-auto">
              <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-card border border-slate-200/90 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs border-b border-slate-100 pb-3">
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-600" />{' '}
                    <span>Universal Cadre Access — 1-Click Instant Demo Login:</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">Pre-seeded operational profiles</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  <button
                    onClick={() =>
                      handleQuickDemoLogin('patient@pfis.org', 'Patient@123', '/patient/dashboard')
                    }
                    className="p-2.5 bg-slate-50 hover:bg-emerald-50/80 rounded-xl text-left border border-slate-200 hover:border-emerald-400 transition-all text-xs group cursor-pointer"
                  >
                    <p className="font-bold text-slate-800 group-hover:text-emerald-700 flex items-center justify-between">
                      Patient <ArrowRight className="w-3 h-3 text-emerald-600 shrink-0" />
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">Sunita Devi</p>
                  </button>

                  <button
                    onClick={() =>
                      handleQuickDemoLogin('hospital@apollo.org', 'Hospital@123', '/hospital/dashboard')
                    }
                    className="p-2.5 bg-slate-50 hover:bg-indigo-50/80 rounded-xl text-left border border-slate-200 hover:border-indigo-400 transition-all text-xs group cursor-pointer"
                  >
                    <p className="font-bold text-slate-800 group-hover:text-indigo-700 flex items-center justify-between">
                      Hospital <ArrowRight className="w-3 h-3 text-indigo-600 shrink-0" />
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">Apollo Triage Desk</p>
                  </button>

                  <button
                    onClick={() =>
                      handleQuickDemoLogin('doctor@pfis.org', 'Doctor@123', '/doctor/dashboard')
                    }
                    className="p-2.5 bg-slate-50 hover:bg-teal-50/80 rounded-xl text-left border border-slate-200 hover:border-teal-400 transition-all text-xs group cursor-pointer"
                  >
                    <p className="font-bold text-slate-800 group-hover:text-teal-700 flex items-center justify-between">
                      Doctor <ArrowRight className="w-3 h-3 text-teal-600 shrink-0" />
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">Dr. Rajesh Sharma</p>
                  </button>

                  <button
                    onClick={() =>
                      handleQuickDemoLogin('asha@pfis.org', 'Asha@123', '/asha/dashboard')
                    }
                    className="p-2.5 bg-slate-50 hover:bg-amber-50/80 rounded-xl text-left border border-slate-200 hover:border-amber-400 transition-all text-xs group cursor-pointer"
                  >
                    <p className="font-bold text-slate-800 group-hover:text-amber-700 flex items-center justify-between">
                      ASHA <ArrowRight className="w-3 h-3 text-amber-600 shrink-0" />
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">Kamla Devi (Mehli)</p>
                  </button>

                  <button
                    onClick={() =>
                      handleQuickDemoLogin('government@pfis.org', 'Govt@123', '/government/dashboard')
                    }
                    className="p-2.5 bg-slate-50 hover:bg-blue-50/80 rounded-xl text-left border border-slate-200 hover:border-blue-400 transition-all text-xs group cursor-pointer"
                  >
                    <p className="font-bold text-slate-800 group-hover:text-blue-700 flex items-center justify-between">
                      Govt CMO <ArrowRight className="w-3 h-3 text-blue-600 shrink-0" />
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">Dr. Arvind Verma</p>
                  </button>

                  <button
                    onClick={() =>
                      handleQuickDemoLogin('admin@pfis.org', 'Admin@123', '/admin/dashboard')
                    }
                    className="p-2.5 bg-slate-50 hover:bg-purple-50/80 rounded-xl text-left border border-slate-200 hover:border-purple-400 transition-all text-xs group cursor-pointer"
                  >
                    <p className="font-bold text-slate-800 group-hover:text-purple-700 flex items-center justify-between">
                      Admin <ArrowRight className="w-3 h-3 text-purple-600 shrink-0" />
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">Executive Suite</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CORE PROBLEM VS PFIS SOLUTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{t('landing.problemTag', 'The Invisible Healthcare Bottleneck')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t('landing.problemTitle', 'Why 74% of patient dropouts happen before the doctor consultation.')}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t(
                'landing.problemDesc',
                'Traditional healthcare software assumes building a hospital is enough. Vulnerable patients encounter severe non-clinical friction:'
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <Bus className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">{t('landing.transportDeficit', 'Transport Deficits (36%)')}</strong>
                  <span className="text-slate-500">
                    {t('landing.transportDeficitDesc', 'No direct rural buses or unaffordable private auto fares over 40+ km distances.')}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <Coins className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">{t('landing.wageLoss', 'Daily Wage Loss (21%)')}</strong>
                  <span className="text-slate-500">
                    {t('landing.wageLossDesc', 'Rigid morning queues force daily wage earners to sacrifice essential food income.')}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <Laptop className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">{t('landing.digitalExclusion', 'Digital Exclusion')}</strong>
                  <span className="text-slate-500">
                    {t('landing.digitalExclusionDesc', 'Feature phone users unable to navigate smartphone apps or scan token QR codes.')}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <FileCheck2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">{t('landing.paperworkGaps', 'Scheme Paperwork Gaps')}</strong>
                  <span className="text-slate-500">
                    {t('landing.paperworkGapsDesc', 'Missing identity links preventing cashless Ayushman Bharat (PM-JAY) claims.')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Highlight Visual Card */}
          <div className="bg-white text-slate-800 rounded-3xl p-7 sm:p-9 shadow-xl shadow-slate-200/60 border border-slate-200/90 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-black shadow-xs">
                  8D
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Deterministic Friction Engine</h4>
                  <p className="text-[11px] text-teal-700 font-medium">Explainable Multi-Factor Scoring</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold border border-teal-200">
                Non-Blackbox
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              PFIS evaluates 8 distinct socio-geographic vectors without ever making unverified medical
              claims. Every friction score provides transparent mathematical rationale:
            </p>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">Travel Distance & Terrain</span>
                  <span className="font-bold text-rose-600">82 / 100 (Critical)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[82%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">Public Transit Availability</span>
                  <span className="font-bold text-amber-600">75 / 100 (High)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[75%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">Family & Caregiver Support</span>
                  <span className="font-bold text-amber-600">65 / 100 (Moderate)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[65%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">Digital Access & Literacy</span>
                  <span className="font-bold text-emerald-600">30 / 100 (Low)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[30%]" />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Est. Care Completion Probability:</span>
              <span className="text-lg font-black text-teal-700">38% (High Dropout Risk)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW PFIS WORKS (THE 8 DIMENSIONS) */}
      <section className="bg-slate-100/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('landing.eightDimensions', 'The 8 Dimensions of Healthcare Accessibility')}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              PFIS systematically quantifies friction across the entire non-clinical access envelope.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: MapPin,
                title: 'Travel Distance',
                desc: 'Haversine & road transit distance from rural habitations to specialized centers.',
                color: 'text-teal-600 bg-teal-50 border-teal-200',
              },
              {
                icon: Bus,
                title: 'Transport Availability',
                desc: 'Reliability of public buses, shared autos, and frequency of village transit.',
                color: 'text-rose-600 bg-rose-50 border-rose-200',
              },
              {
                icon: Laptop,
                title: 'Digital Access',
                desc: 'Smartphone literacy, network connectivity, and online slot booking familiarity.',
                color: 'text-blue-600 bg-blue-50 border-blue-200',
              },
              {
                icon: Languages,
                title: 'Language & Dialect',
                desc: 'Alignment between patient native dialect (e.g. Santali/Bhojpuri) and facility staff.',
                color: 'text-amber-600 bg-amber-50 border-amber-200',
              },
              {
                icon: Users2,
                title: 'Family & Caregiver',
                desc: 'Availability of family escorts to assist vulnerable or elderly patients in queues.',
                color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
              },
              {
                icon: FileCheck2,
                title: 'Documentation Status',
                desc: 'Completeness of Ayushman Bharat (PM-JAY) cards, past prescriptions, and referrals.',
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
              },
              {
                icon: Coins,
                title: 'Cost Burden',
                desc: 'Indirect out-of-pocket expenses including travel tickets, food, and medicine fees.',
                color: 'text-orange-600 bg-orange-50 border-orange-200',
              },
              {
                icon: Clock,
                title: 'Appointment Timing',
                desc: 'Flexibility of morning OPD hours vs daily wage earning shifts and evening availability.',
                color: 'text-purple-600 bg-purple-50 border-purple-200',
              },
            ].map((dim) => {
              const Icon = dim.icon;
              return (
                <div
                  key={dim.title}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${dim.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{dim.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{dim.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. THE COMPLETE 9-STAGE PATIENT JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('landing.nineStages', 'The 9-Stage Healthcare Journey')}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            From the initial symptom recognition to 30-day post-treatment follow-up, PFIS highlights
            where patients get stuck and recommends timely operational interventions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 sm:gap-3">
          {[
            { step: '01', title: 'Medical Need', desc: 'Symptom recognized' },
            { step: '02', title: 'Hospital Search', desc: 'Facility discovery' },
            { step: '03', title: 'Travel', desc: 'Geographic transit' },
            { step: '04', title: 'Transport', desc: 'Bus / Auto commute' },
            { step: '05', title: 'Appointment', desc: 'Queue & slot booking' },
            { step: '06', title: 'Hospital Visit', desc: 'Desk registration' },
            { step: '07', title: 'Service', desc: 'Diagnostic testing' },
            { step: '08', title: 'Treatment', desc: 'Doctor consultation' },
            { step: '09', title: 'Follow-up', desc: 'Post-discharge regimen' },
          ].map((item, idx) => (
            <div
              key={item.step}
              className={`p-3 sm:p-3.5 rounded-xl border text-center space-y-1 sm:space-y-1.5 ${
                idx === 2 || idx === 3
                  ? 'bg-rose-50/60 border-rose-200'
                  : idx === 0 || idx === 1
                  ? 'bg-teal-50/60 border-teal-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <span className="text-[10px] font-extrabold text-slate-400 block">{item.step}</span>
              <h5 className="font-bold text-xs text-slate-900">{item.title}</h5>
              <p className="text-[10px] text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHAT-IF SIMULATOR & INTERVENTION OPTIMIZER SHOWCASE */}
      <section className="bg-gradient-to-br from-teal-50/80 via-emerald-50/40 to-slate-50 text-slate-900 py-8 sm:py-16 rounded-2xl sm:rounded-3xl max-w-7xl mx-3 sm:mx-auto px-4 sm:px-12 shadow-lg border border-teal-200/80 space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 text-teal-800 text-xs font-bold border border-teal-200">
              <Cpu className="w-3.5 h-3.5 text-teal-700" />
              <span>Operational Simulation Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t('landing.simulatorTitle', 'Simulate high-impact community interventions with precision.')}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t(
                'landing.simulatorDesc',
                'Model the exact care completion improvement when community transport, satellite diagnostic camps, or ASHA escorts are deployed.'
              )}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/admin/simulator">
                <Button variant="primary" size="md" icon={<Sparkles className="w-4 h-4" />}>
                  {t('nav.whatIfSimulator', 'Open What-If Simulator')}
                </Button>
              </Link>
              <Link to="/admin/interventions">
                <Button variant="outline" size="md" className="text-slate-800 bg-white hover:bg-slate-50 border-slate-300">
                  {t('nav.budgetOptimizer', 'Try Budget Optimizer (₹10 Lakhs)')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Simulation Preview Card */}
          <div className="bg-white/95 rounded-2xl p-6 border border-teal-100 shadow-md space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 text-xs">
              <span className="font-bold text-teal-700">Simulation Scenario: Multi-Tier Community Support</span>
              <span className="text-[10px] text-slate-500 font-medium">Cohort: 1,000 Patients</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <span className="text-slate-600 font-medium">1. Baseline Completion Rate:</span>
                <span className="font-bold text-rose-600">37%</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs">
                <span className="text-teal-900 font-medium">+ Scheduled Community Health Shuttle:</span>
                <span className="font-bold text-teal-700">37% → 62% (+25%)</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs">
                <span className="text-teal-900 font-medium">+ Point-of-Care Satellite Diagnostic Camp:</span>
                <span className="font-bold text-teal-700">62% → 79% (+17%)</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs">
                <span className="text-teal-900 font-medium">+ ASHA Health Worker Guided Escort:</span>
                <span className="font-bold text-teal-700">79% → 89% (+10%)</span>
              </div>
            </div>

            <div className="p-3.5 bg-teal-100/70 border border-teal-200 rounded-xl text-xs flex justify-between items-center">
              <span className="text-slate-700 font-semibold">Estimated Patients Saved from Dropout:</span>
              <span className="font-black text-teal-900 text-sm">~520 Patients Helped</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ETHICAL AI & NON-CLINICAL SAFETY MANDATE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-50/70 border border-teal-200/80 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-teal-950">
                {t('landing.ethicalTitle', 'Ethical AI & Non-Clinical Safety Mandate')}
              </h3>
              <p className="text-xs text-teal-800">
                Built strictly for operational and physical healthcare access facilitation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-teal-900 leading-relaxed">
            <div className="space-y-1">
              <strong className="text-teal-950 flex items-center gap-1.5 text-sm font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Zero Disease Diagnosis</span>
              </strong>
              <p>
                PFIS does not analyze symptoms to diagnose diseases, prescribe pharmaceuticals, or act as
                an AI physician.
              </p>
            </div>

            <div className="space-y-1">
              <strong className="text-teal-950 flex items-center gap-1.5 text-sm font-bold">
                <Lock className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Patient Consent Architecture</span>
              </strong>
              <p>
                No patient data is ever transmitted to a hospital without explicit, granular patient
                authorization and immutable audit logs.
              </p>
            </div>

            <div className="space-y-1">
              <strong className="text-teal-950 flex items-center gap-1.5 text-sm font-bold">
                <BarChart3 className="w-4 h-4 text-indigo-700 shrink-0" />
                <span>Explainable Decision Science</span>
              </strong>
              <p>
                Every barrier score is derived from deterministic rules and geo-spatial metrics, eliminating
                opaque black-box hallucinations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
