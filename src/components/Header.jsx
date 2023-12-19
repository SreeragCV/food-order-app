import React from "react";
import img from "../assets/logo.jpg";

function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={img} alt="" />
        <h1>ORDERO</h1>
      </div>
      <nav>
        <button className="text-button">Cart(0)</button>
      </nav>
    </header>
  );
}

export default Header;
