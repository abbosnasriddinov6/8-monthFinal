import React, { useContext, useState } from "react";
import "./Header.css"; // Import the CSS file
import WatchList from "../pages/watchList/WatchList";
import { Link } from "react-router-dom";
import { ProviderContext } from "../context";

const Header = () => {
  const options = [
    { value: "usd", label: "USD" },
    { value: "aud", label: "AUD" },
    { value: "ltc", label: "ITC" },
  ];
  const { value, setValue } = useContext(ProviderContext);
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setValue(value);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="header">
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <h1 className="heading">CRYPTOFOLIO</h1>
      </Link>
      <div className="clicker">
        <select
          value={selectedValue}
          onChange={handleChange}
          className="select"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="button" className="button" onClick={toggleSidebar}>
          WATCH LIST
        </button>
      </div>
      {sidebarOpen && <WatchList />}{" "}
    </header>
  );
};

export default Header;
