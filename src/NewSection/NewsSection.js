import React , {useState,useEffect} from 'react';
import './NewSection.css';
import axios from 'axios';
const NewsSection = () => {
    const [news,setNews]= useState([]);
    const [error,setError]= useState(null);

    useEffect(()=>{
        const fetchNews= async() =>{
            try{
                const response=await axios.get('http://localhost:5000/news');
                setNews(response.data);
            }
            catch(err){
                // console.log(err);
                setError('Failed to load data');
            }
        }
        fetchNews();
    },[]);
    //[] means that the data will be rendered only one time
    
    if(error) return <p>{error}</p>;

    return(
        <div className='latest-news-main'>
            <h2 className='latest-news-header'>Latest News</h2>
            <div className='latest-news-container'>
                {news.map((article,index) => (
                    <div className='latest-news-articles' id={index}>
                        <h3 className='latest-new-title'>{article.title}</h3>
                        <hr/>
                        <p className='latest-news-source'>
                            Source: {article.source.name}
                        </p>
                        <p className='latest-news-date'>
                            Date Published: {new Date(article.publishedAt).toLocaleDateString()}
                        </p>
                        </div>
                )
              )
            }
            </div>
        </div>
    );
};
export default NewsSection;