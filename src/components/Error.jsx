import React from "react";
import Button from "./UI/Button";

function Error({ title, message, onClose, className= "" }) {
  return (
    <div className={`error`}>
      <h2>{title}</h2>
      <p>{message}</p>
      <p>
        <Button onClick={onClose}>close</Button>
      </p>
    </div>
  );
}

export default Error;
