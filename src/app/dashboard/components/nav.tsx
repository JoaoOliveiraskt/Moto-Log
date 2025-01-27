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
        "sticky top-0 z-10 lg:flex hidden items-center w-full py-4",
        className
      )}
    >
      <div className="w-full flex gap-x-8 px-0 md:px-0">
        <Suspense fallback={<StoreSelectSkeleton />}>
          <UserStoreSelector />
        </Suspense>

        <ServerNavLinks />
      </div>
    </header>
  );
}
