// app/page.tsx
import api from "@/utils/api";
import PromotionalBanner from "./components/PromotionalBanner";
import ProductGrid from "./components/ProductGrid";
import CategoryCarousel from "./components/CategoryCarousel";
import { IProduct } from "@/interfaces/IProducts";

export const revalidate = 60;

export default async function Home() {
  const [bannerRes, catRes, prodRes] = await Promise.all([
    api.get("/banner-promocionals"),
    api.get("/categories"),
    api.get("/products"),
  ]);

  const banners = bannerRes.data;
  const categories = catRes.data;
  const products: IProduct[] = prodRes.data;

  return (
    <>
      {/* Carrusel de banners dinámico */}
      <PromotionalBanner banners={banners} />

      {/* Productos destacados */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Productos Destacados</h2>

        {/* 
          Si quieres sólo los destacados:
          <ProductGrid products={products.filter(p => p.isFeatured)} />
          
          Si quieres mostrar todos:
        */}
        <ProductGrid products={products} />
      </section>

      {/* Carrusel de categorías */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Principales Categorías</h2>
        <CategoryCarousel categories={categories} />
      </section>
    </>
  );
}
