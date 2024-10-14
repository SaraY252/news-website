const express= require('express');
const axios= require('axios');
const NodeCache=require('node-cache');
const cors= require("cors");
const app= express();
const NEWS_API_URL= `https://newsapi.org/v2/top-headlines?country=us&apiKey=5ac6264246a841a6bc59f0b4b89a7218`;

app.use(cors());
app.get('/news',async(res)=>{
    const cachedNews=cache.get('newsData');
    if(cachedNews){
        return res.json(cachedNews);
    }
    try{
        const response= await axios.get(NEWS_API_URL);
        const newsData= response.data.articles.slice(0,5); //=>To fetch 5 headlines
        cahce.set('newsData',newsData);
        res.json(newsData);
    }
    catch(error){
        console.error('Error fetching news: ',error);
        res.status(500).json({message: 'Error fetching news',error: error.message});
    }
});
const PORT= process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));