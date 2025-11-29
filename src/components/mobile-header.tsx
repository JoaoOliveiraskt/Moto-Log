"use client";

import { usePathname, useSearchParams } from "next/navigation";
import GoBackButton from "./go-back-button";
import Icon from "./icons/icon-component";
import SearchInputButton from "@/app/search/components/search-input-button";

const MobileHeader = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isResultsPage = pathname === "/search/results";
  const searchTerm = searchParams.get("q") || "";

  return (
    <div
      className="px-4 lg:px-12 h-12 fixed top-0 w-full flex items-center justify-between gap-2 z-40 bg-background lg:hidden "
    >
      <GoBackButton />
      {isResultsPage && (
        <div className="flex-1 mr-4">
          <SearchInputButton searchTerm={searchTerm} />
        </div>
      )}
      <div className="ml-auto flex justify-end items-center">
        <Icon.notification className="text-primary" size={24} />
      </div>
    </div>
  );
};

export default MobileHeader;
