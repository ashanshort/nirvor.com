import { NextResponse } from "next/server";
import { createOrder, getProductById } from "@/lib/db";
import type { OrderLine } from "@/lib/types";

type IncomingItem = { productId: unknown; quantity: unknown };

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "অবৈধ অনুরোধ" }, { status: 400 });
  }

  const customerName = String(body.customerName ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const address = String(body.address ?? "").trim();
  const items = Array.isArray(body.items) ? (body.items as IncomingItem[]) : [];

  if (!customerName || !phone || !address) {
    return NextResponse.json({ error: "নাম, মোবাইল ও ঠিকানা দিন" }, { status: 400 });
  }
  if (!/^01[3-9]\d{8}$/.test(phone)) {
    return NextResponse.json({ error: "সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)" }, { status: 400 });
  }
  if (items.length === 0) {
    return NextResponse.json({ error: "কার্ট খালি" }, { status: 400 });
  }

  // দাম ও স্টক সবসময় সার্ভার থেকে যাচাই হবে; client-এর দাম বিশ্বাস করা হবে না
  const lines: OrderLine[] = [];
  for (const item of items) {
    const productId = String(item.productId ?? "");
    const quantity = Math.max(1, Math.min(Number(item.quantity) || 1, 20));
    const product = await getProductById(productId);
    if (!product || !product.inStock) {
      return NextResponse.json(
        { error: `"${productId}" এখন পাওয়া যাচ্ছে না` },
        { status: 404 }
      );
    }
    lines.push({
      productId,
      name: product.nameBn,
      quantity,
      unitPrice: product.price,
      lineTotal: product.price * quantity,
    });
  }

  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const order = await createOrder({ lines, customerName, phone, address, total });

  return NextResponse.json(order, { status: 201 });
}
