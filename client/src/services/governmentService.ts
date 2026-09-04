import { api } from './api';

export interface GovernmentDashboardData {
  success: boolean;
  official: any;
  districtSummary: {
    districtName: string;
    state: string;
    totalPopulationCoverage: string;
    monitoredPatientProfiles: number;
    enrolledPublicFacilities: number;
    overallDistrictFrictionScore: number;
    stateAverageBenchmark: number;
    overallCareRetentionRate: string;
  };
  careJourneyLeakage: Array<{
    stage: string;
    incomingPatients: number;
    completedCount: number;
    leakageCount: number;
    leakagePercent: number;
    topDriver: string;
  }>;
  systemicBottlenecks: Array<{
    rank: number;
    barrierCategory: string;
    impactRate: string;
    recommendedAction: string;
  }>;
}

export const governmentService = {
  async getDashboard(): Promise<GovernmentDashboardData> {
    const res = await api.get('/government/dashboard');
    return res.data;
  },

  async getFrictionMap(): Promise<{ success: boolean; region: string; clusters: any[] }> {
    const res = await api.get('/government/friction-map');
    return res.data;
  },

  async getInterventions(): Promise<{ success: boolean; interventions: any[] }> {
    const res = await api.get('/government/interventions');
    return res.data;
  },

  async recordPolicyAction(data: { interventionCode: string; action: string; allocatedBudgetINR?: number; notes?: string }): Promise<any> {
    const res = await api.post('/government/interventions/policy-action', data);
    return res.data;
  },
};
