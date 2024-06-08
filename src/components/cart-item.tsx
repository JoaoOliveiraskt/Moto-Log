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
  const { decreaseProductQuantity, encreaseProductQuantity, removeProductFromCart } = useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(cartProduct.id);
  };

  const handleEncreaseProductQuantityClick = () => {
    encreaseProductQuantity(cartProduct.id);
  }

  const handleRemoveProduct = () => {
    removeProductFromCart(cartProduct.id);
  }

  return (
    <div className="flex items-center justify-between">
      {/* Imagem e Info */}

      <div className="flex gap-4">
        <div className="w-20 h-20 relative">
          <Image
            src={cartProduct.imagemUrl}
            alt={cartProduct.nome}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <div className="space-y-1">
            <h3 className="text-xs font-bold line-clamp-1">
              {cartProduct.nome}
            </h3>
            <div className="flex items-center">
              <h4 className="text-sm font-bold">
                {formatCurrency(calculateTotalPrice(cartProduct) * cartProduct.quantity)}
              </h4>

              {Number(cartProduct.porcentagemDesconto) > 0 && (
                <span className="text-xs ml-2 text-gray-500 line-through">
                  {formatCurrency(Number(cartProduct.preco) * cartProduct.quantity)}
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="flex items-center space-x-2 justify-center">
              <Button
                onClick={handleDecreaseProductQuantityClick}
                size={"icon"}
                variant={"ghost"}
                className="py-1 px-3 rounded-md text-center border border-zinc-400/80"
              >
                -
              </Button>
              <span className="w-8 text-center">{cartProduct.quantity}</span>
              <Button
              onClick={handleEncreaseProductQuantityClick}
                size={"icon"}
                variant={"ghost"}
                className="py-1 px-3 rounded-md text-center border border-zinc-400/80"
              >
                +
              </Button>
            </div>
            {/* botão de deletar */}

            <Button size={"icon"} onClick={handleRemoveProduct}>
              <IoTrashOutline size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
