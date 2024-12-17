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
    <div className="w-full flex items-center justify-center">
      <Button
        size={"rounded"}
        onClick={(e) => {
          e.preventDefault();
          handleSigInClick();
        }}
        className={`flex items-center space-x-4 ${className}`}
      >
        <Icon.google size={24} />
        <span>Entrar com o Google</span>
        {loading ? <Loader /> : <Icon.signIn size={18} />}
      </Button>
    </div>
  );
};

export default GoogleSignInButton;
