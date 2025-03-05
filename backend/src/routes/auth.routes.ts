import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
    register,
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword
} from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validateRequest';
import { authValidation } from '../validators/auth.validation';

const router = Router();

// Configure rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: { status: 'error', message: 'Too many requests, please try again later.' }
});

// Apply rate limiting to sensitive routes
router.post('/register', validateRequest(authValidation.register), register);
router.post('/login', authLimiter, validateRequest(authValidation.login), login);
router.post('/logout', validateRequest(authValidation.logout), logout);
router.post('/refresh-token', validateRequest(authValidation.refreshToken), refreshToken);
router.post('/forgot-password', authLimiter, validateRequest(authValidation.forgotPassword), forgotPassword);
router.post('/reset-password', authLimiter, validateRequest(authValidation.resetPassword), resetPassword);

export default router;