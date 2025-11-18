import express from 'express';
import { createDroppingPoint, getAllDroppingPoints } from '../controllers/droppingPointController.js';  
import rateLimitMiddleware from '../middleware/rateLimiter.js';

const router = express.Router();    
router.post('/dropping-points', rateLimitMiddleware, createDroppingPoint);
router.get('/dropping-points', rateLimitMiddleware, getAllDroppingPoints);

export default router;