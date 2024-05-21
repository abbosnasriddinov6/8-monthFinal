import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import Carusel from "../carusel/Carusel";
import { IoEye } from "react-icons/io5";
import { ProviderContext } from "../../context";
const Home = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { dataTime, setdataTime, value, setValue } =
    useContext(ProviderContext);
  const gitData = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${value}&order=gecko_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    gitData();
  }, [value]);

  const filteredData = data.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const AddToWatchList = (crypto) => {
    const existingWatchlist = localStorage.getItem("watchlist");
    if (!existingWatchlist) {
      saveToLocalStorage("watchlist", [crypto]);
    } else {
      try {
        const parsedWatchlist = JSON.parse(existingWatchlist);
        const isCryptoInWatchlist = parsedWatchlist.some(
          (item) => item.id === crypto.id
        );
        if (!isCryptoInWatchlist) {
          const updatedWatchlist = [...parsedWatchlist, crypto];
          saveToLocalStorage("watchlist", updatedWatchlist);
        } else {
          console.log("bor");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const saveToLocalStorage = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Card">
      <div className="CardText">
        <h1>CRYPTOFOLIO WATCH LIST</h1>
        <p className="parag">
          Get all the Info regarding your favorite Crypto Currency
        </p>
      </div>
      <Carusel />
      <div className="crypto-list">
        <h1 className="listh1">Cryptocurrency Prices by Market Cap</h1>
        <input
          type="text"
          placeholder="Search For a Crypto Currency..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="Search"
        />
        <div className="types">
          <h3>Coin</h3>
          <div className="type">
            <h3>Price</h3>
            <h3>24h Change</h3>
            <h3>Market Cap</h3>
          </div>
        </div>
        {currentItems.map((crypto) => (
          <div key={crypto.id} className="crypto-item">
            <Link to={`/Coin/${crypto.id}`} className="Link">
              <div className="alink">
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="crypto-image"
                />
                <h2 className="symbol">
                  <h2>{crypto.symbol.toUpperCase()}</h2>{" "}
                  <p className="CryptoName">{crypto.name}</p>
                </h2>
              </div>
            </Link>
            <div className="AllInfo">
              <p className="currentPrice">${crypto.current_price}</p>
              <p className="change">
                <IoEye
                  className="image"
                  onClick={() => AddToWatchList(crypto)}
                />
                <p
                  className={`Change ${
                    crypto.price_change_percentage_24h > 0
                      ? "positive"
                      : "negative"
                  }`}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
              </p>
              <p className="Cup">${crypto.market_cap.toLocaleString()}</p>
            </div>
          </div>
        ))}
        <div className="pagination">
          {Array.from({
            length: Math.ceil(filteredData.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
