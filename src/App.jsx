import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import SingleCoin from "./pages/SingleCoin/SingleCoin";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="header-top">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Coin/:id" element={<SingleCoin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
