import express from 'express';
import { getProjects, addProject, updateProject, deleteProject } from '../controllers/projectsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', protect, admin, addProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, deleteProject);

export default router;
