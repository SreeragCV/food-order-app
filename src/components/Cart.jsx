import React, { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import CartItem from "./CartItem";

function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce((totalItems, item) => {
    return totalItems + item.quantity * item.price;
  }, 0);

  function handleHideCart() {
    hideCart();
  }

  function handleCheckout() {
    showCheckout();
  }

  return (
    <Modal
      open={progress === "cart"}
      onClose={progress === "cart" ? handleHideCart : null}
      className="cart"
    >
      <h1>Your Cart</h1>
      <ul>
        {items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onIncrease={() => addItem(item)}
              onDecrease={() => removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total"> {currencyFormatter.format(cartTotal)} </p>
      <p className="modal-actions">
        <Button onClick={handleHideCart} textOnly>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
