"use client";

import { useState } from "react";
import LoginDialog from "./login-dialog";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function HeaderLoginBtn() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <div className={`${isAuthenticated ? "hidden" : ""}`}>
      <Button size={"sm"} onClick={toggle} className="text-sm font-semibold tracking-wider rounded-full">
        Login
      </Button>
      <LoginDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
