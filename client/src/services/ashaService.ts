import { api } from './api';

export interface AshaDashboardData {
  success: boolean;
  ashaWorker: any;
  metrics: {
    assignedHouseholds: number;
    monitoredPatients: number;
    highFrictionHouseholds: number;
    pendingEscortTrips: number;
    fieldVisitsThisMonth: number;
    bilingualCardsDistributed: number;
  };
  fieldTasks: Array<{
    id: string;
    patientName: string;
    barrier: string;
    task: string;
    status: string;
    urgency: string;
  }>;
  recentCommunityPatients: any[];
}

export const ashaService = {
  async getDashboard(): Promise<AshaDashboardData> {
    const res = await api.get('/asha/dashboard');
    return res.data;
  },

  async getPatients(): Promise<{ success: boolean; count: number; patients: any[] }> {
    const res = await api.get('/asha/patients');
    return res.data;
  },

  async logBarrier(data: { patientId: string; barrierType: string; description?: string; severity?: string; requiresEscort?: boolean }): Promise<any> {
    const res = await api.post('/asha/patient-barriers', data);
    return res.data;
  },

  async requestTransit(data: { patientId?: string; transitType?: string; pickupLocation?: string; destinationHospital?: string; scheduledDate?: string; notes?: string }): Promise<any> {
    const res = await api.post('/asha/request-transit', data);
    return res.data;
  },
};
