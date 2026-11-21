export type Category = {
  slug: string;
  name: string;
  nameBn: string;
  icon: string;
};

export type Product = {
  id: string;
  name: string;
  nameBn: string;
  category: string; // Category.slug
  weight: string;
  price: number; // টাকায়
  oldPrice?: number;
  inStock: boolean;
  bestSelling?: boolean;
  image: string;
  description: string;
};

export type OrderLine = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";

export type Order = {
  id?: string;
  lines: OrderLine[];
  customerName: string;
  phone: string;
  address: string;
  total: number;
  status?: OrderStatus;
  createdAt?: string;
};
