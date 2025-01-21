import { Request, Response, NextFunction } from 'express';

export function validateSearchQuery(req: Request, res: Response, next: NextFunction) {
  const query = req.query.q;
  
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  next();
} 