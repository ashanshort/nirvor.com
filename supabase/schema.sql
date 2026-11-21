-- Supabase SQL Editor-এ চালান

create table if not exists categories (
  slug text primary key,
  name text not null,
  name_bn text not null,
  icon text
);

create table if not exists products (
  id text primary key,
  name text not null,
  name_bn text not null,
  category text references categories(slug),
  weight text,
  price integer not null,
  old_price integer,
  in_stock boolean default true,
  best_selling boolean default false,
  image text,
  description text
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  lines jsonb not null,
  customer_name text not null,
  phone text not null,
  address text not null,
  total integer not null,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Row Level Security: পাবলিক শুধু পণ্য/ক্যাটাগরি পড়তে পারবে।
-- অর্ডার লেখা হয় server (service role) থেকে, তাই RLS বাইপাস হবে।
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;

create policy "public read categories" on categories for select using (true);
create policy "public read products" on products for select using (true);
