import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const API_KEY = "968fa078";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [favouriteListName, setFavouriteListName] = useState(""); // yeni state

  useEffect(() => {
    searchMovies("Harry Potter");
  }, []);

  const searchMovies = async (searchTerm) => {
    setLoading(true);
    setError("");
    setMovies([]);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search.slice(0, 10));
      } else {
        setError("Film tapılmadı");
      }
    } catch {
      setError("Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  const addToFavourite = (movie) => {
    if (!favourites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavourites([...favourites, movie]);
    }
  };

  const saveFavourites = () => {
    const dataToSave = {
      name: favouriteListName.trim() || "My Favourite List",
      movies: favourites,
    };
    localStorage.setItem("favouritesData", JSON.stringify(dataToSave));
  };

  return (
    <div>
      <header>
        <h1>Movie Search App</h1>
      </header>

      <div className="search-box">
        <input
          className="input_box"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button
          className="search_button"
          onClick={() => searchMovies(query)}
          disabled={!query.trim()}
        >
          Search
        </button>
        <span className="error">{error}</span>
      </div>

      <div className="container">
        
        <div className="left">

  {loading ? (
    <p>Loading...</p>
  ) : movies.length > 0 ? (
    movies.map((movie) => (
      <div className="movie" key={movie.imdbID}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : ""}
          alt={movie.Title}
        />
        <h4>{movie.Title}</h4>
        <p>{movie.Year}</p>
        <button
          onClick={() => addToFavourite(movie)}
          disabled={favourites.some(
            (fav) => fav.imdbID === movie.imdbID
          )}
        >
          Add to Favourite
        </button>
      </div>
    ))
  ) : (
    <p>Film tapılmadı</p>
  )}
</div>


        <div className="right">
          <h3>Favourite List</h3>
          <ul>
            {favourites.map((fav) => (
              <li key={fav.imdbID}>{fav.Title}</li>
            ))}
          </ul>

          <input
            className="name"
            type="text"
            placeholder="Name a favourite list"
            value={favouriteListName}
            onChange={(e) => setFavouriteListName(e.target.value)}
          />

          <button className="save_button" onClick={saveFavourites}>
            Save
          </button>

          <Link to="/favourites">
            <button className="fav_list">Favourite list</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
