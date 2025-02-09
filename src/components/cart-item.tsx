import { CartProduct, CartContext } from "@/app/context/cart";
import formatCurrency from "@/app/helpers/format-currency";
import calculateTotalPrice from "@/app/helpers/price";
import Image from "next/image";
import { Button } from "./ui/button";
import { useContext } from "react";
import TypographySmall from "./typography/typography-small";
import Link from "next/link";
import TypographyP from "./typography/typography-p";
import Icon from "./icons/icon-component";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

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
    <Card>
      <CardContent className="flex gap-4 w-full items-center p-2 lg:p-4 dark:border-card">
        <div className="w-28 h-28 lg:w-32 lg:h-28 relative">
          <Image
            src={cartProduct.imagemUrl}
            alt={cartProduct.nome}
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <div className="flex flex-col justify-between h-full w-full space-y-2">
          <div className="flex flex-col justify-between h-full">
            <div className="w-full">
              <div className="flex items-center space-x-2 justify-between w-full">
                <Link
                  href={`/product/${cartProduct.id}`}
                  className="hover:text-sky-600 w-fit line-clamp-1"
                >
                  {cartProduct.nome}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="ml-auto">
                    <Button
                      aria-haspopup="true"
                      size="iconShaped"
                      variant="ghost"
                      className="transition-colors duration-450"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="text-red-500 flex items-center gap-x-2"
                      onClick={handleRemoveProduct}
                    >
                      <Icon.trash size={20} />
                      <span>Remover</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center w-fit">
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
            </div>
            <div className="flex items-center justify-end gap-x-2 mr-2">
              {Number(cartProduct.porcentagemDesconto) > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(
                    Number(cartProduct.preco) * cartProduct.quantity
                  )}
                </span>
              )}
              <h4 className="text-sm">
                {formatCurrency(
                  Number(calculateTotalPrice(cartProduct)) *
                    cartProduct.quantity
                )}
              </h4>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
