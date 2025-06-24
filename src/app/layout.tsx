import "./globals.css";
import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";

import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6">
              {children}
              <Toaster richColors position="top-right" />
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
