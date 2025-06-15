import Image from "next/image";

interface Category {
  id: number;
  categoryName: string;
  mainImage: {
    formats: { thumbnail: { url: string; width: number; height: number } };
  };
}

export default function CategoryCarousel({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="flex overflow-x-auto space-x-6 py-2">
      {categories.map((cat) => {
        const thumbUrl =
          process.env.NEXT_PUBLIC_API_URL! +
          cat.mainImage.formats.thumbnail.url;

        return (
          <div key={cat.id} className="flex-shrink-0 w-32 text-center">
            <div
              className="
                w-24 h-24 
                mx-auto mb-2 
                bg-gray-100 
                rounded-full 
                overflow-hidden 
                relative 
                flex items-center justify-center
                p-2          /* espacio interior */
              "
            >
              <Image
                src={thumbUrl}
                alt={cat.categoryName}
                fill
                className="object-contain"
              />
            </div>
            <span className="block">{cat.categoryName}</span>
          </div>
        );
      })}
    </div>
  );
}
