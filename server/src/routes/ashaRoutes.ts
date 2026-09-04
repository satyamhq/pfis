import { Router } from 'express';
import { AshaController } from '../controllers/ashaController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

// Strict RBAC: Must be authenticated and have role 'asha' (or authorized admin)
router.use(authenticate);
router.use(requireRole('asha'));

router.get('/dashboard', AshaController.getDashboard);
router.get('/patients', AshaController.getPatients);
router.post('/patient-barriers', AshaController.logPatientBarrier);
router.post('/request-transit', AshaController.requestTransit);

export default router;
