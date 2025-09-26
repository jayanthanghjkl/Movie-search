import React from "react";

export default function MovieDetailsModal({ details, onClose }) {
  if (!details) return null;
  const poster = details.Poster !== "N/A" ? details.Poster : null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close" onClick={onClose}>✕</button>
        <div className="modal-content">
          <div className="modal-left">
            {poster ? <img src={poster} alt={`${details.Title} poster`} /> : <div className="no-poster">No poster</div>}
          </div>
          <div className="modal-right">
            <h2>{details.Title} <span className="muted">({details.Year})</span></h2>
            <p className="muted">{details.Runtime} • {details.Genre} • Rated {details.Rated}</p>
            <p className="plot">{details.Plot}</p>
            <ul className="meta">
              <li><strong>Director:</strong> {details.Director}</li>
              <li><strong>Actors:</strong> {details.Actors}</li>
              <li><strong>Language:</strong> {details.Language}</li>
              <li><strong>IMDB Rating:</strong> {details.imdbRating}</li>
            </ul>
            <a href={`https://www.imdb.com/title/${details.imdbID}`} target="_blank" rel="noreferrer">View on IMDB</a>
          </div>
        </div>
      </div>
    </div>
  );
}