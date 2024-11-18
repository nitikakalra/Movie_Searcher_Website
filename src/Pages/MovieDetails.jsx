import React from 'react';
import '../App.css';

const MovieDetails = ({ selected, close }) => {
  return (
    <div className="movie-details-wrapper d-flex flex-column justify-content-center align-items-center text-white">
      <h3 className="text-center font-weight-bold text-decoration-underline text-success mb-4">Movie Details</h3>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 text-center movie-image-container">
            <img src={selected.Poster} alt={selected.Title} className="img-fluid movie-image" />
          </div>
          <div className="col-12 col-md-6 movie-info">
            <h2 className="movie-title">{selected.Title}</h2>
            <p className="movie-year">{selected.Year}</p>
            <p className="movie-rating">Rating: {selected.imdbRating}</p>
            <p className="movie-plot">{selected.Plot}</p>
            <button onClick={close} className="btn btn-close">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
