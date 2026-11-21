import { notFound } from "next/navigation";
import Image from "next/image";
import { getCategoryBySlug, getProductById } from "@/lib/db";
import { siteConfig } from "@/lib/config";
import AddToCartButtons from "@/components/AddToCartButtons";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();
  const category = await getCategoryBySlug(product.category);

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="relative aspect-square bg-[#F3EFE3] rounded-2xl overflow-hidden">
        <Image src={product.image} alt={product.nameBn} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
      </div>
      <div>
        {category && (
          <p className="text-sm text-brand-green/60 mb-1">{category.nameBn}</p>
        )}
        <h1 className="text-3xl font-bold">{product.nameBn}</h1>
        <p className="mt-1 text-brand-green/60">ওজন: {product.weight}</p>
        <p className="mt-3 text-brand-green/80">{product.description}</p>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-orange-600">{siteConfig.currency}{product.price}</span>
          {product.oldPrice && (
            <span className="text-brand-green/40 line-through">{siteConfig.currency}{product.oldPrice}</span>
          )}
        </div>
        <div className="mt-6">
          <AddToCartButtons productId={product.id} />
        </div>
      </div>
    </div>
  );
}
