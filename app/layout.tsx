import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import CartProvider from "@/providers/cart-context";

const dmMono = DM_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoos",
  description: "A shoe store built with Next.js and WooCommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${dmMono.className}`}
      >
        <CartProvider>
          {children}
        </CartProvider>

      </body>
    </html>
  );
}
