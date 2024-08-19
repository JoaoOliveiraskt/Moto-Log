"use client";

import { useContext, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { CartContext } from "@/app/context/cart";
import { FaCircle } from "react-icons/fa";
import DiscountBadge from "./discount-badge";
import calculateTotalPrice from "@/app/helpers/price";
import formatCurrency from "@/app/helpers/format-currency";
import { Prisma } from "../../../../prisma/generated/client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import icon from "@/components/icons/icon-component";
import LikeButton from "@/components/like-button";

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
    // Verificar se há algum produto de outra loja no carrinho
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
        <ToastAction altText="Ver pedido" onClick={() => setIsCartOpen(true)}>
          Ver carrinho
        </ToastAction>
      ),
    });
  };

  return (
    <>
      <div className="flex flex-col w-full gap-6">
        <h1 className="text-3xl font-bold">{product.nome}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-yellow-400 ">
            <icon.star size={20} />
            <icon.star size={20} />
            <icon.star size={20} />
            <icon.star size={20} />
            <icon.star size={20} />
          </div>
          <p className="ml-2 ">157 Avaliações</p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <p className="text-xl font-bold tracking-wide">
              {formatCurrency(Number(calculateTotalPrice(product)))}
            </p>
            {Number(product.porcentagemDesconto) > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {Number(product.porcentagemDesconto) > 0 && (
            <p className="text-muted-foreground line-through">
              {formatCurrency(Number(product.preco))}
            </p>
          )}
        </div>

        <div className="flex items-center gap-5 w-full">
          <Button
            size={"lg"}
            onClick={handleAddToCart}
            className="font-bold tracking-wide"
          >
            Adicionar ao carrinho
          </Button>
          <LikeButton />
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Descrição</h2>
          <h2 className="text-muted-foreground max-w-screen-sm">
            {product.descricao} Conheça o novo tênis de corrida da marca X. Este
            tênis foi projetado com tecnologia avançada para proporcionar
            conforto e desempenho excepcionais durante suas corridas. Compre
            agora e ganhe frete grátis para o mundo todo.
          </h2>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full">
          <SheetHeader>
            <SheetTitle>Seu carrinho</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Faça o Login</AlertDialogTitle>
            <AlertDialogDescription>
              Você precisa estar logado para adicionar produtos ao carrinho.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
