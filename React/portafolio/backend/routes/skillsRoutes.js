import express from 'express';
import { getSkills, addSkill, deleteSkill } from '../controllers/skillsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSkills);
router.post('/', protect, admin, addSkill);
router.delete('/:id', protect, admin, deleteSkill);

export default router;
