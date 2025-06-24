// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
interface CheckoutItem {
  productName: string;
  imageUrl?: string;
  price: number;
  quantity: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(request: Request) {
  const { items } = await request.json();
  const origin = process.env.NEXT_PUBLIC_API_URL!;
  const frontendUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const line_items = (items as CheckoutItem[]).map((item) => {
    const fullImageUrl = item.imageUrl
      ? `${origin}${item.imageUrl}`
      : undefined;

    console.log("fullImageUrl", fullImageUrl);

    console.log("itemmmmm", item);
    console.log("fullImageUrl", fullImageUrl);

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productName,
          ...(fullImageUrl ? { images: [fullImageUrl] } : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${frontendUrl}/success`,
    cancel_url: `${frontendUrl}/cart`,
  });

  return NextResponse.json({ sessionId: session.id });
}
