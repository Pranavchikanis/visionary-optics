import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    // Ensure Product model is registered for populate
    await Product.find().limit(1);

    let orders;
    if ((session.user as any).role === "admin") {
      orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ user: (session.user as any).id }).sort({ createdAt: -1 });
    }

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { items, totalAmount, shippingAddress } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    const order = await Order.create({
      user: (session.user as any).id,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus: "pending",
      fulfillmentStatus: "pending"
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
