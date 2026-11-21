import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold mb-4">পেজটি পাওয়া যায়নি</h1>
      <Link href="/" className="underline">হোমপেজে ফিরুন</Link>
    </div>
  );
}
