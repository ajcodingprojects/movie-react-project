import React, { Suspense, useState, useEffect } from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Pagination} from "@nextui-org/react";
import SearchIcon from './assets/search.svg'
import MovieCard from './components/movie-card'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageNav, setPageNav] = useState({prev: false, next: false});

  // c032e2d7
  const API_URL = 'http://www.omdbapi.com?apikey=c032e2d7';

  const searchMovies = async (title, extraURI) => {
    const response = await fetch(`${API_URL}&s=${title}${extraURI != null ? extraURI : ''}`);
    const data = await response.json();
    setMovies(data.Search);
    if (extraURI == null) {
      setPage(1);
      setPageNav({prev: false, next: data.Search?.length >= 10});
    }
  }

  useEffect(() => {
      searchMovies('');
  }, []);

  return (
    <>
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">FilmHunt</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          The place for all your movie needs
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
          <div class="middle-div">
            <div class="loading-grid">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
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
            <div className='container'>
              {
                movies.map((m, idx) => (
                    <MovieCard key={idx} movie={m} />
                ))
              }
            </div>
          )
        :
          (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }
    </Suspense>
    <div className='padding-spacing'>
      <Pagination showControls total={100} initialPage={1} page={page} onChange={(p) => searchMovies(searchTerm, `&page=${p}`)} />
    </div>
  </div>
  </>
  );
}

export default App
