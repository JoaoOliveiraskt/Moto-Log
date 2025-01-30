import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { CartProvider } from "./context/cart";
import AuthProvider from "./providers/auth";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import BottomNav from "@/components/bottom-nav";
import NextTopLoader from "nextjs-toploader";
import MobileHeader from "@/components/mobile-header";
import QueryProvider from "@/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moto Log App",
  description: "Moto Log App - O lugar que simplifica suas compras e vendas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={`overflow-y-scroll ${inter.className}`}>
          <AuthProvider>
            <CartProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <NextTopLoader />
                <MobileHeader />
                <Header />
                {children}
                <BottomNav />
                <Toaster />
              </ThemeProvider>
            </CartProvider>
          </AuthProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
