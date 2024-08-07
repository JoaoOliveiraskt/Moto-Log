

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "./context/cart";
import AuthProvider from "./providers/auth";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';


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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <AuthProvider>
          <CartProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            
            {children}
            
              <Toaster />
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
