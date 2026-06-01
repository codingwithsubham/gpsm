const http = require('http');

const PORT = 3000;

// 1. DATA RESOURCE
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

// 2. SERVER CREATION
const server = http.createServer((req, res) => {
  // Handle GET requests to /api/users
  if (req.method === 'GET' && req.url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } 
  // Handle fallback for unknown routes
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

// 3. START SERVER & CONSUME IT IMMEDIATELY
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("------------------------------------------");

  // Client Request: Hit the API endpoint we just created
  http.get(`http://localhost:${PORT}/api/users`, (res) => {
    let rawData = '';
    
    res.on('data', (chunk) => { rawData += chunk; });
    
    res.on('end', () => {
      const parsedData = JSON.parse(rawData);
      console.log("Client Received API Response:", parsedData);
      
      // Stop the server and exit the process safely
      server.close();
    });
  });
});
