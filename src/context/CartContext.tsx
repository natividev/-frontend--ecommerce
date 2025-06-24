"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
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

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addItem = (product: IProduct) => {
    setItems((prev) => {
      const imgPath = product.images?.[0]?.url;
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
