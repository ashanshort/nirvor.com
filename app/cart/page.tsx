import { getProducts } from "@/lib/db";
import CartView from "@/components/CartView";

export default async function CartPage() {
  const products = await getProducts();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">আপনার কার্ট</h1>
      <CartView products={products} />
    </div>
  );
}
