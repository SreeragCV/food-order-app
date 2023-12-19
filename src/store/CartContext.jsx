import React, { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  // items: [
  //         { id: 1, item: burger, quantity: 1 },
  //         { id: 2, item: pizza, quanitiy: 2 },
  //         { id: 3, item: juice, quantity: 2 },
  //        ];

  //  ADD ITEM
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingCartItemIndex];

    if (existingCartItemIndex > -1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  // REMOVE ITEM
  if (action.type === "REMOVE_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updateItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updateItem;
    }
    return { ...state, items: updatedItems };
  }

  return state;

}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
