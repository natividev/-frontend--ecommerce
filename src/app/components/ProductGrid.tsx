import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Product {
  id: number;
  productName: string;
  price: number;
  images: { formats: { thumbnail: { url: string } } }[];
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((p) => {
        // URL completa
        const thumbUrl =
          process.env.NEXT_PUBLIC_API_URL! + p.images[0].formats.thumbnail.url;

        return (
          <Card key={p.id} className="hover:shadow-lg transition">
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
        );
      })}
    </div>
  );
}
