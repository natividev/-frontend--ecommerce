import ProductCreateForm from "../components/ProductCreateForm";
import ProductGrid from "../components/ProductGrid";

export default function ProductsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      <div className="mb-10">
        <ProductCreateForm />
      </div>

      <ProductGrid products={[]} />
    </div>
  );
}
