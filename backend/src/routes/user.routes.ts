import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
    getCurrentUser,
    updateCurrentUser,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controller';
import { validateRequest } from '../middleware/validateRequest';
import { userValidation } from '../validators/user.validation';

const router = Router();

// Apply authentication middleware to all routes
router.use(protect);

// Routes for current user operations
router.route('/me')
    .get(validateRequest(userValidation.getCurrentUser), getCurrentUser)
    .put(validateRequest(userValidation.updateUser), updateCurrentUser);

// Routes for admin operations on other users
router.route('/:id')
    .get(authorize(['admin']), validateRequest(userValidation.getUserById), getUserById)
    .put(authorize(['admin']), validateRequest(userValidation.updateUser), updateUser)
    .delete(authorize(['admin']), validateRequest(userValidation.deleteUser), deleteUser);

export default router;