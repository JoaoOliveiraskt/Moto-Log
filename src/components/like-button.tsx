"use client";

import { useState } from "react";
import icon from "./icons/icon-component";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

interface Props {
  className?: string;
  size?: number;
  product?: { id: string };
  children?: React.ReactNode;
}

export default function LikeButton({ className, size = 24, product, children }: Props) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    const response = await fetch("/api/favorite-product", {
      method: liked ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: product?.id }),
    });

    if (response.ok) {
      setLiked(!liked);
      liked ? showUnlikedToast() : showLikedToast();
    } else {
      toast({
        title: "Erro ao adicionar aos favoritos",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const showLikedToast = () => {
    toast({
      title: "Produto adicionado aos favoritos",
    });
  };

  const showUnlikedToast = () => {
    toast({
      title: "Produto removido dos favoritos",
    });
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip >
        <TooltipTrigger asChild >
          <Button
           
            variant={"icon"}
            size={"icon"}
            disabled={loading}
            className={`flex items-center justify-center rounded-full border-none text-foreground hover:text-foreground ${className}`}
          >
            {liked ? (
              <icon.bookmark2
                size={size}
                className={`text-destructive`}
                title="remover dos favoritos"
              />
            ) : (
              <icon.bookmark
                size={size}
                className={``}
                title="Adicionar aos favoritos"
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent >
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
