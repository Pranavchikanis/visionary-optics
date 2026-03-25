"use client";

import { useState } from "react";
import useCartStore from "@/store/cartStore";

export default function AddToCartButton({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      product: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0] || "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
      quantity: quantity,
    });
    alert("Added to cart!");
  };

  return (
    <div>
       <div className="flex items-center gap-4 mb-4">
          <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</label>
          <select 
            id="quantity" 
            value={quantity} 
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="rounded-md border border-gray-300 py-1.5 pl-3 pr-8 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
       </div>
       <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full disabled:bg-gray-400"
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}
