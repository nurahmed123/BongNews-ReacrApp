import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {

  APIKey = process.env.REACT_APP_BONG_NEWS;
  countryKey = "bg";
  pageItem = 8;
  height = "65vh";

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<News  setProgress = {this.setProgress} key="general" pageSize={this.pageItem} width="100vw" height={this.height} apiKey={this.APIKey} country={this.countryKey} category="general" />} />
              <Route exact path="/business" element={<News  setProgress = {this.setProgress} key="business" pageSize={this.pageItem} width="100vw" height={this.height} apiKey={this.APIKey} country={this.countryKey} category="business" />} />
              <Route exact path="/entertainment" element={<News  setProgress = {this.setProgress} key="entertainment" pageSize={this.pageItem} width="100vw" height={this.height} apiKey={this.APIKey} country={this.countryKey} category="entertainment" />} />
              <Route exact path="/health" element={<News  setProgress = {this.setProgress} key="health" pageSize={this.pageItem} width="100vw" height={this.height} apiKey={this.APIKey} country={this.countryKey} category="health" />} />
              <Route exact path="/science" element={<News  setProgress = {this.setProgress} key="science" pageSize={this.pageItem} width="100vw" height={this.height} apiKey={this.APIKey} country={this.countryKey} category="science" />} />
              <Route exact path="/sports" element={<News  setProgress = {this.setProgress} key="sports" pageSize={this.pageItem} width="100vw" height={this.height} apiKey={this.APIKey} country={this.countryKey} category="sports" />} />
              <Route exact path="/technology" element={<News  setProgress = {this.setProgress} key="technology" pageSize={this.pageItem} width="100vw" height={this.height} apiKey={this.APIKey} country={this.countryKey} category="technology" />} />
            </Routes>
          </div>
        </Router>
      </>
    )
  }
}
