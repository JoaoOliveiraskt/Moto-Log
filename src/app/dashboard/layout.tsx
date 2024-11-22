"use client";

import React from "react";
import Header from "./components/header";
import NavDashboard from "./components/nav";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size={32}/>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavDashboard />

      <div className="flex flex-col w-full flex-grow sm:gap-4 sm:py-4  ml-0 px-4 mt-[65px] lg:mt-0">
        <Header />

        <div className="">{children}</div>
      </div>
    </div>
  );
}
