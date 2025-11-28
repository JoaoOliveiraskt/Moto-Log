"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import GoBackButton from "./go-back-button";
import Icon from "./icons/icon-component";
import SearchInputButton from "@/app/search/components/search-input-button";

const MobileHeader = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isResultsPage = pathname === "/search/results";
  const searchTerm = searchParams.get("q") || "";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingUp(false);
      } else {
        setScrollingUp(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: scrollingUp ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full flex items-center justify-between gap-2 z-40 bg-background lg:hidden px-4 lg:px-12 h-12"
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
    </motion.div>
  );
};

export default MobileHeader;
