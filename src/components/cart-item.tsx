import { CartProduct, CartContext } from "@/app/context/cart";
import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import { Button } from "./ui/button";
import { useContext } from "react";
import Icon from "./icons/icon-component";
import TypographySmall from "./typography/typography-small";
import Link from "next/link";
import TypographyP from "./typography/typography-p";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(cartProduct.id);
  };

  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(cartProduct.id);
  };

  const handleRemoveProduct = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div>
      <div className="flex gap-4 h-28 w-full">
        <div className="w-28 h-24 relative">
          <Image
            src={cartProduct.imagemUrl}
            alt={cartProduct.nome}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col justify-between h-full w-full space-y-2">
          <div className="flex flex-col justify-between h-full">
            <div className="">
              <Link
                href={`/product/${cartProduct.id}`}
                className="hover:text-cyan-600"
              >
                {cartProduct.nome}
              </Link>
              <Link
                href={`/store/${cartProduct.lojaId}`}
                className="hover:text-cyan-600"
              >
                <TypographySmall className="flex items-center mt-0.5">
                  {cartProduct.loja.nome}
                  <Icon.arrowRight />
                </TypographySmall>
              </Link>
            </div>
            <div className="flex items-center">
              <h4 className="text-sm">
                {formatCurrency(
                  Number(calculateTotalPrice(cartProduct)) *
                    cartProduct.quantity
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

          <div className="flex space-x-2 justify-between">
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
                onClick={handleIncreaseProductQuantityClick}
                size={"icon"}
                variant={"ghost"}
                className="text-center rounded-none"
              >
                +
              </Button>
            </div>

            <Button
              className="h-8 rounded-sm"
              variant={"ghost"}
              size={"icon"}
              onClick={handleRemoveProduct}
            >
              <Icon.trash />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
