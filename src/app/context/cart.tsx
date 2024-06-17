"use client";

import { Prisma } from "prisma/generated/client";
import { Produto } from "prisma/generated/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import calculateTotalPrice from "../helpers/price";

export interface CartProduct 
  extends Prisma.ProdutoGetPayload<{
  include: {
    loja: {
      select: {
        id: true
      }
    }
  }
}>{
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subTotalPrice: number;
  totalPrice: number;
  totalDiscount: number;
  addProductToCart: (product: Produto, quantity: number) => void;
  decreaseProductQuantity: (productId: string) => void;
  encreaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subTotalPrice: 0,
  totalPrice: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  encreaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.preco) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateTotalPrice(product) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = subTotalPrice - totalPrice;

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId && cartProduct.quantity > 1) {
          return { ...cartProduct, quantity: cartProduct.quantity - 1 };
        }

        return cartProduct;
      })
    );
  };

  const encreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return { ...cartProduct, quantity: cartProduct.quantity + 1 };
        }

        return cartProduct;
      })
    );
  };

  const removeProductFromCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId)
    );
  };

  const addProductToCart = (product: Produto, quantity: number) => {
    const isProductInCart = products.some(
      (cartProduct) => cartProduct.id === product.id
    );

    if (isProductInCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return { ...cartProduct, quantity: cartProduct.quantity + 1 };
          }

          return cartProduct;
        })
      );
    }

    setProducts((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        encreaseProductQuantity,
        removeProductFromCart,
        totalPrice,
        subTotalPrice,
        totalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
