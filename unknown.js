const http = require('http');

const PORT = 3000;
const PUBLIC_API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

// Create a local HTTP server
const server = http.createServer(async (req, res) => {
  // Set headers to serve HTML content
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  try {
    // 1. Fetch data from the public Web API using native fetch
    const apiResponse = await fetch(PUBLIC_API_URL);
    
    if (!apiResponse.ok) {
      throw new Error(`API responded with status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();

    // 2. Build HTML response containing the API data
    const htmlOutput = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Node.js Web API Output</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background-color: #f4f4f9; }
            .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 500px; }
            h1 { color: #333; font-size: 20px; }
            p { color: #666; line-height: 1.5; }
            .tag { background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="tag">Post ID: ${data.id}</span>
            <h1>${data.title}</h1>
            <p>${data.body}</p>
          </div>
        </body>
      </html>
    `;

    // 3. Send the HTML result back to the browser
    res.statusCode = 200;
    res.end(htmlOutput);

  } catch (error) {
    // Handle error if API fetch fails
    res.statusCode = 500;
    res.end(`<h1>Error fetching API data</h1><p>${error.message}</p>`);
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running! View result in browser at: http://localhost:${PORT}`);
});