import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { getCategories } from "@/lib/db";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Image from "next/image";

const bengali = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: `${siteConfig.brandName} | ${siteConfig.brandNameBn} — ${siteConfig.tagline}`,
  description: "প্রিমিয়াম মানের চাল, ঘি, মধু, ডাল ও তেল — সরাসরি আপনার দরজায়।",
  metadataBase: new URL(`https://${siteConfig.domain}`),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <html lang="bn">
      <body className={`${bengali.className} bg-brand-cream text-brand-green antialiased`}>
        <CartProvider>
          <Header categories={categories} />
          <main className="max-w-6xl mx-auto px-4 py-8 min-h-[70vh]">{children}</main>
        </CartProvider>
        <footer className="border-t border-brand-gold/30 text-center text-sm py-8 text-brand-green/70 space-y-1">
          <Image src="/logo.png" alt={siteConfig.brandName} width={150} height={68} className="mx-auto mb-3 h-16 w-auto" />
          <p>© {new Date().getFullYear()} {siteConfig.brandName} · প্রস্তুতকারক: {siteConfig.producerName}</p>
          <p>FSSAI Lic. No: {siteConfig.fssaiLicense}</p>
          <p>যোগাযোগ: {siteConfig.supportPhone}</p>
        </footer>
      </body>
    </html>
  );
}
