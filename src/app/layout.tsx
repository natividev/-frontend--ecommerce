import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Mi E-commerce",
  description: "Tienda online con Next.js y Strapi",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
            <Toaster richColors position="top-right" />
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
