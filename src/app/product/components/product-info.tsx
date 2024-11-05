"use client";

import { useContext, useState } from "react";
import { CartContext } from "@/app/context/cart";
import DiscountBadge from "./discount-badge";
import calculateTotalPrice from "@/app/helpers/price";
import formatCurrency from "@/app/helpers/format-currency";
import { Prisma } from "../../../../prisma/generated/client";
import { Button } from "@/components/ui/button";
import Cart from "@/components/cart";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/login-button";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import LikeButton from "@/components/like-button";
import TypographyP from "@/components/typography/typography-p";
import Icon from "@/components/icons/icon-component";
import Balancer from "react-wrap-balancer";

interface ProductInfoProps {
  quantity: number;
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
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addProductToCart, products } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product, emptyCart, quantity: 1 });
    setIsCartOpen(false);
  };

  const handleLoginOpen = () => {
    setIsLoginModalOpen(true);
  };

  const { data } = useSession();

  const handleAddToCart = () => {
    if (!data?.user) {
      return handleLoginOpen();
    }
    const hasDifferentStoreProduct = products.some(
      (cartProduct) => cartProduct.lojaId !== product.lojaId
    );

    if (hasDifferentStoreProduct) {
      return setIsConfirmationModalOpen(true);
    }

    addToCart({
      emptyCart: false,
    });

    toast({
      title: "Produto adicionado ao carrinho!",
      action: (
        <ToastAction
          className="h-10"
          altText="Ver pedido"
          onClick={() => setIsCartOpen(true)}
        >
          Ver carrinho
        </ToastAction>
      ),
    });
  };

  return (
    <>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col w-full gap-2">
          <h1 className="text-2xl font-medium">{product.nome}</h1>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <p className="text-3xl font-semibold tracking-wide">
              {formatCurrency(Number(calculateTotalPrice(product)))}
            </p>
            {Number(product.porcentagemDesconto) > 0 && (
              <div className="flex items-center gap-4 w-full">
                <p className="text-sm text-muted-foreground line-through">
                  {formatCurrency(Number(product.preco))}
                </p>
                <DiscountBadge product={product} />
              </div>
            )}
          </div>
        </div>

        <div className="">
          <TypographyP className="text-muted-foreground [&:not(:first-child)]:mt-0">
            <Balancer>{product.descricao}</Balancer>
          </TypographyP>
        </div>

        <div className="flex items-center gap-4 w-full">
          <Button
            size={"xl"}
            onClick={handleAddToCart}
            className="font-bold tracking-wide h-14 space-x-2"
          >
            <Icon.cart size={20} />
            <span>Adicionar ao carrinho</span>
          </Button>
          <LikeButton />
        </div>
      </div>

      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />

      <AlertDialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Faça o Login</AlertDialogTitle>
            <AlertDialogDescription>
              Você precisa estar logado para adicionar produtos ao carrinho.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-full border-none">
              Cancelar
            </AlertDialogCancel>
            <LoginButton className="w-full" />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isConfirmationModalOpen}
        onOpenChange={setIsConfirmationModalOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você tem produtos de outra loja no carrinho
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo adicionar esse produto ? isso irá{" "}
              <span className="text-red-500">remover</span> os produtos do seu
              carrinho atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
