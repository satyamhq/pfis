import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { AshaWorker } from '../models/AshaWorker.js';
import { Patient } from '../models/Patient.js';
import { HospitalRequest } from '../models/HospitalRequest.js';
import { AuditService } from '../services/auditService.js';

export class AshaController {
  /**
   * GET /api/asha/dashboard
   * Returns grassroots field metrics, village cluster overview, escort requests
   */
  public static async getDashboard(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }
      const userId = req.user._id || req.user.id;
      let asha = await AshaWorker.findOne({ userId });
      if (!asha) {
        asha = await AshaWorker.findOne({ email: req.user.email });
      }

      const patients = await Patient.find({})
        .populate('activeFrictionProfileId')
        .populate('activeCareRiskId')
        .limit(20);

      const highRiskHouseholds = patients.filter((p: any) => {
        const fp = p.activeFrictionProfileId;
        return fp && (fp.overallFrictionScore >= 60 || fp.frictionLevel === 'HIGH' || fp.frictionLevel === 'CRITICAL');
      }).length;

      res.status(200).json({
        success: true,
        ashaWorker: asha || {
          name: req.user.name,
          workerId: 'ASHA-PB-KPR-042',
          assignedVillage: 'Mehli Cluster',
          district: 'Kapurthala',
          state: 'Punjab',
          primaryHealthCenter: 'CHC Phagwara',
          communityPopulation: 1850,
          assignedPatientsCount: 28,
        },
        metrics: {
          assignedHouseholds: 142,
          monitoredPatients: patients.length,
          highFrictionHouseholds: highRiskHouseholds,
          pendingEscortTrips: 4,
          fieldVisitsThisMonth: 36,
          bilingualCardsDistributed: 19,
        },
        fieldTasks: [
          {
            id: 'task-1',
            patientName: 'Sunita Devi (Vill. Mehli)',
            barrier: 'Transit Attrition & Wheelchair Need',
            task: 'Accompany patient to Civil Hospital morning bus stop (07:45 AM)',
            status: 'SCHEDULED',
            urgency: 'HIGH',
          },
          {
            id: 'task-2',
            patientName: 'Baldev Singh (Ward 4)',
            barrier: 'Documentation / Missing Ayushman Card',
            task: 'Help complete Aadhaar-eKYC document verification at CSC kiosk',
            status: 'PENDING',
            urgency: 'MEDIUM',
          },
          {
            id: 'task-3',
            patientName: 'Gurmeet Kaur (Mehli Sub-Center)',
            barrier: 'Language & Prescription Illiteracy',
            task: 'Deliver color-coded audio dosage instructions in Punjabi',
            status: 'COMPLETED',
            urgency: 'LOW',
          },
        ],
        recentCommunityPatients: patients.slice(0, 6),
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to fetch ASHA dashboard.' });
    }
  }

  /**
   * GET /api/asha/patients
   * Returns list of grassroots patients with household non-clinical barriers
   */
  public static async getPatients(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const patients = await Patient.find({})
        .populate('activeFrictionProfileId')
        .populate('activeCareRiskId');

      const formatted = patients.map((p: any) => {
        const fp = p.activeFrictionProfileId || {};
        return {
          id: p._id || p.id,
          patientCode: p.patientCode,
          name: p.patientCode === 'PAT-1001' ? 'Sunita Devi' : `Village Resident (${p.patientCode})`,
          age: p.age,
          gender: p.gender,
          preferredLanguage: p.preferredLanguage,
          transportAvailability: p.transportAvailability,
          digitalAccessLevel: p.digitalAccessLevel,
          overallFrictionScore: fp.overallFrictionScore || 50,
          frictionLevel: fp.frictionLevel || 'MEDIUM',
          topBarrier: fp.topBarrier || 'Travel Distance & Bus Timing',
          secondaryBarrier: fp.secondaryBarrier || 'Digital Literacy',
          currentJourneyStage: p.currentJourneyStage || 'Consultation',
          lastFieldContact: '2 days ago',
        };
      });

      res.status(200).json({
        success: true,
        count: formatted.length,
        patients: formatted,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to fetch ASHA patient list.' });
    }
  }

  /**
   * POST /api/asha/patient-barriers
   * Records newly observed non-clinical barriers from frontline doorstep visits
   */
  public static async logPatientBarrier(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const { patientId, barrierType, description, severity, requiresEscort } = req.body;

      if (!patientId || !barrierType) {
        res.status(400).json({ success: false, message: 'Patient ID and barrier type are required.' });
        return;
      }

      await AuditService.log('ASHA_BARRIER_LOGGED', 'PatientBarrier', req, {
        userId: req.user._id,
        resourceId: patientId,
        details: { barrierType, description, severity, requiresEscort },
      });

      res.status(200).json({
        success: true,
        message: 'Non-clinical barrier successfully recorded by ASHA worker.',
        record: {
          patientId,
          barrierType,
          description,
          severity: severity || 'HIGH',
          requiresEscort: !!requiresEscort,
          recordedAt: new Date().toISOString(),
          recordedBy: req.user.name,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to log patient barrier.' });
    }
  }

  /**
   * POST /api/asha/request-transit
   * Submits a community transit / escort assistance request for an elderly/vulnerable patient
   */
  public static async requestTransit(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const { patientId, transitType, pickupLocation, destinationHospital, scheduledDate, notes } = req.body;

      const newRequest = await HospitalRequest.create({
        requestCode: `REQ-ASHA-${Date.now().toString().slice(-6)}`,
        patientId: patientId || req.user._id,
        hospitalId: destinationHospital || 'civil-hospital-phagwara',
        departmentName: 'Community Transit & Escort Desk',
        reasonForVisit: `ASHA-Assisted Visit: ${transitType || 'Transit Shuttle & Escort'}`,
        preferredDate: scheduledDate || new Date().toISOString().split('T')[0],
        preferredTimeSlot: 'Morning (08:30 AM - 10:30 AM)',
        additionalMessage: `ASHA Notes: ${notes || 'Doorstep pickup requested for high-friction patient.'}`,
        status: 'UNDER_REVIEW',
        distanceKm: 25.0,
        estimatedTravelTimeMinutes: 45,
        accessibilityScoreAtRequest: 35,
        topBarrierAtRequest: 'Infrequent Public Transit',
        needsAmbulance: transitType === 'Ambulance',
        needsCareEscort: true,
        timeline: [
          {
            status: 'REQUEST_CREATED',
            timestamp: new Date().toISOString(),
            note: `Queued by ASHA Worker ${req.user.name} for village pickup.`,
            actorRole: 'asha',
          },
        ],
      });

      await AuditService.log('ASHA_TRANSIT_REQUEST', 'HospitalRequest', req, {
        userId: req.user._id,
        resourceId: newRequest._id,
        details: { requestCode: newRequest.requestCode, patientId, transitType },
      });

      res.status(201).json({
        success: true,
        message: 'Transit and escort assistance request queued successfully with hospital nodal desk.',
        request: newRequest,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to request transit support.' });
    }
  }
}
