"use client";

import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import React from "react";

const EmptyFollowing = () => {
  return (
    <EmptyState
      icon={
        <DotLottieReact
          src="https://lottie.host/c64bc19b-b529-4f4b-af05-3f65c4c5b24f/XP4yJFziat.lottie"
          loop
          autoplay
        />
      }
      title="Você ainda não segue nenhuma loja."
      description="Siga lojas para receber atualizações de produtos e promoções."
    >
      <div className="flex items-center justify-center w-full">
        <Button size={"xl"} asChild className="w-fit">
          <Link href="/community">Procure lojas para seguir</Link>
        </Button>
      </div>
    </EmptyState>
  );
};

export default EmptyFollowing;
