import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { NotificationProvider } from './context/NotificationContext';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { ToastProvider } from './context/ToastContext';
import { FirstVisitLanguageModal } from './components/common/FirstVisitLanguageModal';
import { AccessibilityToolbar } from './components/common/AccessibilityToolbar';

// Layouts (Static for zero Layout Shift)
import { MainLayout } from './layouts/MainLayout';
import { PatientLayout } from './layouts/PatientLayout';
import { HospitalLayout } from './layouts/HospitalLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { DoctorLayout } from './layouts/DoctorLayout';
import { AshaLayout } from './layouts/AshaLayout';
import { GovernmentLayout } from './layouts/GovernmentLayout';

// Public Pages (Lazy Loaded)
const LandingPage = lazy(() => import('./pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const Login = lazy(() => import('./pages/auth/Login').then((m) => ({ default: m.Login })));
const Register = lazy(() => import('./pages/auth/Register').then((m) => ({ default: m.Register })));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then((m) => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword').then((m) => ({ default: m.ResetPassword })));
const GoogleCallback = lazy(() => import('./pages/auth/GoogleCallback').then((m) => ({ default: m.GoogleCallback })));
const About = lazy(() => import('./pages/public/About').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('./pages/public/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/public/NotFound').then((m) => ({ default: m.NotFound })));
const SystemArchitecture = lazy(() => import('./pages/public/SystemArchitecture').then((m) => ({ default: m.SystemArchitecture })));

// Patient Pages (Lazy Loaded)
const PatientDashboard = lazy(() => import('./pages/patient/PatientDashboard').then((m) => ({ default: m.PatientDashboard })));
const PatientProfile = lazy(() => import('./pages/patient/PatientProfile').then((m) => ({ default: m.PatientProfile })));
const NearbyHospitals = lazy(() => import('./pages/patient/NearbyHospitals').then((m) => ({ default: m.NearbyHospitals })));
const HospitalDetails = lazy(() => import('./pages/patient/HospitalDetails').then((m) => ({ default: m.HospitalDetails })));
const PatientRequests = lazy(() => import('./pages/patient/PatientRequests').then((m) => ({ default: m.PatientRequests })));
const RequestDetails = lazy(() => import('./pages/patient/RequestDetails').then((m) => ({ default: m.RequestDetails })));
const PatientDocuments = lazy(() => import('./pages/patient/PatientDocuments').then((m) => ({ default: m.PatientDocuments })));
const FrictionFingerprint = lazy(() => import('./pages/patient/FrictionFingerprint').then((m) => ({ default: m.FrictionFingerprint })));
const AccessibilityRisk = lazy(() => import('./pages/patient/AccessibilityRisk').then((m) => ({ default: m.AccessibilityRisk })));
const DigitalTwinSimulator = lazy(() => import('./pages/patient/DigitalTwinSimulator').then((m) => ({ default: m.DigitalTwinSimulator })));
const TeleconsultationRoom = lazy(() => import('./pages/patient/TeleconsultationRoom').then((m) => ({ default: m.TeleconsultationRoom })));
const PatientNotifications = lazy(() => import('./pages/patient/PatientNotifications').then((m) => ({ default: m.PatientNotifications })));
const PatientSettings = lazy(() => import('./pages/patient/PatientSettings').then((m) => ({ default: m.PatientSettings })));

// Hospital Pages (Lazy Loaded)
const HospitalDashboard = lazy(() => import('./pages/hospital/HospitalDashboard').then((m) => ({ default: m.HospitalDashboard })));
const HospitalRequests = lazy(() => import('./pages/hospital/HospitalRequests').then((m) => ({ default: m.HospitalRequests })));
const HospitalRequestDetails = lazy(() => import('./pages/hospital/HospitalRequestDetails').then((m) => ({ default: m.HospitalRequestDetails })));
const HospitalDepartments = lazy(() => import('./pages/hospital/HospitalDepartments').then((m) => ({ default: m.HospitalDepartments })));
const HospitalProfile = lazy(() => import('./pages/hospital/HospitalProfile').then((m) => ({ default: m.HospitalProfile })));

// Doctor Pages (Lazy Loaded)
const DoctorDashboard = lazy(() => import('./pages/doctor/DoctorDashboard').then((m) => ({ default: m.DoctorDashboard })));
const DoctorPatientReview = lazy(() => import('./pages/doctor/DoctorPatientReview').then((m) => ({ default: m.DoctorPatientReview })));

// ASHA Cadre Pages (Lazy Loaded)
const AshaDashboard = lazy(() => import('./pages/asha/AshaDashboard').then((m) => ({ default: m.AshaDashboard })));
const AshaBarrierEntry = lazy(() => import('./pages/asha/AshaBarrierEntry').then((m) => ({ default: m.AshaBarrierEntry })));

// Government Official Pages (Lazy Loaded)
const GovernmentDashboard = lazy(() => import('./pages/government/GovernmentDashboard').then((m) => ({ default: m.GovernmentDashboard })));
const GovernmentFrictionMap = lazy(() => import('./pages/government/GovernmentFrictionMap').then((m) => ({ default: m.GovernmentFrictionMap })));
const GovernmentInterventions = lazy(() => import('./pages/government/GovernmentInterventions').then((m) => ({ default: m.GovernmentInterventions })));

// Admin Pages (Lazy Loaded)
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const PopulationFrictionMap = lazy(() => import('./pages/admin/PopulationFrictionMap').then((m) => ({ default: m.PopulationFrictionMap })));
const WhatIfSimulator = lazy(() => import('./pages/admin/WhatIfSimulator').then((m) => ({ default: m.WhatIfSimulator })));
const InterventionOptimizer = lazy(() => import('./pages/admin/InterventionOptimizer').then((m) => ({ default: m.InterventionOptimizer })));
const CareLeakage = lazy(() => import('./pages/admin/CareLeakage').then((m) => ({ default: m.CareLeakage })));
const CareFailure = lazy(() => import('./pages/admin/CareFailure').then((m) => ({ default: m.CareFailure })));
const AdminPatients = lazy(() => import('./pages/admin/AdminPatients').then((m) => ({ default: m.AdminPatients })));
const AdminHospitals = lazy(() => import('./pages/admin/AdminHospitals').then((m) => ({ default: m.AdminHospitals })));
const AuditLogs = lazy(() => import('./pages/admin/AuditLogs').then((m) => ({ default: m.AuditLogs })));

const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
    <div className="relative flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-teal-500/20 border-t-teal-600 animate-spin" />
      <div className="w-6 h-6 rounded-full border-2 border-teal-500/30 border-b-teal-500 animate-spin absolute" />
    </div>
    <span className="text-xs font-medium text-slate-400 tracking-wider uppercase animate-pulse">
      Loading Module...
    </span>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AccessibilityProvider>
          <ToastProvider>
            <AuthProvider>
              <LocationProvider>
                <NotificationProvider>
                  <FirstVisitLanguageModal />
                  <AccessibilityToolbar />
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Public Main Layout */}
                      <Route element={<MainLayout />}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/architecture" element={<SystemArchitecture />} />
                        <Route path="/hospitals" element={<Navigate to="/patient/hospitals" replace />} />
                      </Route>

                      {/* Auth Layout */}
                      <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/auth/login" element={<Navigate to="/login" replace />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/auth/register" element={<Navigate to="/register" replace />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/auth/reset-password" element={<ResetPassword />} />
                      </Route>
                      <Route path="/auth/google/callback" element={<GoogleCallback />} />

                      {/* Patient Portal */}
                      <Route path="/patient" element={<PatientLayout />}>
                        <Route index element={<Navigate to="/patient/dashboard" replace />} />
                        <Route path="dashboard" element={<PatientDashboard />} />
                        <Route path="profile" element={<PatientProfile />} />
                        <Route path="hospitals" element={<NearbyHospitals />} />
                        <Route path="hospitals/:id" element={<HospitalDetails />} />
                        <Route path="requests" element={<PatientRequests />} />
                        <Route path="requests/:id" element={<RequestDetails />} />
                        <Route path="documents" element={<PatientDocuments />} />
                        <Route path="friction" element={<FrictionFingerprint />} />
                        <Route path="risk" element={<AccessibilityRisk />} />
                        <Route path="digital-twin" element={<DigitalTwinSimulator />} />
                        <Route path="teleconsult" element={<TeleconsultationRoom />} />
                        <Route path="notifications" element={<PatientNotifications />} />
                        <Route path="settings" element={<PatientSettings />} />
                      </Route>

                      {/* Hospital Portal */}
                      <Route path="/hospital" element={<HospitalLayout />}>
                        <Route index element={<Navigate to="/hospital/dashboard" replace />} />
                        <Route path="dashboard" element={<HospitalDashboard />} />
                        <Route path="requests" element={<HospitalRequests />} />
                        <Route path="requests/:id" element={<HospitalRequestDetails />} />
                        <Route path="departments" element={<HospitalDepartments />} />
                        <Route path="teleconsult" element={<TeleconsultationRoom />} />
                        <Route path="profile" element={<HospitalProfile />} />
                        <Route path="notifications" element={<PatientNotifications />} />
                        <Route path="settings" element={<PatientSettings />} />
                      </Route>

                      {/* Doctor Clinical Decision Support Portal */}
                      <Route path="/doctor" element={<DoctorLayout />}>
                        <Route index element={<Navigate to="/doctor/dashboard" replace />} />
                        <Route path="dashboard" element={<DoctorDashboard />} />
                        <Route path="patients" element={<DoctorDashboard />} />
                        <Route path="patients/:id" element={<DoctorPatientReview />} />
                        <Route path="teleconsult" element={<TeleconsultationRoom />} />
                        <Route path="notifications" element={<PatientNotifications />} />
                        <Route path="settings" element={<PatientSettings />} />
                      </Route>

                      {/* ASHA Grassroots Field Cadre Portal */}
                      <Route path="/asha" element={<AshaLayout />}>
                        <Route index element={<Navigate to="/asha/dashboard" replace />} />
                        <Route path="dashboard" element={<AshaDashboard />} />
                        <Route path="patients" element={<AshaDashboard />} />
                        <Route path="log-barrier" element={<AshaBarrierEntry />} />
                        <Route path="notifications" element={<PatientNotifications />} />
                        <Route path="settings" element={<PatientSettings />} />
                      </Route>

                      {/* Government Health Official Macro Analytics Portal */}
                      <Route path="/government" element={<GovernmentLayout />}>
                        <Route index element={<Navigate to="/government/dashboard" replace />} />
                        <Route path="dashboard" element={<GovernmentDashboard />} />
                        <Route path="friction-map" element={<GovernmentFrictionMap />} />
                        <Route path="interventions" element={<GovernmentInterventions />} />
                        <Route path="leakage" element={<CareLeakage />} />
                        <Route path="simulator" element={<WhatIfSimulator />} />
                        <Route path="notifications" element={<PatientNotifications />} />
                        <Route path="settings" element={<PatientSettings />} />
                      </Route>

                      {/* Admin Intelligence Suite */}
                      <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="friction-map" element={<PopulationFrictionMap />} />
                        <Route path="simulator" element={<WhatIfSimulator />} />
                        <Route path="digital-twin" element={<DigitalTwinSimulator />} />
                        <Route path="interventions" element={<InterventionOptimizer />} />
                        <Route path="care-leakage" element={<CareLeakage />} />
                        <Route path="care-failure" element={<CareFailure />} />
                        <Route path="patients" element={<AdminPatients />} />
                        <Route path="hospitals" element={<AdminHospitals />} />
                        <Route path="audit-logs" element={<AuditLogs />} />
                        <Route path="settings" element={<PatientSettings />} />
                      </Route>

                      {/* 404 Catch All */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </NotificationProvider>
              </LocationProvider>
            </AuthProvider>
          </ToastProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};
