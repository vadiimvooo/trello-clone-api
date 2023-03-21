import express from 'express';
import { tasksControllers } from '../controllers/tasks';

export const router = express.Router();

router.get('/', tasksControllers.getMany);
router.post('/', tasksControllers.createTask);
router.delete('/:taskId', tasksControllers.deleteTask);
router.patch('/:taskId', tasksControllers.updateTask);
