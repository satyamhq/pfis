import { Router } from 'express';
import { DoctorController } from '../controllers/doctorController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

// Strict RBAC: Must be authenticated and have role 'doctor' (or authorized admin)
router.use(authenticate);
router.use(requireRole('doctor'));

router.get('/dashboard', DoctorController.getDashboard);
router.get('/patients', DoctorController.getPatients);
router.get('/patients/:id', DoctorController.getPatientById);
router.post('/patients/:id/journey-update', DoctorController.updatePatientJourney);

export default router;
