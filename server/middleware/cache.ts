import NodeCache from 'node-cache';

// This middleware function is used to cache the results of API requests.
// It uses the NodeCache library to store the results in memory for a specified duration (5 minutes in this case).
// When a request is made, it first checks if the result is already in the cache.
// If it is, it returns the cached result instead of making a new API request.
// If it is not, it proceeds with the API request and stores the result in the cache before sending the response to the client.
// This helps to reduce the number of API requests and improve the performance of the application.



const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

export function cacheMiddleware(req: any, res: any, next: any) {
  const query = req.query.q;
  const cacheKey = `input:${query}`;

  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    return res.json(cachedResult);
  }

  // Store the original send function
  const originalSend = res.json;
  res.json = function(body: any) {
    cache.set(cacheKey, body);
    return originalSend.call(this, body);
  };

  next();
} 