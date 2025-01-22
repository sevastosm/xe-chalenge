import { Router } from 'express';
import { createAd, updateAd, deleteAd, getAd, getAllAds } from '../controllers/adController';
import { validateAdInput } from '../middleware/validation';

const router = Router();

router.post('/ads', validateAdInput, createAd);
router.put('/ads/:id', validateAdInput, updateAd);
router.delete('/ads/:id', deleteAd);
router.get('/ads/:id', getAd);
router.get('/ads', getAllAds);

export default router; 