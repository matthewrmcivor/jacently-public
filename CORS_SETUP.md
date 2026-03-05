# CORS Setup Guide

## Problem

Many open data APIs (like Miami's city API) block direct browser requests due to CORS (Cross-Origin Resource Sharing) policies. This is a security feature that prevents websites from making unauthorized requests to other domains.

## Solutions

### ✅ Solution 1: Vite Proxy (Development - Already Configured)

The Vite dev server is configured to proxy API requests, avoiding CORS issues in development.

**How it works:**
- Requests to `/api/city-events` are proxied to `https://www.miamigov.com/api/events`
- The service automatically uses the proxy in development mode
- No code changes needed!

**To test:**
1. Make sure your dev server is running (`npm run dev`)
2. The app should now fetch city events without CORS errors

### ✅ Solution 2: Backend Proxy (Production - Required)

For production, you **must** set up a backend proxy server because:
- Vite proxy only works in development
- Public CORS proxies are unreliable and insecure
- You need server-side API keys and rate limiting

**Implementation options:**

#### Option A: Express.js Backend Proxy

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/api/city-events', async (req, res) => {
  try {
    const response = await fetch('https://www.miamigov.com/api/events');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.listen(3001);
```

#### Option B: Vercel/Netlify Serverless Functions

```javascript
// api/city-events.js (Vercel)
export default async function handler(req, res) {
  const response = await fetch('https://www.miamigov.com/api/events');
  const data = await response.json();
  res.json(data);
}
```

**Then update `cityConfigs` in production:**
```typescript
miami: {
  city: 'Miami',
  state: 'FL',
  endpoint: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend.com/api/city-events'
    : '/api/city-events' // Vite proxy in dev
}
```

### ❌ Solution 3: Public CORS Proxy (Not Recommended)

Public CORS proxies are:
- Unreliable and slow
- May log your requests
- Not suitable for production
- Can be blocked by APIs

Only use for quick testing if absolutely necessary.

## Current Status

- ✅ Vite proxy configured for development
- ✅ Services handle CORS errors gracefully
- ✅ App falls back to mock data if APIs fail
- ⚠️ Production backend proxy needed before deployment

## Testing

1. **Development**: The Vite proxy should work automatically
2. **If you still see CORS errors:**
   - Check that the dev server is running
   - Verify the proxy configuration in `vite.config.ts`
   - Check browser console for specific error messages

## Next Steps

Before deploying to production:
1. Set up a backend API (Express, serverless function, etc.)
2. Update `cityConfigs` to use your backend endpoint
3. Test the backend proxy
4. Remove any public CORS proxy usage


