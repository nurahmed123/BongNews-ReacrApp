import InfiniteScroll from "react-infinite-scroll-component";
import React, { useEffect, useState } from "react";
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default function News(props) {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [loadingWidth, setLoadingWidth] = useState("")
    const [loadingHeight, setLoadingHeight] = useState("")
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        setLoading(true);
        setLoadingWidth(props.width);
        setLoadingHeight(props.height)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(95);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${props.category === "general" ? "Home" : capitalizeFirstLetter(props.category)} - BongNews`;
        updateNews();
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };


    return (
        <>
            <h2 className='text-center' style={{marginTop: "5rem"}} >BongNews - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            <div className="d-flex justify-content-center align-items-center">
                {loading && <Spinner width={loadingWidth} height={loadingHeight} />}
            </div>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<div className="d-flex justify-content-center align-items-center">
                    {<Spinner width={loadingWidth} height={loadingHeight} />}
                </div>}
                scrollableTarget="scrollableDiv"
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4 my-3" key={element.url} >
                                <NewsItem title={`${element.title === null ? element.title : element.title.slice(0, 45)}...`} description={`${element.description === null ? element.description : element.description.slice(0, 80)}...`} imageURL={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        </>
    )

    News.defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
}
