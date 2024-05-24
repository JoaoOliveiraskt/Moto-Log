import { CartProduct } from "@/app/context/cart";
import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import { Button } from "./ui/button";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
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
            <h3 className="text-xs font-bold line-clamp-1">{cartProduct.nome}</h3>
            <div className="flex items-center">
              <h4 className="text-sm font-bold">
                {formatCurrency(calculateTotalPrice(cartProduct))}
              </h4>

              {Number(cartProduct.porcentagemDesconto) > 0 && (
                <span className="text-xs ml-2 text-gray-500 line-through">
                  {formatCurrency(Number(cartProduct.preco))}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
            size={"icon"}
            variant={"ghost"}
            className="py-1 px-3 rounded-md text-center border">
              -
            </Button>
            <span className="px-2">{cartProduct.quantity}</span>
            <Button 
            size={"icon"}
            variant={"ghost"}
            className="py-1 px-3 rounded-md text-center border">
              +
            </Button>
          </div>
        </div>
      </div>

      {/* botão de deletar */}
    </div>
  );
};

export default CartItem;
