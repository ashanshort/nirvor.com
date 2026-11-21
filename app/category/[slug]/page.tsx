import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const products = await getProductsByCategory(slug);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {category.icon} {category.nameBn}
      </h1>
      {products.length === 0 ? (
        <p>এই ক্যাটাগরিতে এখনো পণ্য নেই।</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
