import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestService } from '../../services/requestService';
import { hospitalService } from '../../services/hospitalService';
import { HospitalRequest, Hospital, HospitalDepartment } from '../../types';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { PageClarityRibbon } from '../../components/common/PageClarityRibbon';
import {
  Building2,
  ListOrdered,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Layers,
  MapPin,
  Calendar,
} from 'lucide-react';

export const HospitalDashboard: React.FC = () => {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [departments, setDepartments] = useState<HospitalDepartment[]>([]);
  const [requests, setRequests] = useState<HospitalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const hRes = await hospitalService.getMyProfile();
        if (hRes.success) {
          setHospital(hRes.hospital);
          setDepartments(hRes.departments || []);
        }

        const rRes = await requestService.getHospitalRequests();
        if (rRes.success) {
          setRequests(rRes.requests || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  const newRequestsCount = requests.filter((r) => ['REQUEST_SENT', 'HOSPITAL_RECEIVED'].includes(r.status)).length;
  const pendingCount = requests.filter((r) => r.status === 'UNDER_REVIEW').length;
  const acceptedCount = requests.filter((r) => ['ACCEPTED', 'APPOINTMENT_SCHEDULED'].includes(r.status)).length;
  const completedCount = requests.filter((r) => r.status === 'COMPLETED').length;

  return (
    <div className="space-y-8">
      {/* Hospital Identity Banner */}
      <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-brand-500/5 via-teal-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider border border-slate-200/80">
              {hospital?.type || 'Government'} Facility
            </span>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Triage Active
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">{hospital?.name}</h2>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span>{hospital?.address}, {hospital?.city}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto relative z-10">
          <Link to="/hospital/requests" className="w-full sm:w-auto">
            <Button variant="primary" size="sm" icon={<ListOrdered className="w-4 h-4" />} className="w-full sm:w-auto justify-center shadow-xs">
              Intake Queue
            </Button>
          </Link>
          <Link to="/hospital/departments" className="w-full sm:w-auto">
            <Button variant="outline" size="sm" icon={<Layers className="w-4 h-4" />} className="w-full sm:w-auto justify-center shadow-xs">
              Departments
            </Button>
          </Link>
        </div>
      </div>

      {/* Guidance Ribbon: What is this? Why is it useful? What should I do next? */}
      <PageClarityRibbon
        pageKey="hospital_dashboard"
        what="Institutional Triage Console — coordinate incoming patient intake, department quotas, and barrier accommodation."
        why="Balances daily token quotas across clinical specialties while proactively reviewing transport, language, and wheelchair assistance needs."
        next="Execute 'Triage Incoming Queue' to review high-risk patient intakes or adjust specialist capacities under 'Manage Departments'."
        actionText="Intake Queue"
        actionLink="/hospital/requests"
        badge="Triage Console"
        role="hospital"
      />

      {/* Triage Status Pipeline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="New Requests"
          value={newRequestsCount}
          subtitle="Awaiting initial triage review"
          icon={Clock}
          badge={newRequestsCount > 0 ? 'Action Required' : 'Up to date'}
          badgeType={newRequestsCount > 0 ? 'danger' : 'info'}
        />

        <StatCard
          title="Under Review"
          value={pendingCount}
          subtitle="In department queue evaluation"
          icon={AlertTriangle}
          badge="Pending"
          badgeType="warning"
        />

        <StatCard
          title="Accepted Requests"
          value={acceptedCount}
          subtitle="OPD token scheduled"
          icon={CheckCircle2}
          badge="Active OPD"
          badgeType="success"
        />

        <StatCard
          title="Completed Visits"
          value={completedCount}
          subtitle="Successfully consulted"
          icon={Building2}
          badge="Fulfilled"
          badgeType="info"
        />
      </div>

      {/* Triage Queue Table */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-brand-600" />
              Triage Queue
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Only patient-consented demographic and non-clinical friction data is displayed
            </p>
          </div>
          <Link to="/hospital/requests" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            <span>All Requests</span>
            <span className="px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[10px]">{requests.length}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {requests.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            No incoming patient requests in the queue currently.
          </div>
        ) : (
          <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[640px] text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Request Code</th>
                  <th className="p-3.5">Patient</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Reason for Visit</th>
                  <th className="p-3.5">Distance</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80 text-slate-700">
                {requests.slice(0, 6).map((req) => (
                  <tr key={req._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-3.5 font-bold font-mono text-slate-900">{req.requestCode}</td>
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-900 block">{(req.patientId as any)?.patientCode || 'PAT-1048'}</span>
                      <span className="text-[10px] text-slate-400">
                        {(req.patientId as any)?.age} yrs • {(req.patientId as any)?.preferredLanguage}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-teal-800">
                      <span className="px-2 py-0.5 rounded-md bg-teal-50 border border-teal-100/60">
                        {req.departmentName}
                      </span>
                    </td>
                    <td className="p-3.5 max-w-xs truncate text-slate-600">{req.reasonForVisit}</td>
                    <td className="p-3.5 font-medium text-slate-600">
                      <span className="font-semibold text-slate-800">{req.distanceKm || 25}</span> km
                    </td>
                    <td className="p-3.5">
                      <StatusBadge status={req.status} size="sm" />
                    </td>
                    <td className="p-3.5 text-right">
                      <Link to={`/hospital/requests/${req._id}`}>
                        <Button variant="outline" size="sm" className="shadow-2xs">
                          Review
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
