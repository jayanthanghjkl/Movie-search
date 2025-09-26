import React from "react";

export default function MovieCard({ movie, onSelect }) {
  const poster = movie.Poster !== "N/A" ? movie.Poster : null;
  return (
    <article className="card" onClick={() => onSelect(movie.imdbID)}>
      <div className="poster">
        {poster ? <img src={poster} alt={`${movie.Title} poster`} /> : <div className="no-poster">No poster</div>}
      </div>
      <div className="card-body">
        <h3>{movie.Title}</h3>
        <p className="muted">{movie.Year}</p>
        <p className="action">Click for details →</p>
      </div>
    </article>
  );
}