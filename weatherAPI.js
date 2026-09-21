const http = require('http');

const PORT = 3000;
// Real public API: Live weather forecast for London (Lat: 51.5074, Long: -0.1278)
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=4.5975&longitude=101.0901&current=temperature_2m,relative_humidity_2m,wind_speed_10m';

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  try {
    // Fetch real live weather data from Open-Meteo
    const response = await fetch(WEATHER_API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;
    const units = data.current_units;

    // Build the web page output with live data
    const htmlOutput = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Real-Time Ipoh Weather</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 40px; }
            .card { background: #1e293b; border-radius: 12px; padding: 24px; max-width: 400px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5); }
            h1 { font-size: 24px; margin-bottom: 8px; color: #38bdf8; }
            .time { font-size: 12px; color: #94a3b8; margin-bottom: 20px; }
            .metric { display: flex; justify-content: space-between; border-bottom: 1px solid #334155; padding: 12px 0; }
            .val { font-weight: bold; color: #f1f5f9; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>📍 Malaysia IPOH Live Weather</h1>
            <div class="time">Last Updated: ${current.time}</div>
            
            <div class="metric">
              <span>Temperature</span>
              <span class="val">${current.temperature_2m} ${units.temperature_2m}</span>
            </div>
            
            <div class="metric">
              <span>Humidity</span>
              <span class="val">${current.relative_humidity_2m} ${units.relative_humidity_2m}</span>
            </div>
            
            <div class="metric">
              <span>Wind Speed</span>
              <span class="val">${current.wind_speed_10m} ${units.wind_speed_10m}</span>
            </div>
          </div>
        </body>
      </html>
    `;

    res.statusCode = 200;
    res.end(htmlOutput);

  } catch (error) {
    res.statusCode = 500;
    res.end(`<h1>Error</h1><p>${error.message}</p>`);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});