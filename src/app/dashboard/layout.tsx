"use client";

import React from "react";
import Header from "./components/header";
import NavDashboard from "./components/nav";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";
import Container from "@/components/container";

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
        <Loader size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  return (
    <Container className="flex flex-col min-h-screen w-full mt-12 lg:mt-14">
      <NavDashboard />

      <div className="flex flex-col w-full sm:gap-4">
        <Header />

        <div className="">{children}</div>
      </div>
    </Container>
  );
}
