"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const { sessionUrl } = await res.json();
      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        toast.error("No se pudo crear la sesión de pago");
      }
    } catch {
      toast.error("Error de red al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <p className="text-center mt-12">Tu carrito está vacío.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Tu Carrito</h1>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{item.productName}</p>
              <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded disabled:opacity-50 transition"
        >
          {loading ? "Procesando..." : "Procesar pago"}
        </button>
      </div>

      <button
        onClick={clearCart}
        className="mt-4 text-center text-zinc-500 hover:underline block"
      >
        Vaciar carrito
      </button>
    </div>
  );
}
