import React, { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";

function Cart() {
  const { items } = useContext(CartContext);
  const { progress, hideCart } = useContext(UserProgressContext);

  const cartTotal = items.reduce((totalItems, item) => {
    return totalItems + item.quantity * item.price;
  }, 0);

  function handleHideCart() {
    hideCart();
  }

  return (
    <Modal close={handleHideCart} open={progress === "cart"} className="cart">
      <h1>Your Cart</h1>
      <ul>
        {items.map((item) => {
          return (
            <li>
              <h3>
                {item.name} - {item.price}
                <p>{item.quantity}</p>
              </h3>
            </li>
          );
        })}
      </ul>
      <p className="cart-total"> {currencyFormatter.format(cartTotal)} </p>
      <p className="modal-actions">
        <Button onClick={handleHideCart} textOnly>
          Close
        </Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
}

export default Cart;
