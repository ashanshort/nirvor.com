"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { siteConfig } from "@/lib/config";
import { useCart } from "./CartProvider";

export default function CheckoutForm({ products }: { products: Product[] }) {
  const { items, ready, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!ready) return <p className="text-brand-green/60">লোড হচ্ছে...</p>;

  const rows = items
    .map((i) => {
      const product = products.find((p) => p.id === i.productId);
      return product ? { product, quantity: i.quantity } : null;
    })
    .filter((r): r is { product: Product; quantity: number } => r !== null);

  const total = rows.reduce((s, r) => s + r.product.price * r.quantity, 0);

  if (orderId) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl font-bold mb-2">✅ অর্ডার সফল হয়েছে!</p>
        <p className="mb-6">অর্ডার নম্বর: <span className="font-mono">{orderId.slice(0, 8)}</span></p>
        <Link href="/" className="bg-brand-green text-brand-gold px-6 py-3 rounded-lg font-semibold">
          আরও কেনাকাটা করুন
        </Link>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="mb-4">চেকআউট করার জন্য কার্ট খালি।</p>
        <Link href="/" className="underline">কেনাকাটা শুরু করুন</Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customerName: String(form.get("customerName") ?? ""),
          phone: String(form.get("phone") ?? ""),
          address: String(form.get("address") ?? ""),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrderId(data.id);
        clear();
      } else {
        setError(data.error ?? "কিছু একটা সমস্যা হয়েছে।");
      }
    } catch {
      setError("নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <form onSubmit={onSubmit} className="space-y-3">
        <h2 className="font-bold text-lg">ডেলিভারি তথ্য</h2>
        <input name="customerName" placeholder="আপনার নাম" required className="w-full border rounded-lg p-3 bg-white" />
        <input name="phone" placeholder="মোবাইল নম্বর (01XXXXXXXXX)" inputMode="numeric" required className="w-full border rounded-lg p-3 bg-white" />
        <textarea name="address" placeholder="সম্পূর্ণ ঠিকানা" required rows={3} className="w-full border rounded-lg p-3 bg-white" />
        <p className="text-sm text-brand-green/70">পেমেন্ট: ক্যাশ অন ডেলিভারি</p>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-green text-brand-gold font-semibold py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "পাঠানো হচ্ছে..." : `অর্ডার নিশ্চিত করুন (${siteConfig.currency}${total})`}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>

      <div className="bg-white rounded-xl border border-brand-gold/30 p-6 h-fit">
        <h2 className="font-bold text-lg mb-4">অর্ডার সারাংশ</h2>
        {rows.map(({ product, quantity }) => (
          <div key={product.id} className="flex justify-between py-2 border-b last:border-0 text-sm">
            <span>{product.nameBn} × {quantity}</span>
            <span>{siteConfig.currency}{product.price * quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4">
          <span>মোট</span>
          <span>{siteConfig.currency}{total}</span>
        </div>
      </div>
    </div>
  );
}
