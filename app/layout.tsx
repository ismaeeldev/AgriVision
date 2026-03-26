import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { ChatbotWidget } from "@/components/ui/ChatbotWidget";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriVision | Smart Crop Protection",
  description: "Premium pesticide and crop protection solutions for modern farmers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${inter.variable} antialiased`}>
        <CartProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
          <ChatbotWidget />
        </CartProvider>
      </body>
    </html>
  );
}
