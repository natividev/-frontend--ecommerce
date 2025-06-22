"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Category {
  id: number;
  categoryName: string;
  slug: string;
  mainImage?: { url: string };
  active: boolean;
}

export default function CategoryAdminPanel() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const data = await res.json();
    setCategories(data);
  };

  const handleDelete = async (id: number) => {
    toast("¿Deseas eliminar esta categoría?", {
      description: "Esta acción no se puede deshacer.",
      action: {
        label: "Eliminar",
        onClick: async () => {
          await toast.promise(
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
              method: "DELETE",
            }),
            {
              loading: "Eliminando categoría...",
              success: () => {
                fetchCategories();
                return "Categoría eliminada con éxito";
              },
              error: "Error al eliminar la categoría",
            }
          );
        },
      },
    });
  };

  const toggleActive = async (id: number, currentState: boolean) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentState }),
      }
    );

    if (res.ok) {
      toast.success("Estado actualizado");
      fetchCategories();
    } else {
      toast.error("Error al cambiar el estado");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Administrar Categorías</h1>
        <button
          onClick={() => router.push("/categories")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition"
        >
          Crear nueva categoria
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-zinc-100">
            <th className="p-2">Imagen</th>
            <th>Nombre</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">
                {c.mainImage?.url ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${c.mainImage.url}`}
                    alt={c.categoryName}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  "-"
                )}
              </td>
              <td>{c.categoryName}</td>
              <td className="text-center">{c.active ? "✅" : "❌"}</td>
              <td className="flex gap-2 py-2">
                <button
                  onClick={() => toggleActive(c.id, c.active)}
                  className="bg-zinc-600 hover:bg-zinc-700 text-white px-3 py-1 rounded"
                >
                  {c.active ? "Desactivar" : "Activar"}
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
