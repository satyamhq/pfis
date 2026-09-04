import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { Patient, IPatient } from '../models/Patient.js';
import { FrictionProfile } from '../models/FrictionProfile.js';
import { CareRisk } from '../models/CareRisk.js';
import { FrictionInteraction } from '../models/FrictionInteraction.js';
import { CareJourney } from '../models/CareJourney.js';
import { HospitalRequest } from '../models/HospitalRequest.js';
import { FrictionEngine } from '../intelligence/friction/frictionEngine.js';
import { FrictionInteractionEngine } from '../intelligence/causal/frictionInteractionEngine.js';
import { RiskEngine } from '../intelligence/risk/riskEngine.js';
import { AuditService } from '../services/auditService.js';

export class PatientController {
  public static async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      let patient = await Patient.findOne({ userId: req.user?._id })
        .populate('preferredHospitalId')
        .populate('activeFrictionProfileId')
        .populate('activeCareRiskId');

      if (!patient) {
        patient = await Patient.findOne({})
          .populate('preferredHospitalId')
          .populate('activeFrictionProfileId')
          .populate('activeCareRiskId');
      }

      if (!patient) {
        res.status(404).json({ success: false, message: 'Patient profile not found.' });
        return;
      }

      const activeRequests = await HospitalRequest.find({
        patientId: patient._id,
        status: { $nin: ['COMPLETED', 'CANCELLED', 'REJECTED'] },
      })
        .populate('hospitalId', 'name address phone emergencyAvailable')
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        patient,
        activeRequests,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to fetch patient.' });
    }
  }

  public static async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      let patient = await Patient.findOne({ userId: req.user?._id });
      if (!patient) {
        patient = await Patient.findOne({});
      }
      if (!patient) {
        res.status(404).json({ success: false, message: 'Patient profile not found.' });
        return;
      }

      const {
        age,
        gender,
        preferredLanguage,
        phone,
        emergencyContactName,
        emergencyContactPhone,
        transportAvailability,
        digitalAccessLevel,
        familySupport,
        documentationStatus,
        financialAccessibility,
        appointmentFlexibility,
        residenceType,
        location,
      } = req.body;

      if (age !== undefined) patient.age = age;
      if (gender) patient.gender = gender;
      if (preferredLanguage) patient.preferredLanguage = preferredLanguage;
      if (phone) patient.phone = phone;
      if (emergencyContactName) patient.emergencyContactName = emergencyContactName;
      if (emergencyContactPhone) patient.emergencyContactPhone = emergencyContactPhone;
      if (transportAvailability) patient.transportAvailability = transportAvailability;
      if (digitalAccessLevel) patient.digitalAccessLevel = digitalAccessLevel;
      if (familySupport) patient.familySupport = familySupport;
      if (documentationStatus) patient.documentationStatus = documentationStatus;
      if (financialAccessibility) patient.financialAccessibility = financialAccessibility;
      if (appointmentFlexibility) patient.appointmentFlexibility = appointmentFlexibility;
      if (residenceType) patient.residenceType = residenceType;

      if (location) {
        patient.location = {
          address: location.address || patient.location.address,
          city: location.city || patient.location.city,
          state: location.state || patient.location.state,
          pincode: location.pincode || patient.location.pincode,
          latitude: location.latitude !== undefined ? location.latitude : patient.location.latitude,
          longitude: location.longitude !== undefined ? location.longitude : patient.location.longitude,
          geoJSON: {
            type: 'Point',
            coordinates: [
              location.longitude !== undefined ? location.longitude : patient.location.longitude,
              location.latitude !== undefined ? location.latitude : patient.location.latitude,
            ],
          },
        };
      }

      // Re-run Friction and Risk Engines
      const frictionCalc = FrictionEngine.calculate(patient.toObject(), null, 30);
      const frictionProfile = await FrictionProfile.create({
        patientId: patient._id,
        ...frictionCalc,
      });

      // Detect Compound Synergies
      const interactions = FrictionInteractionEngine.detectInteractions(frictionCalc);
      await FrictionInteraction.deleteMany({ patientId: patient._id });
      if (interactions.length > 0) {
        await FrictionInteraction.insertMany(
          interactions.map((i) => ({
            patientId: patient._id,
            frictionProfileId: frictionProfile._id,
            ...i,
          }))
        );
      }

      const riskCalc = RiskEngine.evaluate(frictionCalc);
      const careRisk = await CareRisk.create({
        patientId: patient._id,
        frictionProfileId: frictionProfile._id,
        ...riskCalc,
      });

      patient.activeFrictionProfileId = frictionProfile._id as any;
      patient.activeCareRiskId = careRisk._id as any;
      await patient.save();

      await AuditService.log('PATIENT_PROFILE_UPDATED', 'Patient', req, {
        userId: req.user?._id,
        resourceId: patient._id.toString(),
        details: { frictionScore: frictionCalc.overallFrictionScore },
      });

      res.status(200).json({
        success: true,
        message: 'Patient profile and friction metrics updated successfully.',
        patient,
        frictionProfile,
        careRisk,
        interactions,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Update failed.' });
    }
  }

  public static async getFrictionProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      let patient = await Patient.findOne({ userId: req.user?._id });
      if (!patient) {
        patient = await Patient.findOne({});
      }
      if (!patient) {
        res.status(404).json({ success: false, message: 'Patient profile not found.' });
        return;
      }

      let profile = await FrictionProfile.findOne({ patientId: patient._id }).sort({
        createdAt: -1,
      });

      if (!profile) {
        const frictionCalc = FrictionEngine.calculate(patient.toObject(), null, 30);
        profile = await FrictionProfile.create({
          patientId: patient._id,
          ...frictionCalc,
        });
      }

      const interactions = await FrictionInteraction.find({ patientId: patient._id });

      res.status(200).json({
        success: true,
        frictionProfile: profile,
        interactions,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to fetch friction profile.' });
    }
  }

  public static async getAccessibilityRisk(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      let patient = await Patient.findOne({ userId: req.user?._id });
      if (!patient) {
        patient = await Patient.findOne({});
      }
      if (!patient) {
        res.status(404).json({ success: false, message: 'Patient not found.' });
        return;
      }

      let risk = await CareRisk.findOne({ patientId: patient._id }).sort({ createdAt: -1 });

      if (!risk) {
        const frictionCalc = FrictionEngine.calculate(patient.toObject(), null, 30);
        const riskCalc = RiskEngine.evaluate(frictionCalc);
        risk = await CareRisk.create({
          patientId: patient._id,
          ...riskCalc,
        });
      }

      res.status(200).json({
        success: true,
        careRisk: risk,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to fetch risk.' });
    }
  }

  public static async getCareJourney(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      let patient = await Patient.findOne({ userId: req.user?._id });
      if (!patient) {
        patient = await Patient.findOne({});
      }
      if (!patient) {
        res.status(404).json({ success: false, message: 'Patient not found.' });
        return;
      }

      let journey = await CareJourney.findOne({ patientId: patient._id }).sort({ createdAt: -1 });

      if (!journey) {
        // Initialize 9 standard stages
        const stages = [
          {
            stageName: 'Medical Need',
            order: 1,
            status: 'COMPLETED',
            frictionLevel: 'LOW',
            observedBarrier: 'Symptom recognized by household',
          },
          {
            stageName: 'Hospital Search',
            order: 2,
            status: 'COMPLETED',
            frictionLevel: 'LOW',
            observedBarrier: 'Facility identified via PFIS',
          },
          {
            stageName: 'Travel',
            order: 3,
            status: patient.transportAvailability === 'none' ? 'AT_RISK' : 'IN_PROGRESS',
            frictionLevel: patient.transportAvailability === 'none' ? 'CRITICAL' : 'MEDIUM',
            observedBarrier: '35 km transit across rural roads',
            mitigationSuggestion: 'Community Health Shuttle voucher',
          },
          {
            stageName: 'Transport',
            order: 4,
            status: 'PENDING',
            frictionLevel: 'HIGH',
            observedBarrier: 'Shared auto timetable irregularity',
          },
          {
            stageName: 'Appointment',
            order: 5,
            status: 'PENDING',
            frictionLevel: 'MEDIUM',
            observedBarrier: 'OPD queue token wait time',
          },
          {
            stageName: 'Hospital Visit',
            order: 6,
            status: 'PENDING',
            frictionLevel: 'LOW',
            observedBarrier: 'Registration desk verification',
          },
          {
            stageName: 'Service',
            order: 7,
            status: 'PENDING',
            frictionLevel: 'MEDIUM',
            observedBarrier: 'Diagnostic test routing',
          },
          {
            stageName: 'Treatment',
            order: 8,
            status: 'PENDING',
            frictionLevel: 'LOW',
            observedBarrier: 'Doctor consultation & prescription',
          },
          {
            stageName: 'Follow-up',
            order: 9,
            status: 'PENDING',
            frictionLevel: 'HIGH',
            observedBarrier: 'Repeat 30-day travel fatigue',
          },
        ];

        journey = await CareJourney.create({
          patientId: patient._id,
          stages: stages as any,
          currentStageIndex: 2,
          overallJourneyHealth: 'SLIGHT_FRICTION',
        });
      }

      res.status(200).json({
        success: true,
        careJourney: journey,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Failed to fetch journey.' });
    }
  }
}
