import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="group relative border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-w-1 aspect-h-1 bg-gray-100 group-hover:opacity-75 h-64 overflow-hidden">
        <img
          src={product.images[0] || "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"}
          alt={product.title}
          className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        {product.compareAtPrice > product.price && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            Sale
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
            <Link href={`/shop/${product.slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
            {product.compareAtPrice > product.price && (
              <p className="text-sm text-gray-400 line-through">₹{product.compareAtPrice}</p>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <button className="w-full bg-indigo-50 text-indigo-700 py-2 rounded-md text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-colors relative z-10">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
