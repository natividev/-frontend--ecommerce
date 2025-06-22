import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Product {
  id: number;
  productName: string;
  price: number;
  slug?: string;
  images?: { formats: { thumbnail: { url: string } } }[];
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((p) => {
        const hasThumb = p.images?.[0]?.formats?.thumbnail?.url;
        const thumbUrl = hasThumb
          ? `${process.env.NEXT_PUBLIC_API_URL}${
              p.images![0].formats.thumbnail.url
            }`
          : "/placeholder.png";

        // Usamos slug si existe, sino id
        const href = `/products/${p.slug ?? p.id}`;

        return (
          <Link
            key={p.id}
            href={href}
            className="block hover:shadow-lg transition"
          >
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="w-full h-40 relative mb-4">
                  <Image
                    src={thumbUrl}
                    alt={p.productName}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 className="text-lg font-medium">{p.productName}</h3>
              </CardContent>
              <CardFooter className="p-4">
                <span className="font-semibold">${p.price}</span>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
