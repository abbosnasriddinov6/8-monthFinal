import React, { useEffect, useState } from "react";
import "./WatchLIst.css";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  const addToWatchlist = (crypto) => {
    const updatedWatchlist = [...watchlist, crypto];
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const removeFromWatchlist = (cryptoId) => {
    const updatedWatchlist = watchlist.filter(
      (crypto) => crypto.id !== cryptoId
    );
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const toggleButton = (cryptoId) => {
    setClickedButtons((prevClickedButtons) => {
      if (prevClickedButtons.includes(cryptoId)) {
        return prevClickedButtons.filter((id) => id !== cryptoId);
      } else {
        return [...prevClickedButtons, cryptoId];
      }
    });
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="Watch">Watchlist</h2>
        {watchlist.map((crypto) => (
          <div key={crypto.id} className="allimg">
            <img src={crypto.image} alt={crypto.name} className="showimg" />
            <p>{crypto.name}</p>
            <button
              className={
                clickedButtons.includes(crypto.id)
                  ? "btnRemove active"
                  : "btnRemove"
              }
              onClick={() => {
                toggleButton(crypto.id);
                removeFromWatchlist(crypto.id);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
