"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Category {
  id: number;
  categoryName: string;
}
interface ProductPayload {
  productName: string;
  description: string;
  price: number;
  isFeatured: boolean;
  category?: number;
}

export default function ProductCreateForm() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        const data = await res.json();
        setCategories(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("Error cargando categorías");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataPayload: ProductPayload = {
      productName,
      description,
      price,
      isFeatured: true,
    };

    if (selectedCategory) {
      dataPayload.category = selectedCategory;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(dataPayload));
    if (image) {
      formData.append("files.images", image);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Producto creado correctamente");
        setProductName("");
        setDescription("");
        setPrice(0);
        setImage(null);
        setSelectedCategory(null);
      } else {
        const error = await res.json();
        console.error(error);
        toast.error("Error al crear el producto");
      }
    } catch (err) {
      toast.error("Error de red al crear el producto");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Nombre del producto"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="w-full border p-2"
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2"
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="w-full border p-2"
        required
      />
      <select
        value={selectedCategory ?? ""}
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
        className="w-full border p-2"
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.categoryName}
          </option>
        ))}
      </select>
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
          className="w-32 h-32 object-contain mt-2"
        />
      )}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => router.push("/products/admin")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 bg-white text-zinc-700 shadow-sm hover:bg-zinc-100 transition-all"
        >
          Volver
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-all"
        >
          Crear Producto
        </button>
      </div>
    </form>
  );
}
