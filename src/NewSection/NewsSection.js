import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewSection.css';
const NewsSection = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/news'); // Point to your backend route
                setNews(response.data);
            } catch (err) {
                console.log(err);
                setError('Failed to load news');
            }
        };
        fetchNews();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div className='latest-news-main'>
            <h2 className='latest-news-header'>Latest News</h2>
            <div className='latest-news-container'>
                {news.map((article, index) => (
                    <div className='latest-news-articles' key={index}>
                        <h3 className='latest-news-title'>{article.title}</h3>
                         <hr/>
                        <p className='latest-news-source'>Source: {article.source.name}</p>
                        <p className='latest-news-date'>Date Published:{new Date(article.publishedAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
