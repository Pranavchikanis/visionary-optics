"use client";

import { useState } from "react";
import useCartStore from "@/store/cartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    if (typeof window !== "undefined") {
      router.push("/login?callbackUrl=/checkout");
    }
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center pt-24">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => router.push("/shop")} className="text-indigo-600 underline">Go shopping</button>
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order in our database
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item: any) => ({
            product: item.product,
            quantity: item.quantity,
            price: item.price
          })),
          totalAmount: getTotalPrice(),
          shippingAddress: address,
        })
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error);

      // 2. Create Razorpay order
      const rzpRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: getTotalPrice() })
      });

      const rzpData = await rzpRes.json();
      if (!rzpRes.ok) throw new Error(rzpData.error);

      // 3. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mock_key_id",
        amount: rzpData.amount,
        currency: rzpData.currency,
        name: "Visionary Optics",
        description: `Order #${orderData._id}`,
        order_id: rzpData.id,
        handler: async function (response: any) {
          // 4. Verify payment
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              order_id: orderData._id
            })
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            clearCart();
            router.push(`/orders?success=true`);
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: session.user?.name || "",
          email: session.user?.email || "",
          contact: "9999999999",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        alert("Payment failed: " + response.error.description);
      });
      razorpay.open();
    } catch (err: any) {
      console.error(err);
      alert("Checkout failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="bg-gray-50 min-h-screen pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              <form className="bg-white px-4 py-6 sm:p-6 lg:p-8 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Street address</label>
                    <input type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State / Province</label>
                    <input type="text" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postal code</label>
                    <input type="text" value={address.zipCode} onChange={e => setAddress({...address, zipCode: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input type="text" value={address.country} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 sm:text-sm" />
                  </div>
                </div>
              </form>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0 lg:col-span-5 bg-white px-4 py-6 sm:p-6 lg:p-8 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">₹{getTotalPrice()}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base flex-shrink-0 font-bold text-gray-900">₹{getTotalPrice()}</dd>
                </div>
              </dl>
              <div className="mt-8 border-t border-gray-200 pt-6">
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Pay now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
