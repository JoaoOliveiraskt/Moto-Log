"use client";

import React from "react";
import Header from "./components/header";
import NavDashboard from "./components/nav";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col min-h-screen w-full">
          <NavDashboard />

          <div className="flex flex-col w-full flex-grow sm:gap-4 sm:py-4  ml-0 px-4 mt-[65px] lg:mt-0">
            <Header />

            <div className="">{children}</div>
          </div>
        </div>
      ) : (
        (router.push("/"), null)
      )}
    </>
  );
}
