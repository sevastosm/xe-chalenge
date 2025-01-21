import { Router } from 'express';
import { getAutocompleteResults } from '../services/autocompleteService';
const router = Router();

router.get('/autocomplete', async (req, res) => {
  try {
    const input = req.query.input as string;
    
    if (!input || input.trim().length === 0) {
      return res.status(400).json({ error: 'Input parameter is required' });
    }

    const results = await getAutocompleteResults(input);
    res.json(results);
  } catch (error) {
    console.error('Autocomplete route error:', error);
    res.status(500).json({ error: 'Failed to get autocomplete results' });
  }
});

export default router; 