import React, { useContext } from "react";
import Modal from "./Modal";
import { currencyFormatter } from "../utils/formatting";
import CartContext from "../store/CartContext";
import Input from "./Input";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";

function Checkout() {

  const {items} = useContext(CartContext)
  const {hideCheckout, progress} = useContext(UserProgressContext)


  const cartTotal = items.reduce((totalItems, item) => {
    return totalItems + item.quantity * item.price;
  }, 0);

  
  function handleHideCheckout() {
    hideCheckout();
  }

  return (
    <Modal onClose={handleHideCheckout} open={progress === "checkout"}>
      <h2>Checkout</h2>
      <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
      <Input label='Full Name' type='text' id='full-name' />
      <Input label='E-mail Address' type='email' id='email' />
      <Input label='Street' type='text' id='street' />
      <div className="control-row">
        <Input label='Postal Code' type='text' id='postal-code' />
        <Input label='City' type='text' id='city' />
      </div>
      <p className="modal-actions">
        <Button onClick={handleHideCheckout} type='button' textOnly>Close</Button>
        <Button>Submit Order</Button>
      </p>
    </Modal>
  );
}

export default Checkout;
