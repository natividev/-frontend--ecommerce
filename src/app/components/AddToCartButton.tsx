"use client";

import { useCart } from "@/context/CartContext";
import { IProduct } from "@/interfaces/IProducts";
import { toast } from "sonner";

export default function AddToCartButton({ product }: { product: IProduct }) {
  const { addItem, totalItems } = useCart();

  const handle = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Debes iniciar sesión para agregar al carrito");
      return;
    }

    addItem(product);
    toast.success(`🛒 Agregaste "${product.productName}" (${totalItems + 1})`);
  };

  return (
    <button
      onClick={handle}
      className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium shadow transition self-start"
    >
      Agregar al carrito
    </button>
  );
}
