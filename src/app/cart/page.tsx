"use client";

import { useState } from "react";
import Image from "next/image"; // ← Importa Image
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { getStripe } from "@/utils/stripe";

export default function CartPage() {
  const { items, removeItem, clearCart, updateItemQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const { sessionId } = await res.json();
      if (!sessionId) {
        toast.error("No se pudo crear la sesión de pago");
        setLoading(false);
        return;
      }
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({ sessionId });
      if (error) throw error;
    } catch (err) {
      console.error(err);
      toast.error("Error al procesar el pago");
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
        {items.map((item) => {
          // construyo la URL completa de la imagen
          const imgSrc = item.imageUrl
            ? `${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`
            : "/placeholder.png";

          return (
            <li
              key={item.id}
              className="flex items-center border-b pb-4 space-x-4"
            >
              {/* Miniatura */}
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image
                  src={imgSrc}
                  alt={item.productName}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded"
                />
              </div>

              {/* Detalle */}
              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-600">
                  Precio unitario: ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Controles de cantidad */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center bg-zinc-200 rounded"
                >
                  −
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-zinc-200 rounded"
                >
                  +
                </button>
              </div>

              {/* Subtotal y eliminar */}
              <div className="text-right space-y-1">
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Total y Checkout */}
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
