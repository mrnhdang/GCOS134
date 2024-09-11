"use client";
import React, { createContext, useState } from "react";

export const CartStateContext = createContext();

const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  return (
    <CartStateContext.Provider value={{ cart, setCart }}>
      {children}
    </CartStateContext.Provider>
  );
};

export default CartContext;
