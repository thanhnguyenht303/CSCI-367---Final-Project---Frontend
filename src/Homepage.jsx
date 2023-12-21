import React from "react";
import {Route, Routes} from "react-router-dom";

import homepageBackground from "./images/Homepage.jpg"

import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Order from "./Components/Order";
import Tracking from "./Components/Tracking";

const style = {
  container: {
    backgroundImage: `url(${homepageBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  }
};

function Homepage() {
  const main = style;

  return (
    <div style = {main.container}>
      <NavBar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/order" element = {<Order />} />
        <Route path = "/tracking" element = {<Tracking />} />
      </Routes>
    </div>
  );
}

export default Homepage;
