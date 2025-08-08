import express from 'express';
import { shortenUrl, redirectToLongUrl } from '../controllers/urlController';
import { login, register } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/shorten', authenticateJWT, shortenUrl);
router.get('/:shortId', redirectToLongUrl);
router.post('/register', register);
router.post('/login', login);

export default router;