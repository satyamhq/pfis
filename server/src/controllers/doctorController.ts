import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { Doctor } from '../models/Doctor.js';
import { Patient } from '../models/Patient.js';
import { FrictionProfile } from '../models/FrictionProfile.js';
import { CareRisk } from '../models/CareRisk.js';
import { CareJourney } from '../models/CareJourney.js';
import { HospitalRequest } from '../models/HospitalRequest.js';
import { AuditService } from '../services/auditService.js';

const CLINICAL_DISCLAIMER =
  'DISCLAIMER: PFIS provides non-clinical operational decision-support intelligence. It identifies non-clinical barriers (transit, literacy, financial, scheduling) and does NOT provide clinical diagnosis, medical prescriptions, or replace clinical judgment.';

export class DoctorController {
  /**
   * GET /api/doctor/dashboard
   * Returns doctor clinical profile, assigned patient queue, non-clinical friction alerts
   */
  public static async getDashboard(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }
      const userId = req.user._id || req.user.id;
      let doctor = await Doctor.findOne({ userId });
      if (!doctor) {
        doctor = await Doctor.findOne({ email: req.user.email });
      }

      const allPatients = await Patient.find({})
        .populate('activeFrictionProfileId')
        .populate('activeCareRiskId')
        .limit(20);

      const highFrictionCount = allPatients.filter((p: any) => {
        const fp = p.activeFrictionProfileId;
        return fp && (fp.overallFrictionScore >= 60 || fp.frictionLevel === 'HIGH' || fp.frictionLevel === 'CRITICAL');
      }).length;

      const requests = await HospitalRequest.find({}).limit(15);
      const pendingAppointments = requests.filter((r: any) => r.status === 'UNDER_REVIEW' || r.status === 'ACCEPTED');

      res.status(200).json({
        success: true,
        disclaimer: CLINICAL_DISCLAIMER,
        doctor: doctor || {
          name: req.user.name,
          email: req.user.email,
          department: 'General Medicine & Cardiology',
          qualification: 'MBBS, MD',
          registrationNumber: 'MCI-REG-VERIFIED',
          rating: 4.8,
        },
        metrics: {
          totalMonitoredPatients: allPatients.length,
          highFrictionAtRiskCount: highFrictionCount,
          pendingOpdConsultations: pendingAppointments.length,
          averageCareCompletionRate: '78.4%',
          activeEscortRequests: 3,
        },
        recentPatients: allPatients.slice(0, 8),
        systemAlerts: [
          {
            id: 'alt-1',
            severity: 'HIGH',
            title: 'Transit Barrier Alert: Sunita Devi (65km distance)',
            message: 'Patient relies on infrequent rural bus transit. High risk of missing follow-up OPD.',
            suggestedAction: 'Coordinate transit shuttle with Phagwara Civil Hospital nodal desk.',
          },
          {
            id: 'alt-2',
            severity: 'MEDIUM',
            title: 'Digital Token Friction: Harbhajan Singh',
            message: 'Patient lacks smartphone access; unable to view digital queue status.',
            suggestedAction: 'Issue physical ground token and assign ASHA audio guidance companion.',
          },
        ],
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to load doctor dashboard.' });
    }
  }

  /**
   * GET /api/doctor/patients
   * Returns list of patients with non-clinical friction metrics
   */
  public static async getPatients(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const patients = await Patient.find({})
        .populate('activeFrictionProfileId')
        .populate('activeCareRiskId');

      const formatted = patients.map((p: any) => {
        const fp = p.activeFrictionProfileId || {};
        const cr = p.activeCareRiskId || {};
        return {
          id: p._id || p.id,
          patientCode: p.patientCode || 'PAT-DEMO',
          age: p.age,
          gender: p.gender,
          preferredLanguage: p.preferredLanguage,
          location: p.location?.city ? `${p.location.city}, ${p.location.state}` : 'Punjab Rural',
          residenceType: p.residenceType || 'rural_remote',
          transportAvailability: p.transportAvailability,
          digitalAccessLevel: p.digitalAccessLevel,
          overallFrictionScore: fp.overallFrictionScore || 45,
          frictionLevel: fp.frictionLevel || 'MEDIUM',
          topBarrier: fp.topBarrier || 'Transport Availability',
          careCompletionProbability: cr.careCompletionProbability || 0.65,
          riskCategory: cr.riskCategory || 'MODERATE',
          bottleneckStage: cr.bottleneckStage || 'Consultation to Diagnostics',
          currentJourneyStage: p.currentJourneyStage || 'Consultation',
        };
      });

      res.status(200).json({
        success: true,
        disclaimer: CLINICAL_DISCLAIMER,
        count: formatted.length,
        patients: formatted,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to fetch patients list.' });
    }
  }

  /**
   * GET /api/doctor/patients/:id
   * Deep-dive into patient non-clinical friction breakdown & 5-stage care journey
   */
  public static async getPatientById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      let patient = await Patient.findById(id)
        .populate('activeFrictionProfileId')
        .populate('activeCareRiskId');

      if (!patient) {
        // Fallback search by patientCode or userId
        patient = await Patient.findOne({ $or: [{ patientCode: id }, { userId: id }] })
          .populate('activeFrictionProfileId')
          .populate('activeCareRiskId');
      }

      if (!patient) {
        res.status(404).json({ success: false, message: 'Patient record not found.' });
        return;
      }

      // Care journey stages: Referral -> Consultation -> Diagnostics -> Treatment -> Follow-up
      const journeyStages = [
        {
          stageName: '1. Referral & Intake',
          status: 'COMPLETED',
          frictionScore: 25,
          observedBarrier: 'Cross-district paperwork delay',
          mitigationApplied: 'Digital Aadhaar-verified record shared in advance',
        },
        {
          stageName: '2. Clinical Consultation',
          status: 'IN_PROGRESS',
          frictionScore: 40,
          observedBarrier: 'Language dialect difference (Punjabi/Hindi)',
          mitigationApplied: 'Simple language vernacular care card generated',
        },
        {
          stageName: '3. Diagnostics & Lab Work',
          status: 'AT_RISK',
          frictionScore: 68,
          observedBarrier: 'Diagnostic facility 12km from home; daily wage loss',
          mitigationApplied: 'Scheduled same-day bundled lab tests before 11:00 AM',
        },
        {
          stageName: '4. Treatment & Therapy',
          status: 'PENDING',
          frictionScore: 50,
          observedBarrier: 'Prescription affordability / Generic medicine supply',
          mitigationApplied: 'Jan Aushadhi Kendra generic medicine mapping active',
        },
        {
          stageName: '5. Continuity & Follow-up',
          status: 'PENDING',
          frictionScore: 75,
          observedBarrier: 'Lack of personal vehicle / Infrequent return bus',
          mitigationApplied: 'ASHA home-visit check-in & community transit shuttle queued',
        },
      ];

      res.status(200).json({
        success: true,
        disclaimer: CLINICAL_DISCLAIMER,
        patient,
        frictionProfile: patient.activeFrictionProfileId,
        careRisk: patient.activeCareRiskId,
        journeyStages,
        suggestedMitigations: [
          'Assign Doorstep Care Sahayak (ASHA escort) for next diagnostic visit',
          'Prioritize morning OPD token before 10:30 AM to accommodate return bus schedule',
          'Provide bilingual printed care summary sheet for family caregiver',
        ],
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to fetch patient details.' });
    }
  }

  /**
   * POST /api/doctor/patients/:id/journey-update
   * Records logistical progress in the 5-stage care journey
   */
  public static async updatePatientJourney(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { stageName, status, notes, flagTransitEscort } = req.body;

      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const patient = await Patient.findById(id);
      if (!patient) {
        res.status(404).json({ success: false, message: 'Patient not found.' });
        return;
      }

      if (stageName) {
        patient.currentJourneyStage = stageName;
        await patient.save();
      }

      await AuditService.log('DOCTOR_JOURNEY_UPDATE', 'CareJourney', req, {
        userId: req.user._id,
        resourceId: patient._id,
        details: { stageName, status, notes, flagTransitEscort },
      });

      res.status(200).json({
        success: true,
        disclaimer: CLINICAL_DISCLAIMER,
        message: 'Patient care journey successfully updated with non-clinical milestone.',
        patient,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to update patient journey.' });
    }
  }
}
