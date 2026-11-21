import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { siteConfig } from "@/lib/config";
import AddToCartButtons from "./AddToCartButtons";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-brand-gold/30 overflow-hidden flex flex-col">
      {product.bestSelling && (
        <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
          Best Selling
        </span>
      )}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-[#F3EFE3]">
          <Image
            src={product.image}
            alt={product.nameBn}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold leading-snug">{product.nameBn}</h3>
        </Link>
        <p className="text-sm text-brand-green/60">{product.weight}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-orange-600">
            {siteConfig.currency}
            {product.price}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-brand-green/40 line-through">
              {siteConfig.currency}
              {product.oldPrice}
            </span>
          )}
        </div>
        <div className="mt-auto pt-3">
          <AddToCartButtons productId={product.id} compact />
        </div>
      </div>
    </div>
  );
}
