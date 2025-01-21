import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

export function cacheMiddleware(req: any, res: any, next: any) {
  const query = req.query.q;
  const cacheKey = `search:${query}`;

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