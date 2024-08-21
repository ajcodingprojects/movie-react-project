import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Pagination } from "@nextui-org/react";
import SearchIcon from './assets/search.svg'
import MovieCard from './components/movie-card'
import './App.css'

function App() {
  const startingMessage = 'Search to find movies';
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState(startingMessage);
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermRef = useRef(searchTerm);
  const [page, setPage] = useState(1);

  // c032e2d7
  const API_URL = 'http://www.omdbapi.com?apikey=c032e2d7';

  const searchMovies = async (title, extraURI) => {
    const response = await fetch(`${API_URL}&plot=full&s=${title}${extraURI != null ? extraURI : ''}`);
    const data = await response.json();
    setMovies(data.Search);
    if (extraURI == null) {
      setPage(1);
    }
    setMessage('No movies found, please try a different search');
  }

  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

  useEffect(() => {
      const keyDownHandler = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          searchMovies(searchTermRef.current);
          setPage(1);
        }
      };
  
      document.addEventListener('keydown', keyDownHandler);

      return () => {
        document.removeEventListener('keydown', keyDownHandler); // Clean up event listener on unmount
      };
  }, []);

  return (
    <>
    <Navbar>
      <NavbarBrand>
        <p className="font-bold website-title">FilmHunt</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          The place for all your movie searching needs
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
      </NavbarContent>
    </Navbar>
  <div className="app">

    <div className='search'>
      <input
        placeholder='Search for movies' 
        value={searchTerm}
        onChange={(event)=> setSearchTerm(event.target.value)}
      />
      <img 
        src={SearchIcon}
        alt='search'
        onClick={()=> searchMovies(searchTerm)}
      />
    </div>
    
    <Suspense fallback={(
      <>
        <div className="loading-overlay">
          <div className="middle-div">
            <div className="loading-grid">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div> 
            <div>
            <p>Loading...</p>
            </div>    
          </div>   
        </div>
      </>
    )}
    >
      {
        movies?.length > 0 
        ?
          (
            <>
              <div className='container'>
                {
                  movies.map((m, idx) => (
                      <MovieCard key={idx} movie={m} />
                  ))
                }
              </div>
            </>
          )
        :
          (
            <div className='empty'>
              <h2>{message}</h2>
            </div>
          )
      }
      <div className='padding-spacing'>
        <Pagination showControls total={100} isDisabled={message === startingMessage} initialPage={1} page={page} onChange={(p) => { setPage(p); searchMovies(searchTerm, `&page=${p}`);}} />
      </div>
    </Suspense>
  </div>
  </>
  );
}

export default App;
