"use client";
import React, { createContext, useState } from "react";

export const CartStateContext = createContext();

const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingProduct) {
      // If the product exists, update the quantity
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 } // or customize increment logic
          : item
      );
    } else {
      // If the product doesn't exist, add it to the cart with quantity 1
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    // Now set the updated cart state after all logic is complete
    setCart(updatedCart);
  };

  const removeFromCart = (product) => {
    // Remove product from cart by filtering out the item with the matching id
    const updatedCart = cart?.filter((item) => item?.id !== product?.id);

    // Set the updated cart state after removal
    setCart(updatedCart);
  };

  return (
    <CartStateContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export default CartContext;
