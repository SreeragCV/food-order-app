import React from "react";

function Button({ children, textOnly, className }) {
  let cssClass = textOnly ? `text-button ${className}` : `button ${className}`;

  return <button className={cssClass}>{children}</button>;
}

export default Button;
