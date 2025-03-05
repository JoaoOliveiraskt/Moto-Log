"use client";

import EmptyState from "@/components/empty-state";
import HeaderLoginBtn from "@/components/header-login-btn";
import LoginDialog from "@/components/login-dialog";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  user: any;
}

const EmptyCart = ({ user }: Props) => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const openLoginDialog = () => setIsLoginDialogOpen(true);

  return (
    <>
      <EmptyState
        icon={
          <DotLottieReact
            src="https://lottie.host/5f007bd6-68a4-4b8f-91b7-74859d3535a1/JisfzD7Qd9.lottie"
            loop
            autoplay
          />
        }
        title="Seu carrinho está vazio"
        description={
          !user
            ? "Entre para adicionar algum item ao carrinho. Ou continue comprando."
            : "Continue comprando e adicione produtos ao seu carrinho."
        }
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 w-full">
          {!user && (
            <HeaderLoginBtn
              size="xl"
              onClick={openLoginDialog}
              className="w-full lg:w-fit bg-foreground"
            />
          )}
          <Button
            size={"xl"}
            variant={!user ? "outline" : "default"}
            asChild
            className="w-full lg:w-fit"
          >
            <Link href="/">Continuar comprando</Link>
          </Button>
        </div>
      </EmptyState>
      <LoginDialog
        open={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
      />
    </>
  );
};

export default EmptyCart;
