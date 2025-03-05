"use client";

import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

export default function EmptyOrder() {
  return (
    <EmptyState
      title="Você ainda não fez nenhum pedido."
      description="Continue comprando e faça seu primeiro pedido."
      icon={
        <DotLottieReact
          src="https://lottie.host/8babec50-415c-4313-834d-de5b004f51b9/HzUpePYRoO.lottie"
          loop
          autoplay
        />
      }
    >
      <div className="flex items-center justify-center w-full">
        <Button asChild className="w-fit">
          <Link href="/">Ir às compras</Link>
        </Button>
      </div>
    </EmptyState>
  );
}
