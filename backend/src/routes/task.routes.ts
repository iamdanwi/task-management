import { Router } from 'express';
import { protect } from '../middleware/auth';
import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    updateTaskDependencies
} from '../controllers/task.controller';

const router = Router();

router.use(protect);

router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

router.route('/:id/dependencies')
    .put(updateTaskDependencies);

export default router;