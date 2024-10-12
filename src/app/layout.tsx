import "./globals.css";
import type { Metadata } from "next";
import { Inter, } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "./context/cart";
import AuthProvider from "./providers/auth";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import SearchInput from "@/components/search-input";
import BottomNav from "@/components/bottom-nav";
import GoBackButton from "@/components/go-back-button";
import Link from "next/link";

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
    <html lang="en" className={`${inter.className}`}>
      <body>
        <AuthProvider>
          <CartProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="fixed top-0 w-full flex items-center justify-between gap-3 z-10 bg-background lg:hidden px-4 py-2">
                <GoBackButton />
                <SearchInput className="h-10" />
                <Link className=" flex items-center gap-3" href="/">
                  <svg
                    width="128"
                    height="60"
                    viewBox="0 0 128 60"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-fit w-[43px] fill-fg-primary"
                    data-sentry-element="svg"
                    data-sentry-source-file="MoToLogLogo.tsx"
                    data-sentry-component="MoToLogLogo"
                  >
                    <title>Moto Log</title>
                    <path
                      d="M128 28H96V60H128V28Z"
                      data-sentry-element="path"
                      data-sentry-source-file="MoToLogLogo.tsx"
                    ></path>
                    <path
                      d="M0 59.9998V31.8268L31.8268 0H59.9998V28.1731L28.1731 59.9998H0Z"
                      data-sentry-element="path"
                      data-sentry-source-file="MoToLogLogo.tsx"
                    ></path>
                    <path
                      d="M48 59.9998V31.8268L79.8268 0H108V28.1731L76.1731 59.9998H48Z"
                      data-sentry-element="path"
                      data-sentry-source-file="MoToLogLogo.tsx"
                    ></path>
                  </svg>
                </Link>
              </div>
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
