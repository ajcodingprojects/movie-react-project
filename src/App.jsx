import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Button, Card, CardHeader, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Pagination, Skeleton } from "@nextui-org/react";
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
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [isHomePage, setIsHomePage] = useState(true);

  // c032e2d7
  const API_URL = 'https://www.omdbapi.com?apikey=c032e2d7';

  const searchMovies = async (title, extraURI) => {
    setIsLoaded(false);
    const response = await fetch(`${API_URL}&plot=full&s=${title}${extraURI != null ? extraURI : ''}`);
    const data = await response.json();
    setMovies(data.Search);
    if (extraURI == null) {
      setPage(1);
    }
    setMessage('No movies found, please try a different search');
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
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

  const showLoadingOrError = () => {
    return (
      isLoaded ? (
        <div className='empty'>
          <h2>{message}</h2>
        </div>
      ) : (
        <div className='container'>
          <Skeleton className='movie h-24 rounded-lg bg-secondary'></Skeleton>
          <Skeleton className='movie h-24 rounded-lg bg-secondary'></Skeleton>
          <Skeleton className='movie h-24 rounded-lg bg-secondary'></Skeleton>
        </div>
      )
    );
  }

  const showHomePage = () => {
    return (
      <div>
        <Card>
          <CardHeader className='home-page'>
            <h1 className="font-bold text-large">Welcome!</h1>
            <h3 className="font-bold text-large">To begin searching for films, press the button below</h3>
            <Button onClick={() => setIsHomePage(false)}>Begin the hunt</Button>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <>
    <Navbar>
      <NavbarBrand>
        <Image
          width={50}
          alt="FilmHunt logo"
          src="/src/assets/favicon.jpg"
          className='logo-img'
        />
        <p className="font-bold website-title">&nbsp;&nbsp;FilmHunt</p>
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
    {
      isHomePage ?
        showHomePage()
      :
      (
        <>
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
              movies?.length > 0 && isLoaded 
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
              : showLoadingOrError()
            }
            <div className='padding-spacing'>
              <Pagination showControls total={100} isDisabled={message === startingMessage} initialPage={1} page={page} onChange={(p) => { setPage(p); searchMovies(searchTerm, `&page=${p}`);}} />
            </div>
          </Suspense>
        </>
      )
    }
    
  </div>
  </>
  );
}

export default App;
