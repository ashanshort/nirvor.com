import { searchProducts } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await searchProducts(q);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        “{q}” এর ফলাফল ({results.length})
      </h1>
      {results.length === 0 ? (
        <p>কিছু পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
