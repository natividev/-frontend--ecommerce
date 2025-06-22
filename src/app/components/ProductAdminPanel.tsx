"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  categoryName: string;
}

interface Product {
  id: number;
  productName: string;
  price: number;
  active: boolean;
  category?: Category;
}

export default function ProductAdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ productName: "", price: 0, category: 0 });
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const data = await res.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const data = await res.json();
    setCategories(data);
  };

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      productName: p.productName,
      price: p.price,
      category: p.category?.id || 0,
    });
  };

  const handleUpdate = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: form.productName,
          price: form.price,
          category: form.category,
        }),
      }
    );

    if (res.ok) {
      toast.success("Producto actualizado correctamente");
      setEditingId(null);
      fetchProducts();
    } else {
      toast.error("Error al actualizar el producto");
    }
  };

  const handleDelete = async (id: number) => {
    toast("¿Deseas eliminar este producto?", {
      description: "Esta acción no se puede deshacer.",
      action: {
        label: "Eliminar",
        onClick: async () => {
          await toast.promise(
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
              method: "DELETE",
            }),
            {
              loading: "Eliminando producto...",
              success: () => {
                fetchProducts();
                return "Producto eliminado con éxito";
              },
              error: "Error al eliminar el producto",
            }
          );
        },
      },
    });
  };

  const toggleActive = async (id: number, currentState: boolean) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentState }),
      }
    );

    if (res.ok) {
      toast.success(`Producto ${currentState ? "desactivado" : "activado"}`);
      fetchProducts();
    } else {
      toast.error("Error al cambiar el estado");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Administrar Productos</h1>
        <button
          onClick={() => router.push("/products")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition"
        >
          Crear nuevo producto
        </button>
      </div>

      <table className="w-full border text-sm text-zinc-800">
        <thead>
          <tr className="bg-zinc-100">
            <th className="p-2 text-left">Nombre</th>
            <th className="text-left">Precio</th>
            <th className="text-left">Categoría</th>
            <th className="text-center">Activo</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t hover:bg-zinc-50">
              <td className="p-2">
                {editingId === p.id ? (
                  <input
                    value={form.productName}
                    onChange={(e) =>
                      setForm({ ...form, productName: e.target.value })
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  p.productName
                )}
              </td>
              <td>
                {editingId === p.id ? (
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: Number(e.target.value) })
                    }
                    className="border rounded p-1 w-24"
                  />
                ) : (
                  `$${p.price}`
                )}
              </td>
              <td>
                {editingId === p.id ? (
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: Number(e.target.value) })
                    }
                    className="border rounded p-1"
                  >
                    <option value={0}>Sin categoría</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.categoryName}
                      </option>
                    ))}
                  </select>
                ) : (
                  p.category?.categoryName || "-"
                )}
              </td>
              <td className="text-center">{p.active ? "✅" : "❌"}</td>
              <td className="flex justify-center gap-2 py-2">
                {editingId === p.id ? (
                  <button
                    onClick={() => handleUpdate(p.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => toggleActive(p.id, p.active)}
                  className="bg-zinc-600 hover:bg-zinc-700 text-white px-3 py-1 rounded-md"
                >
                  {p.active ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
