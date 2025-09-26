import React from "react";

export default function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <form className="searchbar" onSubmit={onSearch}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        aria-label="Search movies"
      />
      <button type="submit" disabled={loading || !query.trim()}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}