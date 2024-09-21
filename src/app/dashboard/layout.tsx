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
    <div className="flex min-h-screen w-full flex-col mt-[72px]">
      <Aside />

      <div className="flex flex-col sm:gap-4 sm:py-4 md:pl-44">
        <Header />

        <div className="px-4 sm:px-10">{children}</div>
      </div>
    </div>
  );
}
