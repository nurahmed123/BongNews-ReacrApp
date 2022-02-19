import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default function App() {
  // APIKey = "a6e5323a24724dc5b9b7d6d7d06540f7";
  // APIKey = "631da6f41c5e4408ad98e17329ccb61a";
  const APIKey = process.env.REACT_APP_BONG_NEWS;
  const countryKey = "bg";
  const pageItem = 8;
  const height = "65vh";

  const [progress, setProgress] = useState(0)



  return (
    <>
      <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={pageItem} width="100vw" height={height} apiKey={APIKey} country={countryKey} category="general" />} />
            <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageItem} width="100vw" height={height} apiKey={APIKey} country={countryKey} category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageItem} width="100vw" height={height} apiKey={APIKey} country={countryKey} category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageItem} width="100vw" height={height} apiKey={APIKey} country={countryKey} category="health" />} />
            <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageItem} width="100vw" height={height} apiKey={APIKey} country={countryKey} category="science" />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageItem} width="100vw" height={height} apiKey={APIKey} country={countryKey} category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageItem} width="100vw" height={height} apiKey={APIKey} country={countryKey} category="technology" />} />
          </Routes>
        </div>
      </Router>
    </>
  )

}
