import { Router } from 'express';
import { GovernmentController } from '../controllers/governmentController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

// Strict RBAC: Must be authenticated and have role 'government' (or authorized admin)
router.use(authenticate);
router.use(requireRole('government'));

router.get('/dashboard', GovernmentController.getDashboard);
router.get('/friction-map', GovernmentController.getFrictionMap);
router.get('/interventions', GovernmentController.getInterventions);
router.post('/interventions/policy-action', GovernmentController.recordPolicyAction);

export default router;
