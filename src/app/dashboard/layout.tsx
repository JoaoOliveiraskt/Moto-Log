"use client";

import React from "react";
import Header from "./components/header";
import Aside from "./components/aside";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Aside />

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 mt-[72px]">
        <Header />

        <div className="px-4 sm:px-10 py-4">{children}</div>
      </div>
    </div>
  );
}
