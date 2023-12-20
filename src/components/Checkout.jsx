import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { currencyFormatter } from "../utils/formatting";
import CartContext from "../store/CartContext";
import Input from "./Input";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import { saveOrders } from "../http";
import Error from "./Error";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    "postal-code": "",
    city: "",
  });

  const [error, setError] = useState(false);
  const [errorUpdatingMessage, setErrorUpdatingMessage] = useState();

  const { items } = useContext(CartContext);
  const { hideCheckout, progress } = useContext(UserProgressContext);

  const cartTotal = items.reduce((totalItems, item) => {
    return totalItems + item.quantity * item.price;
  }, 0);

  function handleHideCheckout() {
    hideCheckout();
  }

  function handleChange(event, identifier) {
    setFormData((prevData) => ({
      ...prevData,
      [identifier]: event.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await saveOrders(formData, items);
    } catch (error) {
      setErrorUpdatingMessage({
        message: error.message || "Something went wrong please try again..",
      });
      setError(error);
    }
  }

  function handleError() {
    setError(false);
  }

  return (
    <Modal
      className={error ? "error" : ""}
      onClose={handleHideCheckout}
      open={progress === "checkout"}
    >
      {error ? (
        <Error
          title="Oops..Error!"
          message={errorUpdatingMessage.message}
          onClose={handleError}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
          <Input
            value={formData.name}
            label="Full Name"
            type="text"
            id="full-name"
            onChange={(e) => handleChange(e, "name")}
          />
          <Input
            value={formData.email}
            label="E-mail Address"
            type="email"
            id="email"
            onChange={(e) => handleChange(e, "email")}
          />
          <Input
            value={formData.street}
            onChange={(e) => handleChange(e, "street")}
            label="Street"
            type="text"
            id="street"
          />
          <div className="control-row">
            <Input
              value={formData["postal-code"]}
              label="Postal Code"
              type="text"
              id="postal-code"
              onChange={(e) => handleChange(e, "postal-code")}
            />
            <Input
              value={formData.city}
              label="City"
              type="text"
              id="city"
              onChange={(e) => handleChange(e, "city")}
            />
          </div>
          <p className="modal-actions">
            <Button onClick={handleHideCheckout} type="button" textOnly>
              Close
            </Button>
            <Button>Submit Order</Button>
          </p>
        </form>
      )}
    </Modal>
  );
}

export default Checkout;
