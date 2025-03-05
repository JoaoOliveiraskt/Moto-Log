"use client";

import { useState, useEffect } from "react";
import Icon from "./icons/icon-component";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import Loader from "./ui/loader";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "./login-modal";

interface Props {
  className?: string;
  size?: number;
  product: { id: string };
  children?: React.ReactNode;
  variant?: "icon" | "secondary";
  buttonSize?: "icon" | "rounded";
}

export default function FavoriteProductButton({
  className,
  size = 20,
  product,
  variant = "icon",
  buttonSize = "icon",
}: Props) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const loginModalDescription =
    "Você precisa estar logado para adicionar produtos aos favoritos.";

  const OpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const fetchFavoriteStatus = async () => {
    try {
      const response = await fetch(`/api/favorite-product/check/${product.id}`);
      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.isFavorited);
      }
    } catch (error) {
      console.error("Erro ao verificar status do favorito:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteStatus();
  }, [product.id]);

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      return OpenLoginModal();
    }

    setLoading(true);
    try {
      const response = await fetch("/api/favorite-product", {
        method: isFavorited ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (response.ok) {
        setIsFavorited(!isFavorited);
        !isFavorited ? showFavoritedToast() : showUnfavoritedToast();
      } else {
        const data = await response.json();
        throw new Error(data.message || "Erro ao atualizar favorito");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description:
          error instanceof Error ? error.message : "Erro ao atualizar favorito",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const showFavoritedToast = () => {
    toast({
      duration: 3000,
      // @ts-ignore
      title: (
        <div className="flex items-center gap-x-2">
          <Icon.confirmed color="green" size={20} />
          <p>Produto adicionado aos favoritos</p>
        </div>
      ),
    });
  };

  const showUnfavoritedToast = () => {
    toast({
      duration: 3000,
      title: "Produto removido dos favoritos",
    });
  };

  return (
    <>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={variant}
              size={buttonSize}
              disabled={loading}
              onClick={handleFavorite}
              className={`rounded-full border-none text-foreground hover:text-foreground ${className}`}
            >
              {loading ? (
                <Loader size={18} />
              ) : isFavorited ? (
                <Icon.bookmark size={size} fill="" className="fill-destructive stroke-destructive" />
              ) : (
                <Icon.bookmark size={size} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isFavorited ? "Remover favorito" : "Favoritar"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <LoginModal
        open={isLoginModalOpen}
        onOpenChange={setIsLoginModalOpen}
        description={loginModalDescription}
      />
    </>
  );
}
