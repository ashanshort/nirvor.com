import Link from "next/link";
import { getBestSelling, getCategories, getProducts } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const [categories, products, bestSelling] = await Promise.all([
    getCategories(),
    getProducts(),
    getBestSelling(),
  ]);

  return (
    <div className="space-y-12">
      <section className="bg-brand-green text-brand-gold rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">বিশ্বস্ত মানের, সরাসরি আপনার ঘরে</h1>
        <p className="text-white/80 max-w-xl">খাঁটি চাল, ঘি, মধু, ডাল ও তেল। ক্যাশ অন ডেলিভারিতে অর্ডার করুন।</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-center">ক্যাটাগরি</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="bg-white rounded-xl border border-brand-gold/30 p-5 text-center hover:shadow-md transition"
            >
              <div className="text-3xl mb-2">{c.icon}</div>
              <div className="font-semibold">{c.nameBn}</div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">জনপ্রিয় পণ্য</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSelling.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">সব পণ্য</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
