import "./globals.css";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "./context/cart";
import AuthProvider from "./providers/auth";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import SearchInput from "@/components/search-input";
import BottomNav from "@/components/bottom-nav";
import GoBackButton from "@/components/go-back-button";
import MotoLogLogo from "@/components/icons/moto-log-logo";
import { Suspense } from "react";
import LoadingPage from "@/components/loading-page";
import LoadingWrapper from "@/components/loading-wrapper";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

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
    <html lang="en" className={`${manrope.className}`}>
      <body>
        <NextTopLoader />
        <AuthProvider>
          <CartProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <LoadingWrapper>
                <Suspense fallback={<LoadingPage />}>
                  <div className="fixed top-0 w-full flex items-center justify-between gap-3 z-10 bg-background lg:hidden px-4 py-2">
                    <GoBackButton />
                    <SearchInput className="h-10" />
                    <MotoLogLogo />
                  </div>
                  <Header />
                  {children}
                  <BottomNav />
                  <Footer />
                  <Toaster />
                </Suspense>
              </LoadingWrapper>
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
