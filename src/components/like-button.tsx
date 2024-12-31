"use client";

import { useState } from "react";
import Icon from "./icons/icon-component";
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
  variant?: "icon" | "secondary";
  buttonSize?: "icon" | "rounded";
  name?: string;
}

export default function LikeButton({
  className,
  size = 20,
  product,
  children,
  variant = "icon",
  buttonSize = "icon",
  name,
}: Props) {
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
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={buttonSize}
            disabled={loading}
            className={`rounded-full border-none text-foreground hover:text-foreground ${className}`}
          >
            {liked ? (
              <Icon.bookmark size={size} className={`text-destructive`} />
            ) : (
              <Icon.bookmark size={size} className={``} />
            )}
          </Button>
        </TooltipTrigger>
        {children && <TooltipContent>{children}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}
