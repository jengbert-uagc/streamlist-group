import React, { useEffect, useState } from "react";

function Movies({ mediaList, setMediaList, addToCart }) {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            ""
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchList = (movie) => {
    const alreadyExists = mediaList.some(
      (item) => item.title.toLowerCase() === movie.title.toLowerCase()
    );

    if (alreadyExists) return;

    const newItem = {
      id: Date.now(),
      title: movie.title,
      status: "to-watch",
      rating: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setMediaList((prevItems) => [newItem, ...prevItems]);
  };

  return (
    <div className="card">
      <h2>Search for fun new movies. </h2>
      <p>Enter a key term to find new movies to add to your watach list!</p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Search
        </button>
      </form>

      {loading && <p>Loading movies...</p>}
      {error && <p>{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            )}

            <h3>{movie.title}</h3>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>TMDB Rating:</strong> {movie.vote_average}
            </p>
            <p>{movie.overview}</p>

            <button
              type="button"
              className="btn-primary"
              onClick={() => addToWatchList(movie)}
            >
              Add to Watch List
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => addToCart(movie)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
