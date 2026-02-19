import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import CartProvider from "@/providers/cart-context";
import PageTransition from "@/components/PageTransition";

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
          <PageTransition>
            {children}
          </PageTransition>
        </CartProvider>

      </body>
    </html>
  );
}
