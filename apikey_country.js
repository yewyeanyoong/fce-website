require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const API_KEY = process.env.CURRENCY_API_KEY;

console.log("API key loaded:", API_KEY ? "YES" : "NO");

// Fetch the list of available currencies from the API
async function getCurrencies() {
  const response = await axios.get("https://api.currencyapi.com/v3/currencies", {
    params: { apikey: API_KEY },
  });
  return response.data.data; // Returns object with codes like { USD: {...}, MYR: {...} }
}

app.get("/currency", async (req, res) => {
  const baseCurrency = (req.query.base || "USD").toUpperCase();
  const targetCurrency = (req.query.target || "MYR").toUpperCase();

  try {
    // 1. Fetch available currencies for the dropdowns
    const currenciesData = await getCurrencies();
    const currencyCodes = Object.keys(currenciesData).sort();

    // 2. Fetch the conversion rate for the selected base & target
    const rateResponse = await axios.get("https://api.currencyapi.com/v3/latest", {
      params: {
        apikey: API_KEY,
        base_currency: baseCurrency,
        currencies: targetCurrency,
      },
    });

    const rate = rateResponse.data?.data?.[targetCurrency]?.value;

    // Build <option> elements for dropdowns
    const baseOptions = currencyCodes
      .map(
        (code) =>
          `<option value="${code}" ${code === baseCurrency ? "selected" : ""}>${code} - ${currenciesData[code].name}</option>`
      )
      .join("");

    const targetOptions = currencyCodes
      .map(
        (code) =>
          `<option value="${code}" ${code === targetCurrency ? "selected" : ""}>${code} - ${currenciesData[code].name}</option>`
      )
      .join("");

    // 3. Render HTML page
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Currency Exchange Rate</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f2f2f2; text-align: center; padding-top: 60px; }
          .container { background-color: white; width: 480px; margin: auto; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
          h1 { color: #333; margin-bottom: 20px; }
          form { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }
          .select-group { display: flex; justify-content: space-between; align-items: center; text-align: left; }
          label { font-weight: bold; width: 40%; color: #555; }
          select { width: 55%; padding: 8px; border-radius: 5px; border: 1px solid #ccc; font-size: 14px; }
          button { padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; }
          button:hover { background-color: #0056b3; }
          .rate { font-size: 28px; font-weight: bold; margin: 20px 0; color: #2e7d32; }
          .date { color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Currency Converter</h1>
          <form action="/currency" method="GET">
            <div class="select-group">
              <label for="base">From (Base):</label>
              <select name="base" id="base">${baseOptions}</select>
            </div>
            <div class="select-group">
              <label for="target">To (Target):</label>
              <select name="target" id="target">${targetOptions}</select>
            </div>
            <button type="submit">Convert</button>
          </form>

          ${
            rate
              ? `<div class="rate">1 ${baseCurrency} = ${rate.toFixed(4)} ${targetCurrency}</div>`
              : `<p style="color: red;">Unable to fetch rate for ${baseCurrency} to ${targetCurrency}</p>`
          }

          <p class="date">${currenciesData[baseCurrency]?.name || baseCurrency} → ${currenciesData[targetCurrency]?.name || targetCurrency}</p>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).send(`
      <h1>Error</h1>
      <p>Unable to retrieve currency exchange data. Please check your API key or parameters.</p>
    `);
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/currency");
});