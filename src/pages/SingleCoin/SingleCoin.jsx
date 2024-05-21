import React, { useContext, useEffect, useMemo, useState } from "react";
import "./SingleCoin.css";
import ReactApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../button/Batton";
import { ProviderContext } from "../../context";
const SingleCoin = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [dataPrice, setDataPrice] = useState(null);
  const { dataTime, setdataTime, value, setValue } =
    useContext(ProviderContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const res = await axios.get(dataTime);
        const data = res.data;
        setDataPrice(data);
        setData(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, dataTime]);

  const seriesData = [
    {
      name: "VALYUTA",
      data: dataPrice?.prices,
    },
  ];

  const chartOptions = {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Stock Price Movement",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
      title: {
        text: "Price",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
    },
  };

  console.log(value);
  return (
    <div className="Container">
      <div className="InfoIN">
        <img src={data?.image.large} alt="img" />
        <h1 className="Name">{data?.name}</h1>
        <p className="NameText">{data?.description?.en?.substring(0, 200)}</p>
        <h1 className="defination">Rank: {data?.market_cap_rank}</h1>
        <h1 className="defination">
          Current Rank:${" "}
          {value === "usd" ? data?.market_data?.current_price?.usd : null}
          {value === "aud" ? data?.market_data?.current_price?.aud : null}
          {value === "ltc" ? data?.market_data?.current_price?.ltc : null}
        </h1>
        <h1 className="defination">
          Market Cap:${" "}
          {value === "usd" ? data?.market_data?.market_cap?.usd : null}
          {value === "aud" ? data?.market_data?.market_cap?.aud : null}
          {value === "ltc" ? data?.market_data?.market_cap?.ltc : null}
        </h1>
      </div>

      <div>
        <div>
          <ReactApexChart
            options={chartOptions}
            series={seriesData}
            type="area"
            height={350}
            className="chart"
          />
        </div>
        <div className="Button">
          <Button />
        </div>
      </div>
    </div>
  );
};

export default SingleCoin;
