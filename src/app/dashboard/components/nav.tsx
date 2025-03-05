import UserStoreSelector from "./store-select";
import { cn } from "@/lib/utils";
import ServerNavLinks from "./server-nav-links";
import { Suspense } from "react";
import { StoreSelectSkeleton } from "./store-select-skeleton";

interface Props {
  className?: string;
}

export default function NavDashboard({ className }: Props) {
  return (
    <header
      className={cn(
        "hidden lg:flex items-center w-full gap-x-8 bg-background",
        className
      )}
    >
      <Suspense fallback={<StoreSelectSkeleton />}>
        <UserStoreSelector />
      </Suspense>

      <ServerNavLinks />
    </header>
  );
}
