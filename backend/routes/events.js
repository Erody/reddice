import express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.post('/', authenticate, (req, res) => {
	res.status(201).json({ success: true });
});

export default router;