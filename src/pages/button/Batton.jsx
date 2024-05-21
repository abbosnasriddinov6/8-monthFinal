import React, { useContext, useState } from "react";
import "./Button.css";
import { ProviderContext } from "../../context";
import { price24, price30, price365, price90 } from "../SingleCoin";

const Button = () => {
  const [activeButton, setActiveButton] = useState(1);
  const { dataTime, setdataTime } = useContext(ProviderContext);
  const handleButtonClick = (index, value) => {
    setActiveButton(value);
    setdataTime(index);
  };

  return (
    <div>
      <div className="Button">
        <button
          className={activeButton === 1 ? "active" : ""}
          onClick={() => handleButtonClick(price24, 1)}
        >
          24 Hours
        </button>
        <button
          className={activeButton === 2 ? "active" : ""}
          onClick={() => handleButtonClick(price30, 2)}
        >
          30 Days
        </button>
        <button
          className={activeButton === 3 ? "active" : ""}
          onClick={() => handleButtonClick(price90, 3)}
        >
          3 Months
        </button>
        <button
          className={activeButton === 4 ? "active" : ""}
          onClick={() => handleButtonClick(price365, 4)}
        >
          1 Year
        </button>
      </div>
    </div>
  );
};

export default Button;
