import React, { useContext } from "react";
import img from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const totalCartItmes = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleCartClick() {
    showCart()
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={img} alt="" />
        <h1>ORDERO</h1>
      </div>
      <nav>
        <Button onClick={handleCartClick} textOnly>
          Cart ({totalCartItmes})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
