export default async function handler(req, res) {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: { message: "Missing q" } });

    const key = process.env.WEATHER_API_KEY;
    if (!key) return res.status(500).json({ error: { message: "API key missing" } });

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&days=1&aqi=no&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: { message: "Server error" } });
  }
}