import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Mi E-commerce",
  description: "Tienda online con Next.js y Strapi",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
