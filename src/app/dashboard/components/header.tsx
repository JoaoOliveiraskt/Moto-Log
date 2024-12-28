"use client";

import { useState } from "react";
import MenuSideBar from "./menu-sidebar";
import StoreSelect from "./store-select";

export default function Header() {
  const [storeName, setStoreName] = useState<string>("Minha Loja");
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 bg-background md:static md:h-auto md:border-0 ">
      <MenuSideBar />

      <div className="lg:hidden">
      <StoreSelect onStoreChange={setStoreName} />
      </div>
    </header>
  );
}
