"use client";

import { useContext, useState } from "react";
import { CartContext } from "@/app/context/cart";
import DiscountBadge from "./discount-badge";
import calculateTotalPrice from "@/app/helpers/price";
import formatCurrency from "@/app/helpers/format-currency";
import { Prisma } from "../../../../prisma/generated/client";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import LikeButton from "@/components/like-button";
import Icon from "@/components/icons/icon-component";
import Link from "next/link";
import LoginModal from "@/components/login-modal";
import TypographyH1 from "@/components/typography/typography-h1";
import StoreBadge from "@/components/store-badge";

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
      duration: 5000,
      // @ts-ignore
      title: (
        <div className="flex items-center gap-x-2">
          <Icon.confirmed color="green" />
          <span>Produto adicionado ao carrinho</span>
        </div>
      ),
      action: (
        <ToastAction className="h-10" altText="Ver pedido">
          <Link legacyBehavior href="/cart">
            Ver carrinho
          </Link>
        </ToastAction>
      ),
    });
  };

  return (
    <>
      <div className="flex flex-col w-full gap-y-4 mb-4">
        <TypographyH1 className="font-bold tracking-wide text-2xl lg:text-4xl">
          {product.nome}
        </TypographyH1>

        <div className="flex flex-wrap justify-between sm:justify-start gap-x-4 lg:gap-x-8 gap-y-4 text-sm">
          <div className="flex flex-col items-start gap-y-1">
            <div className="flex items-center space-x-1">
              <span className="">4,8</span>
              <Icon.star size={10} />
            </div>

            <span className="text-muted-foreground text-xs sm:text-sm">
              13,2 mi avaliações
            </span>
          </div>
          <div className="flex flex-col items-start gap-y-1">
            <span className="">{product.totalVendido}</span>
            <span className="text-muted-foreground text-xs sm:text-sm">
              Vendidos
            </span>
          </div>
          <div className="flex flex-col items-start gap-y-1">
            <span className="">{product.estoque}</span>
            <span className="text-muted-foreground text-xs sm:text-sm">
              Em estoque
            </span>
          </div>
          <div className="flex flex-col items-start gap-y-1">
            <Icon.delivery size={20} />
            <span className="text-muted-foreground text-xs sm:text-sm">
              Entrega grátis
            </span>
          </div>
        </div>

        <div className="flex  gap-x-4 mt-2">
          <p className="font-bold tracking-wide text-xl">
            {formatCurrency(Number(calculateTotalPrice(product)))}
          </p>
          <div className="flex items-center gap-x-4">
            {Number(product.porcentagemDesconto) > 0 && (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(Number(product.preco))}
              </p>
            )}

            {Number(product.porcentagemDesconto) > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
        </div>

        <div className="flex items-center gap-8 w-full mt-4">
          <Button
            size={"xl"}
            onClick={handleAddToCart}
            className="font-bold tracking-wide"
          >
            Adicionar ao carrinho
          </Button>
          <LikeButton>Salvar produto</LikeButton>
        </div>
      </div>

      <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />

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
