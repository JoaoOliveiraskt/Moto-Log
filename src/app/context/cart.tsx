"use client";

import { Produto } from "prisma/generated/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends Produto {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  addProductToCart: (product: Produto) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: Produto) => {
    setProducts((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  return (
    <CartContext.Provider value={{ products, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
