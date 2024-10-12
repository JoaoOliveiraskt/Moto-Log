"use client";

import { useState } from "react";
import icon from "./icons/icon-component";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

interface Props {
  className?: string;
  size?: number;
}

export default function LikeButton({ className, size = 24 }: Props) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
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
    <Button
      variant={"icon"}
      size={"icon"}
      onClick={() => {
        handleLike();
        liked ? showUnlikedToast() : showLikedToast();
      }}
      className={`flex items-center justify-center rounded-full border-none text-foreground ${className}`}
    >
      {liked ? (
        <icon.bookmark2 size={size} className={`text-destructive`} />
      ) : (
        <icon.bookmark size={size} className={``} />
      )}
    </Button>
  );
}
