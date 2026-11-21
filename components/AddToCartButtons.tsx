"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

export default function AddToCartButtons({ productId, compact = false }: { productId: string; compact?: boolean }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(productId, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  if (compact) {
    return (
      <button
        onClick={() => add(productId, 1)}
        className="w-full border border-brand-green text-brand-green rounded-lg font-semibold text-sm py-2 hover:bg-brand-green hover:text-brand-gold transition"
      >
        🛒 কার্টে যোগ করুন
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm">পরিমাণ:</span>
        <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 border rounded">−</button>
        <span className="w-8 text-center">{qty}</span>
        <button onClick={() => setQty((q) => Math.min(20, q + 1))} className="w-8 h-8 border rounded">+</button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          className="flex-1 border border-brand-green text-brand-green rounded-lg font-semibold py-3"
        >
          {added ? "✅ যোগ হয়েছে" : "🛒 কার্টে যোগ করুন"}
        </button>
        <button
          onClick={() => {
            add(productId, qty);
            router.push("/checkout");
          }}
          className="flex-1 bg-orange-500 text-white rounded-lg font-semibold py-3"
        >
          এখনই কিনুন
        </button>
      </div>
    </div>
  );
}
