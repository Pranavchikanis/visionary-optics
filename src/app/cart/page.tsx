"use client";

import useCartStore from "@/store/cartStore";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = () => {
    if (!session) {
      router.push("/login?callbackUrl=/cart");
    } else {
      router.push("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
          <p className="mt-4 text-gray-500">Your cart is currently empty.</p>
          <div className="mt-6">
            <Link href="/shop" className="text-indigo-600 font-medium hover:text-indigo-500">
              Continue Shopping <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start" onSubmit={(e) => e.preventDefault()}>
          
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.product} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link href={`/shop/${item.product}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {item.title}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">₹{item.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${item.product}`} className="sr-only">Quantity, {item.title}</label>
                        <select
                          id={`quantity-${item.product}`}
                          name={`quantity-${item.product}`}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product, Number(e.target.value))}
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>

                        <div className="absolute top-0 right-0 text-red-500">
                          <button 
                            type="button" 
                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500"
                            onClick={() => removeItem(item.product)}
                          >
                            <span className="sr-only">Remove</span>
                            <FiTrash2 className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 border border-gray-200">
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Order summary</h2>

            <dl className="mt-6 space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900 font-medium">₹{getTotalPrice()}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm">
                  <span>Shipping estimate</span>
                </dt>
                <dd className="text-gray-900 font-medium">Free</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm">
                  <span>Tax estimate</span>
                </dt>
                <dd className="text-gray-900 font-medium">Included</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">₹{getTotalPrice()}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Checkout
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
