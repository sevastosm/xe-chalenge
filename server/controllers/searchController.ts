import { Request, Response } from 'express';
import { getAutocompleteResults } from '../services/autocompleteService';

export async function searchHandler(req: Request, res: Response) {
  try {
    const query = req.query.q as string;
        const results = await getAutocompleteResults(query);
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to perform search' });
  }
} 