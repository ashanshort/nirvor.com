"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Category } from "@/lib/types";
import { siteConfig } from "@/lib/config";
import { useCart } from "./CartProvider";

export default function Header({ categories }: { categories: Category[] }) {
  const { count } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="sticky top-0 z-30 shadow-sm">
      <div className="bg-brand-green text-brand-gold">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="shrink-0 bg-brand-cream rounded-lg px-2 py-1 flex items-center">
            <Image
              src="/logo.png"
              alt={`${siteConfig.brandName} ${siteConfig.brandNameBn}`}
              width={299}
              height={135}
              priority
              className="h-12 w-auto"
            />
          </Link>

          <form onSubmit={onSearch} className="flex-1 hidden sm:flex">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="পণ্য খুঁজুন (যেমন: মধু, ঘি, চাল)"
              className="w-full rounded-l-lg px-4 py-2 text-brand-green bg-white outline-none"
            />
            <button className="rounded-r-lg bg-brand-gold text-brand-green px-4 font-semibold">
              খুঁজুন
            </button>
          </form>

          <Link href="/cart" className="ml-auto flex items-center gap-2 whitespace-nowrap">
            <span className="text-xl">🛒</span>
            <span>কার্ট</span>
            <span className="bg-brand-gold text-brand-green text-xs font-bold rounded-full px-2 py-0.5 min-w-[1.5rem] text-center">
              {count}
            </span>
          </Link>
        </div>

        <form onSubmit={onSearch} className="sm:hidden px-4 pb-3 flex">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="পণ্য খুঁজুন"
            className="w-full rounded-l-lg px-3 py-2 text-brand-green bg-white outline-none"
          />
          <button className="rounded-r-lg bg-brand-gold text-brand-green px-4 font-semibold">খুঁজুন</button>
        </form>
      </div>

      <nav className="bg-[#142a1d] text-white/90 text-sm">
        <div className="max-w-6xl mx-auto px-4 flex gap-6 overflow-x-auto py-2.5 whitespace-nowrap">
          <Link href="/" className="hover:text-brand-gold">হোম</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="hover:text-brand-gold">
              {c.nameBn}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
