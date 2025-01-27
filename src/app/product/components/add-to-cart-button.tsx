"use client";

import { useContext, useState } from "react";
import { CartContext } from "@/app/context/cart";
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
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Icon from "@/components/icons/icon-component";
import Link from "next/link";
import LoginModal from "@/components/login-modal";

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

export default function AddToCartButton({ product }: ProductInfoProps) {
  const { addProductToCart, products } = useContext(CartContext);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const loginModalDescription =
    "Você precisa estar logado para adicionar produtos ao carrinho.";
  const { toast } = useToast();

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product, emptyCart, quantity: 1 });
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
      duration: 3000,
      // @ts-ignore
      title: (
        <div className="flex items-center gap-x-2">
          <Icon.confirmed color="green" size={20} />
          <span>Produto adicionado ao carrinho</span>
        </div>
      ),
      action: (
        <ToastAction altText="Ver carrinho">
          <Link legacyBehavior href="/cart">
            Ver carrinho
          </Link>
        </ToastAction>
      ),
    });
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-2 w-full">
          <Button
            size={"rounded"}
            variant={"secondary"}
            onClick={handleAddToCart}
          >
            Adicionar ao carrinho
          </Button>
        </div>
      </div>

      <LoginModal
        open={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
        description={loginModalDescription}
      />

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
