import { api } from './api';

export interface DoctorDashboardData {
  success: boolean;
  disclaimer: string;
  doctor: any;
  metrics: {
    totalMonitoredPatients: number;
    highFrictionAtRiskCount: number;
    pendingOpdConsultations: number;
    averageCareCompletionRate: string;
    activeEscortRequests: number;
  };
  recentPatients: any[];
  systemAlerts: Array<{
    id: string;
    severity: string;
    title: string;
    message: string;
    suggestedAction: string;
  }>;
}

export const doctorService = {
  async getDashboard(): Promise<DoctorDashboardData> {
    const res = await api.get('/doctor/dashboard');
    return res.data;
  },

  async getPatients(): Promise<{ success: boolean; disclaimer: string; count: number; patients: any[] }> {
    const res = await api.get('/doctor/patients');
    return res.data;
  },

  async getPatientById(id: string): Promise<any> {
    const res = await api.get(`/doctor/patients/${id}`);
    return res.data;
  },

  async updatePatientJourney(id: string, data: { stageName?: string; status?: string; notes?: string; flagTransitEscort?: boolean }): Promise<any> {
    const res = await api.post(`/doctor/patients/${id}/journey-update`, data);
    return res.data;
  },
};
