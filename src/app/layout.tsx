import "./globals.css";
import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "./context/cart";
import AuthProvider from "./providers/auth";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";

import { GeistSans } from "geist/font/sans";
import SearchInput from "@/components/search-input";
import BottomNav from "@/components/bottom-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moto Log",
  description: "Moto Log App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.className}`}>
      <body>
        <AuthProvider>
          <CartProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <SearchInput className="fixed top-0 right-0 w-full p-2 z-10 h-16 max-w-md mx-auto lg:hidden" />
              <Header />
              {children}
              <BottomNav />
              <Footer />
              <Toaster />
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
