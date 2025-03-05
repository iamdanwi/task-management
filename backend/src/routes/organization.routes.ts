import { Router } from 'express';
import { protect } from '../middleware/auth';
import {
    createOrganization,
    getOrganizations,
    getOrganization,
    updateOrganization,
    deleteOrganization
} from '../controllers/organization.controller';

const router = Router();

router.use(protect);

router.route('/')
    .get(getOrganizations)
    .post(createOrganization);

router.route('/:id')
    .get(getOrganization)
    .put(updateOrganization)
    .delete(deleteOrganization);

export default router;