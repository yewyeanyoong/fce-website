// server.js
const express = require('express');
const app = express();

// A simple fake database of items
const fruits = [
  { id: 1, name: "Apple", color: "Red" },
  { id: 2, name: "Banana", color: "Yellow" }
];

// Define an API endpoint: GET /api/fruits
app.get('/api/fruits', (req, res) => {
  // res.json() sends the JavaScript object as a JSON response
  res.json(fruits);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});