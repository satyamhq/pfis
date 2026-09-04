import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input, Select } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ErrorAlert } from '../../components/common/ErrorAlert';
import {
  User,
  Building2,
  Mail,
  Lock,
  Phone,
  MapPin,
  Stethoscope,
  HeartHandshake,
  Landmark,
  ShieldCheck,
} from 'lucide-react';

type RegisterRole = 'patient' | 'hospital' | 'doctor' | 'asha' | 'government';

export const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const rawRole = searchParams.get('role');
  const initialRole: RegisterRole =
    rawRole === 'hospital' || rawRole === 'doctor' || rawRole === 'asha' || rawRole === 'government'
      ? (rawRole as RegisterRole)
      : 'patient';

  const [role, setRole] = useState<RegisterRole>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Location fields
  const [city, setCity] = useState('Phagwara');
  const [address, setAddress] = useState('Civil Lines / Station Road');

  // Patient Specific
  const [age, setAge] = useState(42);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [preferredLanguage, setPreferredLanguage] = useState('Hindi');
  const [transportAvailability, setTransportAvailability] = useState('low');

  // Hospital Specific
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalType, setHospitalType] = useState('Government');

  // Doctor Specific
  const [doctorDepartment, setDoctorDepartment] = useState('Cardiology & General Medicine');
  const [doctorRegNo, setDoctorRegNo] = useState('');
  const [doctorHospital, setDoctorHospital] = useState('Civil Hospital Phagwara');

  // ASHA Specific
  const [assignedVillage, setAssignedVillage] = useState('Mehli');
  const [primaryHealthCenter, setPrimaryHealthCenter] = useState('CHC Phagwara');

  // Government Specific
  const [officialDesignation, setOfficialDesignation] = useState('District Chief Medical Officer');
  const [jurisdictionLevel, setJurisdictionLevel] = useState('DISTRICT');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const roleConfigs = [
    { id: 'patient' as RegisterRole, label: 'Citizen / Patient', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'hospital' as RegisterRole, label: 'Hospital Facility', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'doctor' as RegisterRole, label: 'Doctor / Medical', icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { id: 'asha' as RegisterRole, label: 'ASHA Worker', icon: <HeartHandshake className="w-3.5 h-3.5" /> },
    { id: 'government' as RegisterRole, label: 'Govt Official', icon: <Landmark className="w-3.5 h-3.5" /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload: any = {
        name,
        email,
        password,
        role,
        phone,
        city,
        address,
      };

      if (role === 'patient') {
        payload.age = age;
        payload.gender = gender;
        payload.preferredLanguage = preferredLanguage;
        payload.transportAvailability = transportAvailability;
      } else if (role === 'hospital') {
        payload.hospitalName = hospitalName || name;
        payload.type = hospitalType;
      } else if (role === 'doctor') {
        payload.department = doctorDepartment;
        payload.registrationNumber = doctorRegNo || 'MCI-PENDING-VERIFY';
        payload.hospitalAffiliation = doctorHospital;
      } else if (role === 'asha') {
        payload.assignedVillage = assignedVillage;
        payload.primaryHealthCenter = primaryHealthCenter;
        payload.district = city;
      } else if (role === 'government') {
        payload.officialDesignation = officialDesignation;
        payload.jurisdictionLevel = jurisdictionLevel;
        payload.district = city;
      }

      const res = await register(payload);
      if (res.success && res.user) {
        if (res.user.role === 'doctor') navigate('/doctor/dashboard');
        else if (res.user.role === 'asha') navigate('/asha/dashboard');
        else if (res.user.role === 'government') navigate('/government/dashboard');
        else if (res.user.role === 'hospital') navigate('/hospital/dashboard');
        else navigate('/patient/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please check inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-4 sm:p-8 space-y-5 sm:space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Create an Account</h2>
        <p className="text-xs text-slate-500">Join the Patient Friction Intelligence System (5 Public Roles)</p>
      </div>

      {/* 5-Role Public Selector (Admin is strictly isolated) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 p-1.5 bg-slate-100 rounded-2xl">
        {roleConfigs.map((rc) => (
          <button
            key={rc.id}
            type="button"
            onClick={() => setRole(rc.id)}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
              role === rc.id
                ? 'bg-white text-teal-800 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {rc.icon}
            <span className="truncate">{rc.label}</span>
          </button>
        ))}
      </div>

      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={
            role === 'patient'
              ? 'Full Name'
              : role === 'doctor'
              ? 'Doctor Full Name'
              : role === 'asha'
              ? 'ASHA Worker Name'
              : role === 'government'
              ? 'Official Full Name'
              : 'Hospital Administrator Full Name'
          }
          placeholder={
            role === 'doctor'
              ? 'e.g. Dr. Rajesh Sharma'
              : role === 'asha'
              ? 'e.g. Kamla Devi'
              : role === 'government'
              ? 'e.g. Dr. Arvind Verma'
              : 'e.g. Sunita Devi'
          }
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {role === 'hospital' && (
          <Input
            label="Hospital / Medical Facility Name"
            placeholder="e.g. Metro Civil District Hospital"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
          />
        )}

        {role === 'doctor' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Medical Department"
              value={doctorDepartment}
              onChange={(e) => setDoctorDepartment(e.target.value)}
              options={[
                { label: 'Cardiology & General Medicine', value: 'Cardiology & General Medicine' },
                { label: 'Orthopedics', value: 'Orthopedics' },
                { label: 'Pediatrics', value: 'Pediatrics' },
                { label: 'Oncology', value: 'Oncology' },
                { label: 'Neurology', value: 'Neurology' },
                { label: 'Gynecology', value: 'Gynecology' },
              ]}
            />
            <Input
              label="Medical Registration Number"
              placeholder="e.g. MCI-PB-2018-0924"
              value={doctorRegNo}
              onChange={(e) => setDoctorRegNo(e.target.value)}
            />
          </div>
        )}

        {role === 'asha' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Assigned Village"
              placeholder="e.g. Mehli"
              value={assignedVillage}
              onChange={(e) => setAssignedVillage(e.target.value)}
              required
            />
            <Input
              label="Primary Health Center (PHC)"
              placeholder="e.g. CHC Phagwara"
              value={primaryHealthCenter}
              onChange={(e) => setPrimaryHealthCenter(e.target.value)}
              required
            />
          </div>
        )}

        {role === 'government' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Official Designation"
              placeholder="e.g. District Chief Medical Officer"
              value={officialDesignation}
              onChange={(e) => setOfficialDesignation(e.target.value)}
              required
            />
            <Select
              label="Jurisdiction Level"
              value={jurisdictionLevel}
              onChange={(e) => setJurisdictionLevel(e.target.value)}
              options={[
                { label: 'District Level', value: 'DISTRICT' },
                { label: 'State / Regional Level', value: 'STATE' },
              ]}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={<Phone className="w-4 h-4" />}
          />
        </div>

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-4 h-4" />}
          required
        />

        {role === 'patient' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value, 10))}
                min={1}
                max={120}
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
                label="Primary Language"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                options={[
                  { label: 'Hindi', value: 'Hindi' },
                  { label: 'Punjabi', value: 'Punjabi' },
                  { label: 'English', value: 'English' },
                  { label: 'Bengali', value: 'Bengali' },
                  { label: 'Santali', value: 'Santali' },
                ]}
              />
            </div>

            <Select
              label="Transportation Availability"
              value={transportAvailability}
              onChange={(e) => setTransportAvailability(e.target.value)}
              options={[
                { label: 'No Vehicle / Irregular Rural Bus (High Barrier)', value: 'none' },
                { label: 'Shared Auto / Infrequent Bus (Moderate Barrier)', value: 'low' },
                { label: 'Regular Public Transit / Multi-Hop', value: 'moderate' },
                { label: 'Personal Vehicle / Two-Wheeler (High Autonomy)', value: 'high' },
              ]}
            />
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Habitation / Village / Area"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            icon={<MapPin className="w-4 h-4" />}
          />
          <Input
            label="City / District"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Admin accounts are restricted to institutional whitelists.</span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
        >
          Create {roleConfigs.find((r) => r.id === role)?.label} Account
        </Button>
      </form>

      <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-teal-600 hover:text-teal-700">
          Sign In
        </Link>
      </div>
    </div>
  );
};
