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
    setIsCartOpen(true);
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

    // Se houver, abrir um modal de confirmação
    if (hasDifferentStoreProduct) {
      return setIsConfirmationModalOpen(true);
    }

    addToCart({
      emptyCart: false,
    });
  };

  return (
    <>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">{product.nome}</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
          </div>
          <p className="ml-2 text-gray-600">157 Avaliações</p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <p className="text-xl font-extrabold tracking-wide">
              {formatCurrency(calculateTotalPrice(product))}
            </p>
            {Number(product.porcentagemDesconto) > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {Number(product.porcentagemDesconto) > 0 && (
            <p className="text-gray-400 line-through">
              {formatCurrency(Number(product.preco))}
            </p>
          )}
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Descrição</h2>
          <h2 className="">
            {product.descricao} Conheça o novo tênis de corrida da marca X. Este
            tênis foi projetado com tecnologia avançada para proporcionar
            conforto e desempenho excepcionais durante suas corridas. Compre
            agora e ganhe frete grátis para o mundo todo.
          </h2>
        </div>

        <div className="grid gap-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex gap-2">
              <span className="text-muted-foreground">Color:</span>
              <span className="font-medium">Black</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Size:</span>
              <span className="font-medium">15.6 inch</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex gap-2">
              <span className="text-muted-foreground">Material:</span>
              <span className="font-medium">Full-grain Leather</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Weight:</span>
              <span className="font-medium">3.2 lbs</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <Button
            onClick={handleAddToCart}
            className="font-bold tracking-wide px-12 "
            size="xl"
          >
            Adicionar ao carrinho
          </Button>
          <Button
            className="flex gap-2 border-2 hover:border-zinc-900"
            size="xl"
            variant="outline"
          >
            <FaRegHeart size={20} />
          </Button>
        </div>

        <ul className="flex flex-col justify-between gap-4 text-gray-600">
          <li className="flex items-center">
            <svg
              className="w-6 h-6 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="ml-2">Frete grátis para o mundo todo</p>
          </li>
          <li className="flex items-center">
            <svg
              className="w-6 h-6 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <p className="ml-2">Pagamento 100% seguro</p>
          </li>
          <li className="flex items-center">
            <svg
              className="w-6 h-6 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <p className="ml-2">Feito por profissionais</p>
          </li>
        </ul>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="">Seu carrinho</SheetTitle>
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
              Você só pode adicionar produtos de uma loja por vez
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

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
