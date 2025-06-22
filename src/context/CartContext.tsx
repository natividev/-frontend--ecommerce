// context/CartContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { IProduct } from "@/interfaces/IProducts";

interface CartItem extends IProduct {
  quantity: number;
  imageUrl?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: IProduct) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: IProduct) => {
    setItems((prev) => {
      // ruta relativa que Strapi devuelve, p. ej. "/uploads/imagen.png"
      const imgPath = product.images?.[0]?.url;
      console.log("imgPath", imgPath);

      const exists = prev.find((it) => it.id === product.id);
      if (exists) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          // guardamos la ruta relativa
          imageUrl: imgPath,
        },
      ];
    });
  };

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const clearCart = () => setItems([]);

  const updateItemQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      // si la cantidad baja a cero, lo eliminamos
      removeItem(id);
    } else {
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, quantity } : it))
      );
    }
  };

  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        updateItemQuantity,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
