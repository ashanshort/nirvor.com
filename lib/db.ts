import type { Category, Order, OrderLine, Product } from "./types";

// ডেটা লেয়ার। এখন mock data (মেমোরিতে)।
// Supabase যুক্ত করলে শুধু এই ফাইলের ফাংশনগুলো বদলাবেন; API route ও page অপরিবর্তিত থাকবে।
// সতর্কতা: mock অবস্থায় অর্ডার সার্ভার restart হলে হারিয়ে যায়।

// ⚠️ সব দাম placeholder। আসল দাম lib/db.ts-এ বা Supabase-এ বসাবেন।
export const categories: Category[] = [
  { slug: "rice", name: "Rice", nameBn: "চাল", icon: "🍚" },
  { slug: "oil-ghee", name: "Oil & Ghee", nameBn: "তেল ও ঘি", icon: "🫙" },
  { slug: "honey", name: "Honey", nameBn: "মধু", icon: "🍯" },
  { slug: "dates", name: "Dates", nameBn: "খেজুর", icon: "🌴" },
  { slug: "flours-lentils", name: "Flours & Lentils", nameBn: "ডাল ও আটা", icon: "🥣" },
];

const products: Product[] = [
  {
    id: "miniket-5kg",
    name: "Premium Miniket Rice 5kg",
    nameBn: "প্রিমিয়াম মিনিকেট চাল",
    category: "rice",
    weight: "5 KG",
    price: 650,
    inStock: true,
    bestSelling: true,
    image: "/products/miniket-5kg.jpg",
    description: "উন্নতমানের প্রিমিয়াম মিনিকেট চাল, সুগন্ধি ও ঝরঝরে।",
  },
  {
    id: "miniket-10kg",
    name: "Premium Miniket Rice 10kg",
    nameBn: "প্রিমিয়াম মিনিকেট চাল",
    category: "rice",
    weight: "10 KG",
    price: 1250,
    oldPrice: 1300,
    inStock: true,
    image: "/products/miniket-5kg.jpg",
    description: "১০ কেজি প্যাকে প্রিমিয়াম মিনিকেট চাল। বড় পরিবারের জন্য সাশ্রয়ী।",
  },
  {
    id: "gawa-ghee-1kg",
    name: "Gawa Ghee 1kg",
    nameBn: "গাওয়া ঘি",
    category: "oil-ghee",
    weight: "1 KG",
    price: 1800,
    oldPrice: 1900,
    inStock: true,
    bestSelling: true,
    image: "/products/cat-oil-ghee.svg",
    description: "খাঁটি গাওয়া ঘি, ঘরে তৈরির স্বাদ ও সুগন্ধ।",
  },
  {
    id: "mustard-oil-5l",
    name: "Deshi Mustard Oil 5 liter",
    nameBn: "দেশি সরিষার তেল",
    category: "oil-ghee",
    weight: "5 L",
    price: 1700,
    oldPrice: 1800,
    inStock: true,
    bestSelling: true,
    image: "/products/cat-oil-ghee.svg",
    description: "ঘানিতে ভাঙা খাঁটি দেশি সরিষার তেল।",
  },
  {
    id: "sundarban-honey-1kg",
    name: "Sundarban Honey 1kg",
    nameBn: "সুন্দরবন মধু",
    category: "honey",
    weight: "1 KG",
    price: 2300,
    oldPrice: 2500,
    inStock: true,
    bestSelling: true,
    image: "/products/cat-honey.svg",
    description: "সুন্দরবনের খাঁটি মধু, প্রাকৃতিক ও বিশুদ্ধ।",
  },
  {
    id: "black-seed-honey-1kg",
    name: "Black Seed Honey 1kg",
    nameBn: "কালোজিরা মধু",
    category: "honey",
    weight: "1 KG",
    price: 1600,
    inStock: true,
    image: "/products/cat-honey.svg",
    description: "কালোজিরা মেশানো খাঁটি মধু।",
  },
  {
    id: "ajwa-dates-500g",
    name: "Ajwa Dates 500g",
    nameBn: "আজওয়া খেজুর",
    category: "dates",
    weight: "500 G",
    price: 950,
    inStock: true,
    image: "/products/cat-dates.svg",
    description: "নরম ও মিষ্টি আজওয়া খেজুর।",
  },
  {
    id: "masoor-dal-1kg",
    name: "Masoor Dal 1kg",
    nameBn: "মসুর ডাল",
    category: "flours-lentils",
    weight: "1 KG",
    price: 160,
    inStock: true,
    bestSelling: true,
    image: "/products/cat-flours-lentils.svg",
    description: "পরিষ্কার ও বাছাই করা মসুর ডাল।",
  },
  {
    id: "moong-dal-1kg",
    name: "Moong Dal 1kg",
    nameBn: "মুগ ডাল",
    category: "flours-lentils",
    weight: "1 KG",
    price: 175,
    inStock: true,
    image: "/products/cat-flours-lentils.svg",
    description: "পরিষ্কার ও বাছাই করা মুগ ডাল।",
  },
];

const orders: Order[] = [];

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  return products.find((p) => p.id === id) ?? null;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  return products.filter((p) => p.category === slug);
}

export async function getBestSelling(): Promise<Product[]> {
  return products.filter((p) => p.bestSelling);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.nameBn.includes(query.trim()) ||
      p.description.includes(query.trim())
  );
}

export async function createOrder(input: {
  lines: OrderLine[];
  customerName: string;
  phone: string;
  address: string;
  total: number;
}): Promise<Order> {
  const saved: Order = {
    ...input,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  orders.push(saved);
  return saved;
}
