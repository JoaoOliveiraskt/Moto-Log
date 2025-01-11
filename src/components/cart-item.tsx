import { CartProduct, CartContext } from "@/app/context/cart";
import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import { Button } from "./ui/button";
import { useContext } from "react";
import TypographySmall from "./typography/typography-small";
import { Link } from "next-view-transitions";
import TypographyP from "./typography/typography-p";
import Icon from "./icons/icon-component";

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
        <div className="w-28 h-28 relative">
          <Image
            src={cartProduct.imagemUrl}
            alt={cartProduct.nome}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col justify-between h-full w-full space-y-2">
          <div className="flex flex-col justify-between h-full">
            <div className="w-fit">
              <Link
                href={`/product/${cartProduct.id}`}
                className="hover:text-sky-600 w-fit"
              >
                {cartProduct.nome}
              </Link>
              <Link
                href={`/store/${cartProduct.lojaId}`}
                className="text-muted-foreground hover:text-sky-600 w-fit"
              >
                <TypographySmall className="flex items-center mt-0.5 ">
                  {cartProduct.loja.nome}
                  <Icon.chevronRight size={14} />
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
            <div className="flex items-center space-x-2 overflow-hidden -ml-0.5">
              <Button
                onClick={handleDecreaseProductQuantityClick}
                variant={"ghost"}
                size={"iconShaped"}
              >
                <Icon.Minus size={20} />
              </Button>
              <span className="w-8 text-center">{cartProduct.quantity}</span>
              <Button
                onClick={handleIncreaseProductQuantityClick}
                variant={"ghost"}
                size={"iconShaped"}
              >
                <Icon.Plus size={20} />
              </Button>
            </div>

            <Button
              className=""
              variant={"ghost"}
              size={"iconShaped"}
              onClick={handleRemoveProduct}
            >
              <Icon.trash size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
