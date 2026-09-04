import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { patientService } from '../../services/patientService';
import { hospitalService } from '../../services/hospitalService';
import { documentService } from '../../services/documentService';
import { Patient, FrictionProfile, CareRisk, HospitalRequest, PatientDocument, Hospital } from '../../types';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { CompletionGauge } from '../../components/charts/CompletionGauge';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { TTSButton } from '../../components/common/TTSButton';
import { SimpleModeToggle } from '../../components/common/SimpleModeToggle';
import {
  Sparkles,
  ShieldAlert,
  MapPin,
  Building2,
  FileText,
  ListOrdered,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FolderLock,
  Plus,
  Laptop,
  Activity,
  CheckCircle2,
  Clock,
  UserCheck,
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { simpleLanguageMode, currentLanguage } = useLanguage();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [frictionProfile, setFrictionProfile] = useState<FrictionProfile | null>(null);
  const [careRisk, setCareRisk] = useState<CareRisk | null>(null);
  const [activeRequests, setActiveRequests] = useState<HospitalRequest[]>([]);
  const [recentDocs, setRecentDocs] = useState<PatientDocument[]>([]);
  const [nearestHospital, setNearestHospital] = useState<Hospital | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      try {
        const pRes = await patientService.getMe();
        if (pRes.success) {
          setPatient(pRes.patient);
          setActiveRequests(pRes.activeRequests || []);
        }

        const fRes = await patientService.getFrictionProfile();
        if (fRes.success) setFrictionProfile(fRes.frictionProfile);

        const rRes = await patientService.getAccessibilityRisk();
        if (rRes.success) setCareRisk(rRes.careRisk);

        const dRes = await documentService.getPatientDocuments();
        if (dRes.success) setRecentDocs(dRes.documents.slice(0, 3));

        // Fetch nearest hospital
        const lat = pRes.patient?.location?.latitude || 31.224;
        const lng = pRes.patient?.location?.longitude || 75.7729;
        const hRes = await hospitalService.getNearby({ lat, lng, radiusKm: 100 });
        if (hRes.success && hRes.hospitals.length > 0) {
          setNearestHospital(hRes.hospitals[0]);
        }
      } catch (e) {
        console.error('[PatientDashboard Error]', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton rows={3} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <LoadingSkeleton rows={2} />
          <LoadingSkeleton rows={2} />
          <LoadingSkeleton rows={2} />
          <LoadingSkeleton rows={2} />
        </div>
      </div>
    );
  }

  const accessibilityScore = frictionProfile?.overallAccessibilityScore ?? 78;
  const completionProbability = careRisk?.careCompletionProbability ?? 82;
  const riskCategory = careRisk?.riskCategory ?? 'LOW';
  const topBarrier = frictionProfile?.topBarrier ?? 'Transport Availability';

  // Simple language explanation
  const getSimpleExplanation = () => {
    if (riskCategory === 'CRITICAL' || riskCategory === 'HIGH') {
      return t('simple.accessibilityHigh', 'Getting to the hospital and completing treatment may be difficult for you.');
    }
    if (riskCategory === 'MODERATE') {
      return t('simple.accessibilityMedium', 'You can reach the hospital, but you may face some travel or cost difficulties.');
    }
    return t('simple.accessibilityLow', 'You have good transport and support to easily reach the hospital.');
  };

  const getTopBarrierSimple = () => {
    const tb = topBarrier.toLowerCase();
    if (tb.includes('transport')) return t('simple.topBarrierTransport', 'It is hard to find a bus or ride to the hospital.');
    if (tb.includes('travel') || tb.includes('distance')) return t('simple.topBarrierDistance', 'The hospital is far from your home.');
    if (tb.includes('cost') || tb.includes('financial')) return t('simple.topBarrierCost', 'Travel tickets and medicines cost too much.');
    if (tb.includes('timing') || tb.includes('wage')) return t('simple.topBarrierTiming', 'Going in the morning means losing daily work and food wages.');
    if (tb.includes('digital')) return t('simple.topBarrierDigital', 'It is hard to book tokens on a smartphone.');
    if (tb.includes('document')) return t('simple.topBarrierPaperwork', 'You need help with your Ayushman Bharat health card paperwork.');
    return getSimpleExplanation();
  };

  const dashboardExplanation = simpleLanguageMode
    ? `${getSimpleExplanation()} ${getTopBarrierSimple()}`
    : frictionProfile?.explanation ||
      'Accessibility is influenced primarily by geographic travel distance, transport options, and daily wage commitments.';

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header Profile Greeting Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-card flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('patient.welcome', 'Welcome')}, {user?.name}
            </h1>
            {patient?.patientCode && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold border border-slate-200 dark:border-slate-700">
                {patient.patientCode}
              </span>
            )}
            <StatusBadge status={riskCategory === 'CRITICAL' ? 'CRITICAL' : riskCategory === 'HIGH' ? 'HIGH' : 'ACTIVE'} size="sm" />
            <TTSButton text={`${t('patient.welcome')} ${user?.name}. ${dashboardExplanation}`} />
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              {patient?.location?.address || 'Civil Lines'}, {patient?.location?.city || 'Phagwara'}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>{t('common.language', 'Language')}: <strong>{currentLanguage.nativeName}</strong></span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <SimpleModeToggle />
          <Link to="/patient/profile">
            <Button variant="outline" size="sm">
              {t('patient.editProfile', 'Edit Profile')}
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Primary 1-Click Patient Healthcare Action Hub */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-600" /> Quick Patient Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Find Hospitals & Doctors */}
          <Link
            to="/patient/hospitals"
            className="p-5 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg shadow-teal-500/10 hover:shadow-xl hover:scale-[1.02] transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base leading-tight">Find Hospitals & Doctors</h3>
              <p className="text-xs text-teal-100 leading-relaxed">
                View on-duty doctors, available OPD token seats, and bed capacity near you.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-teal-100 group-hover:text-white">
              <span>Find Nearby</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Live Video Teleconsultation */}
          <Link
            to="/patient/teleconsult"
            className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/10 hover:shadow-xl hover:scale-[1.02] transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base leading-tight">Live Teleconsultation</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Connect instantly via video with duty doctors from home with live translation.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-blue-100 group-hover:text-white">
              <span>Start Video Call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Friction Digital Twin */}
          <Link
            to="/patient/digital-twin"
            className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:scale-[1.02] transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base leading-tight">Friction Digital Twin</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Simulate your 7-step travel journey and see how shuttles and ASHA escorts save time.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-100 group-hover:text-white">
              <span>Simulate Journey</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Document Vault */}
          <Link
            to="/patient/documents"
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-lg shadow-slate-900/10 hover:shadow-xl hover:scale-[1.02] transition-all flex flex-col justify-between space-y-4 group border border-slate-700"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white backdrop-blur-xs">
                <FolderLock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base leading-tight">Document Vault</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Securely store your Ayushman Bharat card, prescription slips, and lab reports.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-white">
              <span>View Documents</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* 3. 4 Key Friction Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('patient.accessibilityScore', 'Healthcare Accessibility')}
          value={`${accessibilityScore} / 100`}
          subtitle={t('patient.accessibilityScoreDesc', 'Non-clinical accessibility score')}
          icon={TrendingUp}
          badge={accessibilityScore >= 70 ? t('common.optimal', 'Optimal') : accessibilityScore >= 50 ? t('common.moderate', 'Moderate') : t('common.high', 'Constrained')}
          badgeType={accessibilityScore >= 70 ? 'success' : accessibilityScore >= 50 ? 'warning' : 'danger'}
        />

        <StatCard
          title={t('patient.completionProb', 'Care Completion Prob.')}
          value={`${completionProbability}%`}
          subtitle={t('patient.completionProbDesc', 'Estimated journey completion forecast')}
          icon={Sparkles}
          iconColor="text-teal-600 bg-teal-50 border-teal-100 dark:bg-teal-950/40"
          badge={`${completionProbability}%`}
          badgeType={completionProbability >= 70 ? 'success' : completionProbability >= 50 ? 'warning' : 'danger'}
        />

        <StatCard
          title={t('patient.accessibilityRisk', 'Accessibility Risk')}
          value={riskCategory}
          subtitle={t('patient.accessibilityRiskDesc', 'Estimated operational barrier risk')}
          icon={ShieldAlert}
          iconColor={riskCategory === 'CRITICAL' ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-amber-600 bg-amber-50 border-amber-100'}
          badge={riskCategory}
          badgeType={riskCategory === 'CRITICAL' ? 'danger' : riskCategory === 'HIGH' ? 'danger' : 'success'}
        />

        <StatCard
          title={t('patient.primaryBarrier', 'Primary Barrier')}
          value={topBarrier.split(' ')[0]}
          subtitle={topBarrier}
          icon={AlertTriangle}
          iconColor="text-orange-600 bg-orange-50 border-orange-100 dark:bg-orange-950/40"
          badge="High Barrier"
          badgeType="warning"
        />
      </div>

      {/* 4. Center 2-Column: Intelligence & Nearest Facility */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Gauge & Friction Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t('patient.explainableIntelligence', 'Explainable Accessibility Intelligence')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('patient.explainableDesc', 'How socio-geographic factors shape your estimated healthcare completion')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TTSButton text={dashboardExplanation} />
                <Link to="/patient/friction">
                  <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                    {t('patient.radarBtn', 'Detailed Radar')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div className="sm:col-span-1 flex justify-center">
                <CompletionGauge
                  score={completionProbability}
                  size={160}
                  label="Completion Forecast"
                  sublabel="Operational index"
                />
              </div>

              <div className="sm:col-span-2 space-y-3 text-xs">
                <div className={`p-4 rounded-2xl border space-y-1.5 ${
                  simpleLanguageMode
                    ? 'bg-amber-50/80 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  <p className="font-bold text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {simpleLanguageMode ? 'सरल भाषा विश्लेषण (Simple Summary):' : 'Deterministic Operational Diagnosis:'}
                  </p>
                  <p className="leading-relaxed">{dashboardExplanation}</p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Link to="/patient/risk" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      {t('patient.bottleneckAnalysis', 'View Journey Bottleneck Analysis')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Active Patient Requests Ledger */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t('patient.activeRequests', 'Active Hospital Requests')}
                </h3>
              </div>
              <Link to="/patient/requests" className="text-xs font-semibold text-teal-600 hover:text-teal-700">
                {t('patient.viewAll', 'View All')} ({activeRequests.length})
              </Link>
            </div>

            {activeRequests.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 space-y-3">
                <p>No active hospital intake requests.</p>
                <Link to="/patient/hospitals">
                  <Button variant="primary" size="sm">
                    Find Hospital & Book Slot
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {activeRequests.map((req) => (
                  <Link
                    key={req._id}
                    to={`/patient/requests/${req._id}`}
                    className="block p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-all text-xs space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block">{req.requestCode}</span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {(req.hospitalId as any)?.name || 'Civil Hospital'}
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Department: {req.departmentName}</p>
                      </div>
                      <StatusBadge status={req.status} size="sm" />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span>Reason: {req.reasonForVisit}</span>
                      <span className="font-semibold text-teal-700 dark:text-teal-400">
                        {req.distanceKm ? `${req.distanceKm} km transit` : 'Nearby'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Nearest Hospital Card & Document Vault */}
        <div className="space-y-6">
          {/* Nearest Hospital Card with Doctors */}
          {nearestHospital && (
            <div className="bg-gradient-to-tr from-slate-900 via-slate-800 to-navy-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" /> {t('patient.nearestFacility', 'Nearest Verified Facility')}
                </span>
                <span className="text-[10px] bg-teal-950 text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-800 font-bold uppercase">
                  {nearestHospital.type}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-lg text-white">{nearestHospital.name}</h4>
                <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  {nearestHospital.address}, {nearestHospital.city}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">{t('hospital.distance', 'Distance')}:</span>
                  <span className="font-bold text-teal-300">{nearestHospital.distanceKm || 4.2} km away</span>
                </div>
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Emergency:</span>
                  <span className="font-bold text-emerald-300">
                    {nearestHospital.emergencyAvailable ? '24/7 Active' : 'OPD Hours'}
                  </span>
                </div>
              </div>

              <Link to={`/patient/hospitals/${nearestHospital._id}`} className="block pt-1">
                <Button variant="primary" size="sm" className="w-full">
                  {t('patient.viewHospitalAndRequest', 'View Hospital & Doctors')}
                </Button>
              </Link>
            </div>
          )}

          {/* Document Vault Quick Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FolderLock className="w-4 h-4 text-teal-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t('patient.documentVault', 'Medical Records Vault')}
                </h4>
              </div>
              <Link to="/patient/documents" className="text-xs font-semibold text-teal-600 hover:text-teal-700">
                {t('common.view', 'View All')}
              </Link>
            </div>

            {recentDocs.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                Upload your Ayushman Bharat card and prescriptions for 1-click hospital intake.
              </div>
            ) : (
              <div className="space-y-2">
                {recentDocs.map((doc) => (
                  <div
                    key={doc._id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate">{doc.title}</span>
                    </div>
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md font-bold">
                      {doc.type}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Link to="/patient/documents" className="block">
              <Button variant="outline" size="sm" className="w-full text-xs" icon={<Plus className="w-3.5 h-3.5" />}>
                {t('patient.uploadRecord', 'Upload Medical Record')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
