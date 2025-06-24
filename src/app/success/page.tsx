"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Ejecutar una sola vez, sin depender de clearCart directamente
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-8 max-w-xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold">¡Gracias por tu compra!</h1>
      <p className="text-gray-700">
        Hemos recibido tu pago correctamente. Te enviaremos un correo con los
        detalles de tu pedido.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
