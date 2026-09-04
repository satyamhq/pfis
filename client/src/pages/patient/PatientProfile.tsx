import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';
import { useLocation } from '../../context/LocationContext';
import { Patient } from '../../types';
import { Input, Select } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ErrorAlert } from '../../components/common/ErrorAlert';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { MapPin, Sparkles, CheckCircle2, User, Save, RefreshCw } from 'lucide-react';

export const PatientProfile: React.FC = () => {
  const { coords, requestCurrentLocation, isLoading: isLocLoading } = useLocation();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [age, setAge] = useState<number>(45);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [preferredLanguage, setPreferredLanguage] = useState('Hindi');
  const [phone, setPhone] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // 8 Accessibility Factors
  const [transportAvailability, setTransportAvailability] = useState<any>('low');
  const [digitalAccessLevel, setDigitalAccessLevel] = useState<any>('basic');
  const [familySupport, setFamilySupport] = useState<any>('low');
  const [documentationStatus, setDocumentationStatus] = useState<any>('partial');
  const [financialAccessibility, setFinancialAccessibility] = useState<any>('severely_constrained');
  const [appointmentFlexibility, setAppointmentFlexibility] = useState<any>('inflexible_daily_wage');
  const [residenceType, setResidenceType] = useState<any>('rural_remote');

  // Location
  const [address, setAddress] = useState('Village Ramgarh, Block B');
  const [city, setCity] = useState('Ranchi');
  const [state, setState] = useState('Jharkhand');
  const [pincode, setPincode] = useState('834001');
  const [latitude, setLatitude] = useState(23.3441);
  const [longitude, setLongitude] = useState(85.3096);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await patientService.getMe();
        if (res.success && res.patient) {
          const p = res.patient;
          setPatient(p);
          setAge(p.age || 45);
          setGender(p.gender || 'female');
          setPreferredLanguage(p.preferredLanguage || 'Hindi');
          setPhone(p.phone || '');
          setEmergencyName(p.emergencyContactName || '');
          setEmergencyPhone(p.emergencyContactPhone || '');

          setTransportAvailability(p.transportAvailability || 'low');
          setDigitalAccessLevel(p.digitalAccessLevel || 'basic');
          setFamilySupport(p.familySupport || 'low');
          setDocumentationStatus(p.documentationStatus || 'partial');
          setFinancialAccessibility(p.financialAccessibility || 'severely_constrained');
          setAppointmentFlexibility(p.appointmentFlexibility || 'inflexible_daily_wage');
          setResidenceType(p.residenceType || 'rural_remote');

          if (p.location) {
            setAddress(p.location.address || '');
            setCity(p.location.city || '');
            setState(p.location.state || '');
            setPincode(p.location.pincode || '');
            setLatitude(p.location.latitude || 23.3441);
            setLongitude(p.location.longitude || 85.3096);
          }
        }
      } catch (e: any) {
        setErrorMessage('Failed to load profile data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleUseCurrentLocation = async () => {
    await requestCurrentLocation();
    if (coords.latitude && coords.longitude) {
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
      setAddress(coords.address || 'GPS Live Location');
      if (coords.city) setCity(coords.city);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const payload: Partial<Patient> = {
        age,
        gender,
        preferredLanguage,
        phone,
        emergencyContactName: emergencyName,
        emergencyContactPhone: emergencyPhone,
        transportAvailability,
        digitalAccessLevel,
        familySupport,
        documentationStatus,
        financialAccessibility,
        appointmentFlexibility,
        residenceType,
        location: {
          address,
          city,
          state,
          pincode,
          latitude,
          longitude,
        },
      };

      const res = await patientService.updateProfile(payload);
      if (res.success) {
        setSuccessMessage(
          `Profile and Friction Metrics updated successfully! Recalculated Accessibility Score: ${res.frictionProfile.overallAccessibilityScore}/100.`
        );
        setPatient(res.patient);
      }
    } catch (e: any) {
      setErrorMessage(e.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Patient Profile</h2>
          <p className="text-xs text-slate-500">
            Configure demographic, socio-economic, and geographic parameters to evaluate personal friction
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-auto">
          ID: {patient?.patientCode || 'PAT-1048'}
        </span>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && <ErrorAlert message={errorMessage} onDismiss={() => setErrorMessage(null)} />}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Demographics */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-card space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            1. Personal Demographics & Contact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value, 10))}
              min={0}
              max={125}
              required
            />

            <Select
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              options={[
                { label: 'Female', value: 'female' },
                { label: 'Male', value: 'male' },
                { label: 'Other', value: 'other' },
              ]}
            />

            <Select
              label="Preferred Language / Mother Tongue"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              options={[
                { label: 'Hindi', value: 'Hindi' },
                { label: 'Santali', value: 'Santali' },
                { label: 'Bengali', value: 'Bengali' },
                { label: 'Mundari', value: 'Mundari' },
                { label: 'Kurukh', value: 'Kurukh' },
                { label: 'English', value: 'English' },
                { label: 'Urdu', value: 'Urdu' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />

            <Input
              label="Emergency Escort Name"
              value={emergencyName}
              onChange={(e) => setEmergencyName(e.target.value)}
              placeholder="e.g. Brother / Caregiver"
            />

            <Input
              label="Emergency Escort Phone"
              type="tel"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        {/* Section 2: Non-Clinical Accessibility Factors (Deterministic Inputs) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                2. Non-Clinical Accessibility Determinants
              </h3>
              <p className="text-[11px] text-slate-500">
                These factors directly drive your PFIS Friction Fingerprint and Risk Evaluation
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 self-start sm:self-auto">
              Engine Core
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Transportation Availability"
              value={transportAvailability}
              onChange={(e) => setTransportAvailability(e.target.value)}
              helperText="Determines transit frequency and physical transit barriers"
              options={[
                { label: 'Public Transit (Bus / Auto) Available & Reliable (15/100)', value: 'public_transit' },
                { label: 'Personal Two-Wheeler / Motorbike (20/100)', value: 'two_wheeler' },
                { label: 'Infrequent Rural Shared Jeep / Minibus (60/100)', value: 'shared_rural' },
                { label: 'Zero Direct Transit / Walking > 5km required (90/100)', value: 'no_direct_transit' },
                { label: 'Personal Four-Wheeler / Car (5/100)', value: 'car' },
              ]}
            />

            <Select
              label="Digital Health Literacy"
              value={digitalAccessLevel}
              onChange={(e) => setDigitalAccessLevel(e.target.value)}
              helperText="Capacity to engage with online tokens and video visits"
              options={[
                { label: 'Autonomous Smartphone User / Self-Bookings (10/100)', value: 'smartphone_independent' },
                { label: 'Assisted by Family Member / Caregiver (40/100)', value: 'assisted_by_family' },
                { label: 'Relies on Village Asha Worker / CSC Kiosk (70/100)', value: 'asha_assisted' },
                { label: 'Basic Feature Phone Only / No Internet (90/100)', value: 'basic_phone_only' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Family & Caregiver Support"
              value={familySupport}
              onChange={(e) => setFamilySupport(e.target.value)}
              helperText="Presence of an attendant for elderly or vulnerable visits"
              options={[
                { label: 'Full-time Attendant Available for Hospital Trips (10/100)', value: 'full_support' },
                { label: 'Partial Support: Attendant available only on weekends (45/100)', value: 'weekend_only' },
                { label: 'Solitary Patient: Must travel to hospital alone (85/100)', value: 'solitary' },
              ]}
            />

            <Select
              label="Documentation Readiness"
              value={documentationStatus}
              onChange={(e) => setDocumentationStatus(e.target.value)}
              helperText="Readiness of Aadhaar, Ayushman PM-JAY, or OPD booklets"
              options={[
                { label: 'Complete: Active Ayushman PM-JAY & Aadhaar Linked (10/100)', value: 'complete' },
                { label: 'Partial: Physical OPD card only / PM-JAY unverified (50/100)', value: 'partial' },
                { label: 'Unregistered / Missing Identification Documents (90/100)', value: 'missing_docs' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Financial & Out-of-Pocket Strain"
              value={financialAccessibility}
              onChange={(e) => setFinancialAccessibility(e.target.value)}
              helperText="Indirect out-of-pocket travel and medication expenses"
              options={[
                { label: 'Severely Constrained / Daily Wage Dependency (90/100)', value: 'severely_constrained' },
                { label: 'Moderate Budget / Strained by Unplanned Costs (50/100)', value: 'moderate_budget' },
                { label: 'Adequate Savings for Travel & Diagnostics (25/100)', value: 'adequate' },
                { label: 'Comprehensive Cashless Insurance Coverage (10/100)', value: 'insured' },
              ]}
            />

            <Select
              label="Appointment Timing Flexibility"
              value={appointmentFlexibility}
              onChange={(e) => setAppointmentFlexibility(e.target.value)}
              helperText="Impact of morning hospital queues on daily subsistence wages"
              options={[
                { label: 'Inflexible: Morning OPD results in Loss of Daily Wages (85/100)', value: 'inflexible_daily_wage' },
                { label: 'Rigid Shifts: Weekday Morning Visits penalized (60/100)', value: 'rigid_hours' },
                { label: 'Moderate: Can take half-day leave with notice (30/100)', value: 'moderate' },
                { label: 'Flexible / Retired / Self-employed (10/100)', value: 'flexible' },
              ]}
            />
          </div>
        </div>

        {/* Section 3: Geographic Habitation & Coordinates */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">3. Residence Location & Geolocation</h3>
              <p className="text-[11px] text-slate-500">Used for distance matrix and travel fatigue calculation</p>
            </div>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocLoading}
              className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl text-xs font-bold border border-teal-200 flex items-center justify-center gap-1.5 transition-colors self-stretch sm:self-auto"
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{isLocLoading ? 'Detecting...' : 'Use My Live GPS Location'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Habitation / Terrain Type"
              value={residenceType}
              onChange={(e) => setResidenceType(e.target.value)}
              options={[
                { label: 'Rural Remote / Unpaved Road (High Transit Fatigue)', value: 'rural_remote' },
                { label: 'Semi-Urban / Peri-Urban Corridor', value: 'semi_urban' },
                { label: 'Urban Slum / Informal Settlement', value: 'urban_slum' },
                { label: 'Urban Metropolitan Center', value: 'urban_metro' },
              ]}
            />

            <Input
              label="Address / Village"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Input label="City / District" value={city} onChange={(e) => setCity(e.target.value)} required />
            <Input label="State" value={state} onChange={(e) => setState(e.target.value)} required />
            <Input label="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Latitude"
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
              />
              <Input
                label="Longitude"
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSaving}
            icon={<Save className="w-4 h-4" />}
            className="w-full sm:w-auto justify-center"
          >
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
};
