import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || "rzp_test_mock_secret";

    // Create signature to verify
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      // In development, if mock keys are missing, we can bypass or throw.
      // We will assume failure if signature doesn't match and we are in production.
      if (process.env.NODE_ENV === "production" || process.env.RAZORPAY_KEY_SECRET) {
         return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
      }
    }

    await connectToDatabase();

    // Update order status
    await Order.findByIdAndUpdate(order_id, {
      paymentStatus: "paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    return NextResponse.json({ success: true, message: "Payment verified successfully" });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
