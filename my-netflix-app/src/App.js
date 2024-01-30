// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import _debounce from 'lodash/debounce';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearch = _debounce((query) => {
    fetchData(query);
  }, 300);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const fetchData = async (query) => {
    const apiKey = '69a6237ce6938d2fb74092f8ff3a8f16';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1`;

    try {
      const response = await axios.get(apiUrl);
      const searchData = response.data.results;
      setSearchResults(searchData);
    } catch (error) {
      console.error('Error fetching search data:', error);
    }
  };

  return (
    <div className="app">
      <div style={{height: "100dvh", width: "100dvw", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div>
      {/* Logo */}
      <div className="logo-container">
        <h1>LOGO FALAN YOK ŞU AN</h1>
        {/* <img
          className="logo"
          src="https://example.com/your-logo.png"
          alt="Your Logo"
        /> */}
      </div>

      {/* Search Bar */}
      <div className="search-container" style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <input
        style={{width: "70%"}}
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
        style={{width: "20%"}} className="search-button" onClick={() => fetchData(searchQuery)}>
          Search
        </button>
        
      </div>
      <div style={{height: "30vh", width: "100%", overflowY: "auto", position: "relative"}}>
        {/* Display Search Results */}
      <div className="search-results" style={{position: "absolute", marginLeft: "5%"}}>
        {searchResults.map((result) => (
          <div key={result.id} onClick={()=>{window.location.href = `https://vidsrc.xyz/embed/movie/${result.id}`}} className="search-result" style={{width: "50%", display: "flex", alignItems: "center", border: "1px solid black", padding: "1rem"}}>
            <img
              className="result-image"
              src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
              alt={result.title}
            />
            <p style={{marginLeft: "3%"}}>{result.title}</p>
          </div>
        ))}
      </div>
        </div>
      </div>
      </div>
      
    </div>
  );
}

export default App;
