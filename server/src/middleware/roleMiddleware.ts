import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware.js';
import { UserRole } from '../models/User.js';
import { isAuthorizedAdminEmail } from '../config/env.js';
import { AuditService } from '../services/auditService.js';

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required to access this resource.',
      });
      return;
    }

    const isExplicitlyAllowed = allowedRoles.includes(req.user.role);
    const isAuthorizedAdmin = req.user.role === 'admin' && isAuthorizedAdminEmail(req.user.email);

    // If role matches or is verified authorized admin
    if (isExplicitlyAllowed || isAuthorizedAdmin) {
      return next();
    }

    res.status(403).json({
      success: false,
      message: `Access denied. Authorized roles: [${allowedRoles.join(', ')}]. Current role: [${
        req.user?.role || 'unauthenticated'
      }].`,
    });
  };
};

/**
 * Strict RBAC Middleware for Administrative Access
 * Enforces dual verification:
 * 1. Database user role must be 'admin'
 * 2. User email must match the cryptographically verified authorized administrator whitelist
 */
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required. Please sign in as an authorized administrator.',
    });
    return;
  }

  const isRoleAdmin = req.user.role === 'admin';
  const isWhitelisted = isAuthorizedAdminEmail(req.user.email);

  if (!isRoleAdmin || !isWhitelisted) {
    AuditService.log('SECURITY_UNAUTHORIZED_ADMIN_ATTEMPT', 'admin_access_control', req, {
      userId: req.user._id || req.user.id,
      details: {
        attemptedEmail: req.user.email,
        claimedRole: req.user.role,
        route: req.originalUrl,
        ip: req.ip,
      },
    }).catch(() => {});

    res.status(403).json({
      success: false,
      message: 'Access Forbidden: Administrative privileges are restricted to verified personnel only.',
    });
    return;
  }

  next();
};

