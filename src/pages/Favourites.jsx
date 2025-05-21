import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Favourites() {
  const [savedFavourites, setSavedFavourites] = useState([]);
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("favouritesData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setListName(parsed.name);
      setSavedFavourites(parsed.movies);
    }
  }, []);

  const handleResetAndGoHome = () => {
    localStorage.removeItem("favouritesData");
    navigate("/");
  };

  return (
    <div className="favo">

    <div className="fav">
      <h1>{listName || "Favourite List"}</h1>

      <button onClick={handleResetAndGoHome}>
        Go Back
      </button>
    </div>


    <div className="fav_li">
        {savedFavourites.length === 0 ? (
        <p></p>
      ) : (
        <ul>
          {savedFavourites.map((fav) => (
            <li key={fav.imdbID}>{fav.Title}</li>
          ))}
        </ul>
      )}

    </div>
    </div>
  );
}

export default Favourites;
