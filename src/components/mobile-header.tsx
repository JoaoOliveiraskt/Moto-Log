"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GoBackButton from "./go-back-button";
import Icon from "./icons/icon-component";

const MobileHeader = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      className="fixed top-0 w-full flex items-center justify-between gap-3 z-40 bg-background lg:hidden px-4 lg:px-12 h-12"
    >
      <GoBackButton />
      <div className="ml-auto flex justify-end items-center">
        <Icon.notification className="text-primary" size={24} />
      </div>
    </motion.div>
  );
};

export default MobileHeader;
