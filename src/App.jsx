import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieDetailsModal from "./components/MovieDetailsModal";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "fcc8377c";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [details, setDetails] = useState(null);

  async function fetchSearch(q) {
    if (!q.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(q)}&type=movie`
        
      );
      const data = await res.json();
      if (data.Response === "True") setResults(data.Search);
      else setError(data.Error || "No results");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e) => {
    if (e?.preventDefault) e.preventDefault();
    fetchSearch(query);
  };

  useEffect(() => {
    if (!selectedId) return setDetails(null);
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}&plot=full`
        );
        const data = await res.json();
        if (!cancelled) {
          if (data.Response === "True") setDetails(data);
          else setError(data.Error || "Could not fetch details");
        }
      } catch {
        if (!cancelled) setError("Network error when fetching details");
      }
    })();
    return () => (cancelled = true);
  }, [selectedId]);

  return (
    <div className="app-root">
      <div className="container">
        <header>
          <h1>Movie Search</h1>
          <p className="muted">Search movies using the OMDB API.</p>
        </header>

        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} loading={loading} />

        <main>
          {error && <div className="alert error">{error}</div>}
          {!loading && results.length === 0 && !error && (
            <div className="placeholder">Try searching for a movie.</div>
          )}
          {loading && <div className="placeholder">Loading results…</div>}
          {results.length > 0 && (
            <div className="grid">
              {results.map((m) => (
                <MovieCard key={m.imdbID} movie={m} onSelect={setSelectedId} />
              ))}
            </div>
          )}
        </main>
      </div>
      {details && <MovieDetailsModal details={details} onClose={() => setSelectedId(null)} />}
    </div>
  );
}