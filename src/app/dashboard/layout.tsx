import React from "react";
import MobileHeader from "./components/mobile-dashboard-header";
import NavDashboard from "./components/nav";
import { redirect } from "next/navigation";
import Container from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import GoBackButton from "@/components/go-back-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <Container className="mt-12 lg:mt-14">
      <div className="lg:flex items-center gap-x-4  hidden">
        <GoBackButton className="hidden lg:flex" />
        <NavDashboard />
      </div>
      <div className="flex flex-col w-full sm:gap-4">
        <MobileHeader />

        <div>{children}</div>
      </div>
    </Container>
  );
}
