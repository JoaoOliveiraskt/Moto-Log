import { CartProduct, CartContext } from "@/app/context/cart";
import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import { Button } from "./ui/button";
import { useContext } from "react";

import { IoTrashOutline } from "react-icons/io5";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    encreaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(cartProduct.id);
  };

  const handleEncreaseProductQuantityClick = () => {
    encreaseProductQuantity(cartProduct.id);
  };

  const handleRemoveProduct = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div>
      <div className="flex gap-4 h-24 w-full">
        <div className="w-24 h-full relative">
          <Image
            src={cartProduct.imagemUrl}
            alt={cartProduct.nome}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="space-y-1">
            <h3 className="font-bold text-lg line-clamp-1">
              {cartProduct.nome}
            </h3>
            <div className="flex items-center">
              <h4 className="text-sm">
                {formatCurrency(
                  calculateTotalPrice(cartProduct) * cartProduct.quantity
                )}
              </h4>

              {Number(cartProduct.porcentagemDesconto) > 0 && (
                <span className="text-xs ml-2 text-muted-foreground line-through">
                  {formatCurrency(
                    Number(cartProduct.preco) * cartProduct.quantity
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="flex items-center space-x-2 justify-center border rounded-md overflow-hidden h-8">
              <Button
                onClick={handleDecreaseProductQuantityClick}
                size={"icon"}
                variant={"ghost"}
                className="text-center rounded-none"
              >
                -
              </Button>
              <span className="w-8 text-center">{cartProduct.quantity}</span>
              <Button
                onClick={handleEncreaseProductQuantityClick}
                size={"icon"}
                variant={"ghost"}
                className="text-center rounded-none"
              >
                +
              </Button>
            </div>

            {/* botão de deletar */}
            <Button
              className="h-8"
              variant={"ghost"}
              size={"icon"}
              onClick={handleRemoveProduct}
            >
              <IoTrashOutline size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
