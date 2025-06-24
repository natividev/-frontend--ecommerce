"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CategoryCreateForm() {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("data", JSON.stringify({ categoryName }));
    if (image) formData.append("files.mainImage", image);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      toast("Categoría creada", {
        description: "Haz clic para ver el detalle.",
        action: {
          label: "Ver",
          onClick: () => router.push(`/categories/${data.id}`),
        },
      });
      setCategoryName("");
      setImage(null);
    } else {
      toast.error("Error al crear la categoría");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold">Crear nueva categoría</h2>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Nombre de la categoría"
        className="border p-2 w-full"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full"
      />
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={URL.createObjectURL(image)}
          alt="Vista previa"
          className="w-32 h-32 object-contain"
        />
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => router.push("/categories/admin")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 bg-white text-zinc-700 shadow-sm hover:bg-zinc-100 transition-all"
        >
          Volver
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-all"
        >
          Guardar categoría
        </button>
      </div>
    </form>
  );
}
