"use client";

import React from "react";
import Header from "./components/header";
import Aside from "./components/aside";
import NavDashboard from "./components/nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
