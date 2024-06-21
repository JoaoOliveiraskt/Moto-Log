"use client";

import { Prisma } from "prisma/generated/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import calculateTotalPrice from "../helpers/price";

export interface CartProduct
  extends Prisma.ProdutoGetPayload<{
    include: {
      loja: {
        select: {
          id: true;
          deliveryFee: true;
          deliveryTime: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subTotalPrice: number;
  totalPrice: number;
  totalDiscount: number;
  addProductToCart: ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProdutoGetPayload<{
      include: {
        loja: {
          select: {
            id: true;
            nome: true;
            imagemUrl: true;
            deliveryFee: true;
            deliveryTime: true;
          };
        };
      };
    }>;
    quantity: number;
    emptyCart?: boolean;
  }) => void;
  decreaseProductQuantity: (productId: string) => void;
  encreaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
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
  clearCart: () => {},
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

  const clearCart = () => {
    return setProducts([]);
  };

  const addProductToCart = ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProdutoGetPayload<{
      include: {
        loja: {
          select: {
            id: true;
            nome: true;
            imagemUrl: true;
            deliveryFee: true;
            deliveryTime: true;
          };
        };
      };
    }>;
    quantity: number;
    emptyCart?: boolean;
  }) => {
    if (emptyCart) {
      setProducts([]);
    }

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
        totalPrice,
        subTotalPrice,
        totalDiscount,
        clearCart,
        addProductToCart,
        decreaseProductQuantity,
        encreaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
