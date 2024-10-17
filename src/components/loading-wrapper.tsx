"use client";

import { useState, useEffect } from "react";
import LoadingPage from "./loading-page";

interface Props {
  children: React.ReactNode;
}

export default function LoadingWrapper({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
