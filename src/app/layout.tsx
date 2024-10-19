import "./globals.css";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "./context/cart";
import AuthProvider from "./providers/auth";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import BottomNav from "@/components/bottom-nav";
import LoadingWrapper from "@/components/loading-wrapper";
import NextTopLoader from "nextjs-toploader";
import MobileHeader from "@/components/mobile-header";

const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

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
    <html lang="en" className={`${manrope.className}`}>
      <body>
        <AuthProvider>
          <CartProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <LoadingWrapper>
                <NextTopLoader />
                <MobileHeader />
                <Header />
                {children}
                <BottomNav />
                <Footer />
                <Toaster />
              </LoadingWrapper>
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
