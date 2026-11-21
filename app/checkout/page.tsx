import { getProducts } from "@/lib/db";
import CheckoutForm from "@/components/CheckoutForm";

export default async function CheckoutPage() {
  const products = await getProducts();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">চেকআউট</h1>
      <CheckoutForm products={products} />
    </div>
  );
}
