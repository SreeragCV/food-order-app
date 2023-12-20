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
  const initialFormData = {
    name: "",
    email: "",
    street: "",
    "postal-code": "",
    city: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [sendingData, setSendingData] = useState(false);
  const [error, setError] = useState(false);
  const [errorUpdatingMessage, setErrorUpdatingMessage] = useState();

  const { items, clearCart } = useContext(CartContext);
  const { hideCheckout, progress, showSuccess, hideSuccess } =
    useContext(UserProgressContext);

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
      setSendingData(true);
      await saveOrders(formData, items);
      showSuccess();
    } catch (error) {
      setErrorUpdatingMessage({
        message: error.message || "Something went wrong please try again..",
      });
      setError(error);
    }
    setSendingData(false);
  }

  function handleClearCart() {
    hideSuccess();
    clearCart();
    setFormData(initialFormData);
  }

  function handleError() {
    setError(false);
  }

  let actions = (
    <>
      <Button onClick={handleHideCheckout} type="button" textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (sendingData) {
    actions = <p>please wait...</p>;
  }

  if (progress === "success") {
    return (
      <Modal
        open={progress === "success"}
        onClose={progress === "success" ? handleClearCart : null}
      >
        <h2>Success</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you soon..</p>
        <p>
          <Button onClick={handleClearCart}>close</Button>
        </p>
      </Modal>
    );
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
          <p className="modal-actions">{actions}</p>
        </form>
      )}
    </Modal>
  );
}

export default Checkout;
