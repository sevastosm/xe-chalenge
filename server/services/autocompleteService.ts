import axios from 'axios';
import NodeCache from 'node-cache';

const API_BASE_URL = process.env.API_BASE_URL;
const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

export interface AutocompleteResponse {
  results: string[];
}

export async function getAutocompleteResults(input: string): Promise<AutocompleteResponse> {
  try {
    // Check cache first
    const cacheKey = `autocomplete:${input}`;
    const cachedResults = cache.get<AutocompleteResponse>(cacheKey);
    
    if (cachedResults) {
      return cachedResults;
    }

    // Make API request if not in cache
    const response = await axios.get(`${API_BASE_URL}`, {
      params: { input },
      timeout: 5000 // 5 second timeout
    });

    // Cache the results
    cache.set(cacheKey, response.data);
    
    return response.data;
  } catch (error) {
    console.error('Autocomplete API error:', error);
    throw new Error('Failed to fetch autocomplete results');
  }
} 