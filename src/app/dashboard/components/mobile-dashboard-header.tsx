import { Suspense } from "react";
import MenuSideBar from "./menu-sidebar";
import UserStoreSelector from "./store-select";
import { StoreSelectSkeleton } from "./store-select-skeleton";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 bg-background md:static md:h-auto md:border-0 ">
      <MenuSideBar />

      <div className="lg:hidden">
        <Suspense fallback={<StoreSelectSkeleton />}>
          <UserStoreSelector />
        </Suspense>
      </div>
    </header>
  );
}
