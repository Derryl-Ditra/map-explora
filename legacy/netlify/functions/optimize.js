// Netlify function: proxy optimization requests to a third-party optimization API.
// Expects POST body with at least { vehicles: [...], stops: [...], constraints: {...} }
// Set environment variable OPTIMIZER_API_KEY in Netlify site settings.

exports.handler = async function(event, context) {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { 'Allow': 'POST' }, body: 'Method Not Allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const API_KEY = process.env.OPTIMIZER_API_KEY;
  if (!API_KEY) {
    return { statusCode: 500, body: 'OPTIMIZER_API_KEY not configured' };
  }

  const endpoint = (process.env.OPTIMIZER_ENDPOINT && process.env.OPTIMIZER_ENDPOINT.trim() !== '')
    ? process.env.OPTIMIZER_ENDPOINT.trim()
    : 'https://api.example.com/v1/optimization/jobs';

  try {
    // Forward the payload to the configured endpoint. Adjust mapping here as needed.
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // If the provider returns a job ID and async processing, try to poll for a short period
    if (data.job_id && data.status && data.status !== 'completed') {
      const jobId = data.job_id;
      const pollUrl = `${endpoint}/${jobId}`; // assumes GET job endpoint
      const maxAttempts = 6;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      let final = data;
      for (let i = 0; i < maxAttempts; i++) {
        await delay(1500);
        try {
          const r = await fetch(pollUrl, { headers: { 'Authorization': `Bearer ${API_KEY}` } });
          if (r.ok) {
            const j = await r.json();
            final = j;
            if (j.status === 'completed' || j.status === 'done' || j.status === 'finished') {
              break;
            }
          }
        } catch (e) {
          // continue polling
        }
      }
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(final)
      };
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error('Optimize proxy error', err);
    return { statusCode: 502, headers: { 'Access-Control-Allow-Origin': '*' }, body: String(err) };
  }
};
