import React, { useEffect, useState, useRef, useContext } from "react";
import "./Carusel.css";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { ProviderContext } from "../../context";

const Carusel = () => {
  const [data, setData] = useState([]);
  const sliderRef = useRef(null);
  const { value } = useContext(ProviderContext);
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
  };

  return (
    <div className="Banner">
      <Slider ref={sliderRef} {...settings} className="banner-list">
        {data.map((item, index) => (
          <Link
            to={`/singlecoin/${item.id}`}
            key={index}
            className="banner-item"
          >
            <div className="banner-item-small">
              <img src={item.image} alt={item.name} className="banner-image" />
              <h2 className="h2para">
                {item.name} ({item.symbol.toUpperCase()})
              </h2>
              <p>${item.current_price}</p>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Carusel;
