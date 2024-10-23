const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(cors());

// Route to fetch top headlines by category
app.get('/api/news', async (req, res) => {
  const apiKey = "a5ee5a76d7b54444b72e12e733b19dfa";
  // const apiKey = process.env.REACT_APP_API_KEY;
  const { category } = req.query;
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news' });
  }
});

// Route to search for news articles
app.get('/api/search', async (req, res) => {
  const apiKey = "a5ee5a76d7b54444b72e12e733b19dfa"; 
  // const apiKey = process.env.REACT_APP_API_KEY; 
  const { query } = req.query; // Get the search query from the request
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`; // Construct the search API URL

  try {
    const response = await axios.get(url);
    res.json(response.data); // Send the search results back to the client
  } catch (error) {
    res.status(500).json({ error: 'Error fetching search results' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
