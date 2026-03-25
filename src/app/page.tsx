import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Glasses lifestyle"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
          <div className="text-center md:text-left md:w-2/3 lg:w-1/2">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              See the world <span className="text-indigo-400">differently</span>.
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Discover our new collection of premium eyewear. Hand-crafted frames, precision lenses, and unmatched style for every face.
            </p>
            <div className="mt-10 flex justify-center md:justify-start gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors shadow-lg"
              >
                Shop Collection
              </Link>
              <Link
                href="/shop?category=sunglasses"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-gray-900 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Explore Sunglasses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/shop?category=frames" className="group relative rounded-2xl overflow-hidden shadow-lg h-96 block">
            <img
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Frames"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Classic Frames</h3>
                <p className="mt-2 text-sm text-gray-300">Timeless style for everyday use.</p>
              </div>
            </div>
          </Link>

          <Link href="/shop?category=sunglasses" className="group relative rounded-2xl overflow-hidden shadow-lg h-96 block">
            <img
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Sunglasses"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Sunglasses</h3>
                <p className="mt-2 text-sm text-gray-300">Protect your eyes in style.</p>
              </div>
            </div>
          </Link>

          <Link href="/shop?category=premium" className="group relative rounded-2xl overflow-hidden shadow-lg h-96 block">
            <img
              src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Premium Collection"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Premium Collection</h3>
                <p className="mt-2 text-sm text-gray-300">Crafted with exotic materials.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
