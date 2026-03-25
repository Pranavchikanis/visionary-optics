import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="text-2xl font-bold text-white tracking-tight">Visionary Optics</span>
            <p className="text-gray-400 text-sm">
              Your modern destination for premium eyewear, frames, and unparalleled style.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><Link href="/shop" className="text-base text-gray-300 hover:text-white">All Products</Link></li>
                  <li><Link href="/shop?category=frames" className="text-base text-gray-300 hover:text-white">Frames</Link></li>
                  <li><Link href="/shop?category=sunglasses" className="text-base text-gray-300 hover:text-white">Sunglasses</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><Link href="/contact" className="text-base text-gray-300 hover:text-white">Contact Us</Link></li>
                  <li><Link href="/refund" className="text-base text-gray-300 hover:text-white">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><Link href="/privacy" className="text-base text-gray-300 hover:text-white">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-base text-gray-300 hover:text-white">Terms & Conditions</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">&copy; {new Date().getFullYear()} Visionary Optics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
