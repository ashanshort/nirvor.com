# NIRVOR | নির্ভর — Online Store

Next.js (App Router) + Tailwind + Vercel. Frontend ও backend (API Routes) একই প্রজেক্টে।

## ১. লোকালি চালানো

```bash
npm install
cp .env.example .env.local   # এখন খালি রাখলেও চলবে (mock data)
npm run dev
```

http://localhost:3000 খুলুন।

## ২. যা বদলাতে হবে

- **ব্র্যান্ডের তথ্য:** `lib/config.ts` — FSSAI নম্বর, প্রস্তুতকারক, ফোন নম্বর।
- **প্রোডাক্ট ও দাম:** `lib/db.ts` (Supabase যুক্ত হলে `supabase/schema.sql`-এর insert)।
- **প্রোডাক্ট ছবি:** `public/products/`।

## ৩. Supabase যুক্ত করা

1. Supabase-এ নতুন প্রজেক্ট বানান।
2. SQL Editor-এ `supabase/schema.sql` চালান।
3. `npm install @supabase/supabase-js`
4. `.env.local`-এ Supabase URL, anon key ও service role key বসান (`.env.example` দেখুন)।
5. `lib/db.ts`-এর ফাংশনগুলো Supabase query দিয়ে বদলান।
   - `getProducts` / `getProductById`: `products` টেবিল থেকে পড়া।
   - `createOrder`: `orders` টেবিলে insert। এটি server-side, তাই service role key ব্যবহার করবেন।
6. `SUPABASE_SERVICE_ROLE_KEY` কখনো `NEXT_PUBLIC_` দিয়ে শুরু করবেন না।

## ৪. Vercel-এ deploy

1. কোড GitHub-এ push করুন।
2. Vercel → Add New Project → repo import।
3. Environment Variables যোগ করুন (`.env.example`-এর মতো)।
4. Project Settings → Domains-এ `nirvoor.com.bd` ও `www.nirvoor.com.bd` যোগ করুন, DNS record Vercel-এর নির্দেশমতো বসান।

## ৫. পরের ধাপ

- Admin panel (`/admin`) দিয়ে অর্ডার দেখা ও status বদলানো।
- ডেলিভারি চার্জ ও এলাকা, bKash/Nagad পেমেন্ট।
- অর্ডার কনফার্মেশন SMS/WhatsApp।
