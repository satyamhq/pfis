import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import {
  User,
  Building2,
  Stethoscope,
  HeartHandshake,
  Landmark,
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface OnboardingModalProps {
  email: string;
  name?: string;
  avatarUrl?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

type PublicRole = 'patient' | 'hospital' | 'doctor' | 'asha' | 'government';

interface RoleOption {
  id: PublicRole;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  accentBorder: string;
  icon: React.ReactNode;
  description: string;
  highlights: string[];
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  email,
  name,
  avatarUrl,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const { setAuthSession } = useAuth();

  const [selectedRole, setSelectedRole] = useState<PublicRole>('patient');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Role-specific fields
  const [department, setDepartment] = useState('Cardiology & General Medicine');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [hospitalAffiliation, setHospitalAffiliation] = useState('Civil Hospital Phagwara');

  const [villageName, setVillageName] = useState('Mehli');
  const [district, setDistrict] = useState('Kapurthala');
  const [phc, setPhc] = useState('CHC Phagwara');

  const [officialDesignation, setOfficialDesignation] = useState('District Chief Medical Officer (CMO)');
  const [jurisdictionLevel, setJurisdictionLevel] = useState<'DISTRICT' | 'STATE'>('DISTRICT');

  const [hospitalName, setHospitalName] = useState('Metro District Medical Center');
  const [hospitalType, setHospitalType] = useState('Public Civil Hospital');

  const [patientAge, setPatientAge] = useState('38');
  const [patientCity, setPatientCity] = useState('Phagwara');
  const [patientLanguage, setPatientLanguage] = useState('Hindi');

  const roleOptions: RoleOption[] = [
    {
      id: 'patient',
      title: 'Patient & Citizen',
      tagline: 'Book OPD tokens, find doctors, and get travel help',
      badge: 'Public Care',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      accentBorder: 'border-emerald-500 ring-emerald-500/20 bg-emerald-50/40',
      icon: <User className="w-6 h-6 text-emerald-600" />,
      description: 'Find verified nearby hospitals, book doctor tokens from home, and request free community travel shuttles.',
      highlights: [
        '1-Click OPD Token Booking',
        'Nearby Hospitals & Doctor Schedules',
        'Free Bus & Travel Assistance',
      ],
    },
    {
      id: 'doctor',
      title: 'Doctor & Clinician',
      tagline: 'View daily patient queue and travel barrier alerts',
      badge: 'Clinical Care',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      accentBorder: 'border-purple-500 ring-purple-500/20 bg-purple-50/40',
      icon: <Stethoscope className="w-6 h-6 text-purple-600" />,
      description: 'See today\'s assigned patients with actionable alerts on travel distance, language, and missed follow-up risks.',
      highlights: [
        'Daily Patient Queue & OPD Roster',
        'Non-Clinical Barrier Highlights',
        '1-Click ASHA Follow-up Coordination',
      ],
    },
    {
      id: 'asha',
      title: 'ASHA Field Worker',
      tagline: 'Help village families and coordinate transport',
      badge: 'Community Frontline',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      accentBorder: 'border-rose-500 ring-rose-500/20 bg-rose-50/40',
      icon: <HeartHandshake className="w-6 h-6 text-rose-600" />,
      description: 'Support local households, log access barriers, and arrange morning bus shuttles or hospital escorts.',
      highlights: [
        'Village Household Registry',
        '1-Tap Barrier Logger',
        'Doorstep Transit & Escort Dispatch',
      ],
    },
    {
      id: 'hospital',
      title: 'Hospital Facility',
      tagline: 'Manage doctor rosters, token seats, and intake queue',
      badge: 'Hospital Ops',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      accentBorder: 'border-blue-500 ring-blue-500/20 bg-blue-50/40',
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      description: 'Triage patient requests, configure duty doctors and departments, and balance daily OPD token quotas.',
      highlights: [
        'Live Triage Queue & Review',
        'Doctor & Department Capacity',
        '24/7 Emergency & Bed Status',
      ],
    },
    {
      id: 'government',
      title: 'Health Official',
      tagline: 'Monitor district health access and plan interventions',
      badge: 'District Health',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      accentBorder: 'border-teal-500 ring-teal-500/20 bg-teal-50/40',
      icon: <Landmark className="w-6 h-6 text-teal-600" />,
      description: 'Review district drop-offs across rural areas, track diagnostic deserts, and plan targeted mobile vans.',
      highlights: [
        'District Access Heat-Maps',
        '5-Stage Care Drop-Off Tracking',
        'Intervention Policy Simulators',
      ],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Assemble extra profile data based on selected role
    let profileData: any = {};
    if (selectedRole === 'doctor') {
      profileData = {
        department,
        registrationNumber: registrationNumber || 'MCI-REG-VERIFIED',
        hospitalAffiliation,
        qualification: 'MBBS, MD',
      };
    } else if (selectedRole === 'asha') {
      profileData = {
        assignedVillage: villageName,
        district,
        state: 'Punjab',
        primaryHealthCenter: phc,
        workerId: `ASHA-${villageName.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      };
    } else if (selectedRole === 'government') {
      profileData = {
        officialDesignation,
        jurisdictionLevel,
        district,
        state: 'Punjab',
        department: 'District Health & Family Welfare Department',
      };
    } else if (selectedRole === 'hospital') {
      profileData = {
        name: hospitalName,
        type: hospitalType,
        city: patientCity,
        state: 'Punjab',
      };
    } else if (selectedRole === 'patient') {
      profileData = {
        age: parseInt(patientAge, 10) || 38,
        city: patientCity,
        preferredLanguage: patientLanguage,
        state: 'Punjab',
      };
    }

    try {
      const res = await authService.completeOnboarding({
        email,
        name: name || email.split('@')[0],
        avatarUrl,
        role: selectedRole,
        profileData,
      });

      if (res.success && res.token && res.user) {
        setAuthSession(res.token, res.user, res.profile);
        if (onSuccess) {
          onSuccess();
        } else {
          // Route directly to the corresponding dashboard
          switch (res.user.role) {
            case 'doctor':
              navigate('/doctor/dashboard', { replace: true });
              break;
            case 'asha':
              navigate('/asha/dashboard', { replace: true });
              break;
            case 'government':
              navigate('/government/dashboard', { replace: true });
              break;
            case 'hospital':
              navigate('/hospital/dashboard', { replace: true });
              break;
            case 'admin':
              navigate('/admin/dashboard', { replace: true });
              break;
            case 'patient':
            default:
              navigate('/patient/dashboard', { replace: true });
              break;
          }
        }
      } else {
        setError(res.message || 'Onboarding failed. Please try again.');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to complete onboarding. Please verify your details.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Quick Account Setup
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Welcome to PFIS! How will you use this platform?
                </h2>
              </div>
            </div>
            {email && (
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-200">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-[10px] font-bold text-white">
                    {(name || email)[0].toUpperCase()}
                  </div>
                )}
                <span className="font-medium truncate max-w-[200px]">{email}</span>
              </div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">
            Choose how you'll use PFIS below. We'll customize your dashboard with the exact tools you need.
          </p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold">Notice</p>
                <p className="mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Role Cards Grid (Strictly 5 public roles - Admin is isolated) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Your Account Type <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                Click 1 option to continue
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {roleOptions.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                      isSelected
                        ? `${role.accentBorder} border-teal-500 shadow-md ring-2`
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 text-teal-600">
                        <CheckCircle2 className="w-5 h-5 fill-teal-600 text-white" />
                      </div>
                    )}

                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                          {role.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">
                            {role.title}
                          </h4>
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mt-0.5 ${role.badgeColor}`}>
                            {role.badge}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {role.description}
                      </p>

                      <ul className="space-y-1 pt-2 border-t border-slate-100">
                        {role.highlights.map((h, i) => (
                          <li key={i} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                            <span className="text-teal-600 font-bold">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Role-Specific Quick Setup Fields */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>
                Quick Profile Setup for{' '}
                <strong className="text-teal-700 capitalize">
                  {roleOptions.find((r) => r.id === selectedRole)?.title}
                </strong>
              </span>
            </div>

            {selectedRole === 'patient' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Age</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. 38"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">City / Town</label>
                  <input
                    type="text"
                    value={patientCity}
                    onChange={(e) => setPatientCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. Phagwara"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Preferred Language</label>
                  <select
                    value={patientLanguage}
                    onChange={(e) => setPatientLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="Hindi">Hindi</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="English">English</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </div>
              </div>
            )}

            {selectedRole === 'doctor' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Medical Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="Cardiology & General Medicine">Cardiology & General Medicine</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Gynecology">Gynecology</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Medical Reg. Number</label>
                  <input
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. MCI-PB-2018-0924"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Hospital Affiliation</label>
                  <input
                    type="text"
                    value={hospitalAffiliation}
                    onChange={(e) => setHospitalAffiliation(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. Civil Hospital Phagwara"
                  />
                </div>
              </div>
            )}

            {selectedRole === 'asha' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Assigned Village</label>
                  <input
                    type="text"
                    value={villageName}
                    onChange={(e) => setVillageName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. Mehli"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. Kapurthala"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Primary Health Center (PHC)</label>
                  <input
                    type="text"
                    value={phc}
                    onChange={(e) => setPhc(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. CHC Phagwara"
                  />
                </div>
              </div>
            )}

            {selectedRole === 'government' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Official Designation</label>
                  <input
                    type="text"
                    value={officialDesignation}
                    onChange={(e) => setOfficialDesignation(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. District Chief Medical Officer"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Jurisdiction Level</label>
                  <select
                    value={jurisdictionLevel}
                    onChange={(e) => setJurisdictionLevel(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="DISTRICT">District Level</option>
                    <option value="STATE">State / Regional Level</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Assigned District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. Kapurthala"
                  />
                </div>
              </div>
            )}

            {selectedRole === 'hospital' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Facility Name</label>
                  <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="e.g. Metro District Medical Center"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Facility Classification</label>
                  <select
                    value={hospitalType}
                    onChange={(e) => setHospitalType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="Public Civil Hospital">Public Civil Hospital</option>
                    <option value="Private Multispecialty">Private Multispecialty</option>
                    <option value="Community Health Center">Community Health Center (CHC)</option>
                    <option value="Sub-Divisional Hospital">Sub-Divisional Hospital</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Security Notice: Admin role isolation */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong>Security Protocol:</strong> The <em>Executive Administrator</em> role is strictly restricted to pre-authorized institutional accounts and cannot be requested during onboarding. Unauthorized attempts are rejected automatically.
            </span>
          </div>

          {/* Submission Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>DPDP-compliant encrypted identity provision</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Configuring Your Dashboard...</span>
                </>
              ) : (
                <>
                  <span>Complete Setup & Launch Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
