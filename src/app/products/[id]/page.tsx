import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductGrid from "@/app/components/ProductGrid";

interface Category {
  id: number;
  categoryName: string;
}

interface Product {
  id: number;
  productName: string;
  description?: string;
  price: number;
  slug?: string;
  category?: Category;
  images?: { url: string }[];
}

export const revalidate = 60;

export default async function ProductDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  let product: Product | null = null;

  if (/^\d+$/.test(id)) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return notFound();
    product = await res.json();
  } else {
    const resSlug = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?slug=${id}`,
      { next: { revalidate: 60 } }
    );
    if (!resSlug.ok) return notFound();
    const list: Product[] = await resSlug.json();
    if (!list[0]) return notFound();
    product = list[0];
  }

  if (!product) return notFound();

  const imageUrl = product.images?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${product.images[0].url}`
    : "/placeholder.png";

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-12">
      <Link
        href="/"
        className="inline-block text-zinc-600 hover:text-zinc-800 mb-4 transition"
      >
        ← Volver al listado
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:w-1/2 h-80 rounded-lg overflow-hidden shadow">
          <Image
            src={imageUrl}
            alt={product.productName}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div>
            <h1 className="text-4xl font-extrabold">{product.productName}</h1>
            {product.category && (
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {product.category.categoryName}
              </span>
            )}
            <p className="text-3xl font-semibold mt-6">${product.price}</p>
            {product.description && (
              <div className="mt-6 text-gray-700 leading-relaxed">
                {product.description}
              </div>
            )}
          </div>

          <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium shadow transition self-start">
            Agregar al carrito
          </button>
        </div>
      </div>

      {product.category && (
        <SuggestedByCategory
          currentId={product.id}
          categoryId={product.category.id}
        />
      )}
    </div>
  );
}

async function SuggestedByCategory({
  currentId,
  categoryId,
}: {
  currentId: number;
  categoryId: number;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?category=${categoryId}&_limit=1000`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const list: Product[] = await res.json();
  const others = list.filter((p) => p.id !== currentId);

  if (others.length === 0) return null;
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Productos sugeridos</h2>
      <ProductGrid products={others} />
    </section>
  );
}
