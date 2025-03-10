"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Icon from "@/components/icons/icon-component";
import Loader from "./ui/loader";

interface Props {
  className?: string;
}

const GoogleSignInButton = ({ className }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSigInClick = () => {
    setLoading(true);
    signIn("google");
  };

  return (
    <Button
      size={"xl"}
      onClick={(e) => {
        e.preventDefault();
        handleSigInClick();
      }}
      className={`flex items-center space-x-4 w-full ${className}`}
    >
      {loading ? <Loader /> : <Icon.google size={24} />}
      <span>Entrar com o Google</span>
    </Button>
  );
};

export default GoogleSignInButton;
