import express from 'express';
import { uploadFile, downloadFile } from '../controllers/fileController';
import { signup, login } from '../controllers/authController';
import verifyToken from '../middleware/authMiddleware';

const router = express.Router();

router.post('/upload', uploadFile);
router.get('/download/:fileId', verifyToken, downloadFile);
router.post('/signup', signup);
router.post('/login', login);

export default router;
