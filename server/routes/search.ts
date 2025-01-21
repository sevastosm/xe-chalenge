import { Router } from 'express';
import { searchHandler } from '../controllers/searchController';
import { validateSearchQuery } from '../middleware/validation';
import { cacheMiddleware } from '../middleware/cache';

const router = Router();

router.get('/search', validateSearchQuery, cacheMiddleware, searchHandler);

export default router; 