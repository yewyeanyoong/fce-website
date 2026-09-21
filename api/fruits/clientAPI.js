// client.js

// 1. Send an HTTP GET request to the API endpoint
fetch('http://localhost:3000/api/fruits')
  .then(response => {
    // 2. Convert the incoming JSON string back into a JavaScript array
    return response.json(); 
  })
  .then(data => {
    // 3. Work with the resulting data
    console.log("Data received from API:", data);
    console.log("First fruit:", data[0].name); // Output: Apple
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });