import express from 'express';
import {
  authUsers,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUsers);
router.get('/profile', protect, getUserProfile);

export default router;
