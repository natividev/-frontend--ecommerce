import { notFound } from "next/navigation";

interface Category {
  id: number;
  categoryName: string;
  slug: string;
  mainImage?: { url: string };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${params.id}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return notFound();

  const category: Category = await res.json();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{category.categoryName}</h1>

      {category.mainImage?.url && (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${category.mainImage.url}`}
          alt={category.categoryName}
          className="w-full max-w-sm h-auto rounded-md shadow mb-4"
        />
      )}

      <p className="text-gray-600">
        Slug: <strong>{category.slug}</strong>
      </p>
      <p className="text-sm text-zinc-500 mt-2">
        ID: <code>{category.id}</code>
      </p>
    </div>
  );
}
