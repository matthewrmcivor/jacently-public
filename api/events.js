export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENWEBNINJA_API_KEY;

  if (!apiKey) {
    console.error('Missing OPENWEBNINJA_API_KEY environment variable');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Forward query parameters to OpenWebNinja
  const searchParams = new URLSearchParams(req.query);
  const url = `https://api.openwebninja.com/realtime-events-data/search-events?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      console.error(`OpenWebNinja API error: ${response.status}`);
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
}
