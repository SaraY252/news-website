const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const app = express();
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour
const API_KEY = '5ac6264246a841a6bc59f0b4b89a7218'; // Replace with your News API key
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const cors = require('cors');

app.use(cors());

app.get('/news', async (req, res) => {
    const cachedNews = cache.get('newsData');
    if (cachedNews) {
        return res.json(cachedNews);
    }

    try {
        const response = await axios.get(NEWS_API_URL);
        const newsData = response.data.articles.slice(0, 5); // Fetch only 5 headlines
        cache.set('newsData', newsData); // Cache the response
        res.json(newsData);
    } catch (error) {
        console.error("Error fetching news:",error);
        res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
