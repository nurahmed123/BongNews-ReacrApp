import InfiniteScroll from "react-infinite-scroll-component";
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            loadingWidth: "",
            loadingHeight: ""
        }

        document.title = `${this.props.category === "general" ? "Home" : this.capitalizeFirstLetter(this.props.category)} - BongNews`;
    };

    // async updateNews() {
    //     let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    //     this.setState({
    //         loading: true,
    //         loadingWidth: this.props.width,
    //         loadingHeight: this.props.height
    //     });
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     this.setState({
    //         articles: parsedData.articles,
    //         totalResults: parsedData.totalResults,
    //         loading: false,
    //         page: this.state.page - 2,
    //         loadingWidth: "",
    //         loadingHeight: ""
    //     })
    // }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({
            loading: true,
            loadingWidth: this.props.width,
            loadingHeight: this.props.height
        });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(95);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true,
        //     loadingWidth: this.props.width,
        //     loadingHeight: this.props.height
        // });
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false,
        //     loadingWidth: "",
        //     loadingHeight: ""
        // })

        // TODO: 
        this.updateNews();
    }

    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true,
        //     loadingWidth: this.props.width,
        //     loadingHeight: this.props.height
        // });
        // let data = await fetch(url);
        // let parsedData = await data.json()

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false,
        //     loadingWidth: "",
        //     loadingHeight: ""
        // })

        // TODO: DEMO 
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }


    handleNextClick = async () => {
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

        //     let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        //     this.setState({
        //         loading: true,
        //         loadingWidth: this.props.width,
        //         loadingHeight: this.props.height
        //     });
        //     let data = await fetch(url);
        //     let parsedData = await data.json()

        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false,
        //         loadingWidth: "",
        //         loadingHeight: ""
        //     })
        // }

        // TODO:
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })


    };


    render() {
        return (
            <>
                <h2 className='text-center' >BongNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                <div className="d-flex justify-content-center align-items-center">
                        {this.state.loading && <Spinner width={this.state.loadingWidth} height={this.state.loadingHeight} />}
                    </div>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<div className="d-flex justify-content-center align-items-center">
                        {<Spinner width={this.state.loadingWidth} height={this.state.loadingHeight} />}
                    </div>}
                    scrollableTarget="scrollableDiv"
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url} >
                                    <NewsItem title={`${element.title === null ? element.title : element.title.slice(0, 45)}...`} description={`${element.description === null ? element.description : element.description.slice(0, 80)}...`} imageURL={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                        <button onClick={this.handlePrevClick} disabled={this.state.page <= 1} type="button" className="btn btn-outline-dark"> &larr; Previous</button>
                        <button onClick={this.handleNextClick} disabled={Math.ceil(this.state.page + 1 > this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-outline-dark">Next &rarr;</button>
                    </div> */}
            </>
        )
    }
}
