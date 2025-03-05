import { Router } from 'express';
import { protect } from '../middleware/auth';
import {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
} from '../controllers/project.controller';

const router = Router();

router.use(protect);

router.route('/')
    .get(getProjects)
    .post(createProject);

router.route('/:id')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject);

export default router;