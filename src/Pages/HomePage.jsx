import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import Result from './Result';
import Search from './Search';

function HomePage() {
  const [state, setState] = useState({
    search: '',
    results: [],
    selected: {},
  });

  // Fetch initial movie data on page load
  useEffect(() => {
    axios
      .get('https://www.omdbapi.com/?apikey=b5382e81&type=movie&s=spider')
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          results: res.data.Search || [],
        }));
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle search input changes
  const handleInput = (event) => {
    setState((prevState) => ({
      ...prevState,
      search: event.target.value,
    }));
  };

  // Open details of the selected movie
  const openDetails = (id) => {
    axios
      .get(`https://www.omdbapi.com/?i=${id}&apikey=b5382e81`)
      .then(({ data }) => {
        setState((prevState) => ({
          ...prevState,
          selected: data,
        }));
      })
      .catch((err) => console.error(err));
  };

  // Search result when "Enter" key is pressed
  const SearchResult = (event) => {
    if (event.key === 'Enter' && state.search.trim() !== '') {
      axios
        .get(`https://www.omdbapi.com/?apikey=b5382e81&s=${state.search}`)
        .then((res) => {
          setState((prevState) => ({
            ...prevState,
            results: res.data.Search || [],
          }));
        })
        .catch((err) => console.error(err));
    }
  };

  // Close movie details view
  const close = () => {
    setState((prevState) => ({
      ...prevState,
      selected: {},
    }));
  };

  return (
    <div className="w-100 main-wrapper d-flex flex-column align-items-center min-vh-100">
      {/* Conditional rendering based on whether a movie is selected */}
      {state.selected.Title ? (
        <MovieDetails selected={state.selected} close={close} />
      ) : (
        <>
          <header className="w-100 text-center text-white mt-5">
            <h2 className="display-4 font-weight-bold text-uppercase text-primary mb-4">
              Movie Search
            </h2>
            <Search handleInput={handleInput} SearchResult={SearchResult} />
          </header>

          <div className="container mt-5">
            <div className="row justify-content-center">
              {/* Display search results */}
              {state.results && state.results.length > 0 ? (
                state.results.map((result, i) => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3" key={i}>
                    <Result result={result} openDetails={openDetails} />
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <p className="text-center text-muted">No movies found. Please try again.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
