"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { siteConfig } from "@/lib/config";
import { useCart } from "./CartProvider";

export default function CartView({ products }: { products: Product[] }) {
  const { items, ready, setQty, remove } = useCart();

  if (!ready) return <p className="text-brand-green/60">লোড হচ্ছে...</p>;

  const rows = items
    .map((i) => {
      const product = products.find((p) => p.id === i.productId);
      return product ? { product, quantity: i.quantity } : null;
    })
    .filter((r): r is { product: Product; quantity: number } => r !== null);

  if (rows.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg mb-4">আপনার কার্ট খালি।</p>
        <Link href="/" className="bg-brand-green text-brand-gold px-6 py-3 rounded-lg font-semibold">
          কেনাকাটা শুরু করুন
        </Link>
      </div>
    );
  }

  const total = rows.reduce((s, r) => s + r.product.price * r.quantity, 0);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        {rows.map(({ product, quantity }) => (
          <div key={product.id} className="bg-white rounded-xl border border-brand-gold/30 p-4 flex gap-4 items-center">
            <div>
              <p className="font-semibold">{product.nameBn}</p>
              <p className="text-sm text-brand-green/60">{product.weight}</p>
              <p className="text-sm">
                {siteConfig.currency}
                {product.price}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => setQty(product.id, quantity - 1)} className="w-8 h-8 border rounded">−</button>
              <span className="w-8 text-center">{quantity}</span>
              <button onClick={() => setQty(product.id, quantity + 1)} className="w-8 h-8 border rounded">+</button>
            </div>
            <p className="w-20 text-right font-bold">
              {siteConfig.currency}
              {product.price * quantity}
            </p>
            <button onClick={() => remove(product.id)} className="text-red-600 text-sm">মুছুন</button>
          </div>
        ))}
      </div>

      <aside className="bg-white rounded-xl border border-brand-gold/30 p-6 h-fit">
        <h2 className="font-bold text-lg mb-4">সারাংশ</h2>
        <div className="flex justify-between mb-2">
          <span>মোট</span>
          <span className="font-bold">
            {siteConfig.currency}
            {total}
          </span>
        </div>
        <p className="text-xs text-brand-green/60 mb-4">ডেলিভারি চার্জ যোগ হতে পারে (অর্ডার কনফার্মেশনে জানানো হবে)।</p>
        <Link href="/checkout" className="block text-center bg-orange-500 text-white py-3 rounded-lg font-semibold">
          চেকআউট করুন
        </Link>
      </aside>
    </div>
  );
}
