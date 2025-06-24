import { notFound } from "next/navigation";
import Image from "next/image";

interface Category {
  id: number;
  categoryName: string;
  slug: string;
  mainImage?: { url: string };
}

interface CategoryDetailPageProps {
  params: { id: string };
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
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
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${category.mainImage.url}`}
          alt={category.categoryName}
          width={400}
          height={300}
          className="w-full max-w-sm h-auto rounded-md shadow mb-4"
          unoptimized
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
