import React, { useContext } from "react";
import img from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

function Header() {
  const { items } = useContext(CartContext);


    // items: [
    //         { id: 1, item: burger, quantity: 1 },
    //         { id: 2, item: pizza, quanitiy: 2 },
    //         { id: 3, item: juice, quantity: 2 },
    //        ];

  const totalCartItmes = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={img} alt="" />
        <h1>ORDERO</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItmes})</Button>
      </nav>
    </header>
  );
}

export default Header;
