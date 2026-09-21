require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const API_KEY = process.env.CURRENCY_API_KEY;

console.log("API key loaded:", API_KEY ? "YES" : "NO");

app.get("/currency", async (req, res) => {
  try {
    // Call Currency API v3 endpoint
    const response = await axios.get("https://api.currencyapi.com/v3/latest", {
      params: {
        apikey: API_KEY,
        base_currency: "USD",
        currencies: "MYR",
      },
    });

    // Safely extract MYR exchange rate
    const rate = response.data?.data?.MYR?.value;

    if (!rate) {
      throw new Error("MYR rate missing from API response.");
    }

    // Display result as HTML
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Currency Exchange Rate</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f2f2f2; text-align: center; padding-top: 80px; }
          .container { background-color: white; width: 450px; margin: auto; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
          h1 { color:#333; }
          .rate { font-size: 32px; font-weight: bold; margin: 25px 0; color:#2e7d32; }
          .date { color:#666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Currency Exchange Rate</h1>
          <div class="rate">
            1 USD = RM ${rate.toFixed(2)}
          </div>
          <p class="date">United States Dollar → Malaysian Ringgit</p>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Currency API Error:", error.response?.data || error.message);
    res.status(500).send(`
      <h1>Error</h1>
      <p>Unable to retrieve currency exchange data. Please check your API key and network connection.</p>
    `);
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/currency");
});