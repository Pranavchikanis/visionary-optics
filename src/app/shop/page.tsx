import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import ProductCard from "@/components/ProductCard";

export const revalidate = 0; // Disable cache for now to always fetch fresh products

export default async function ShopPage(props: { searchParams: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams;
  await connectToDatabase();
  
  let products = [];
  let categoryFilter = {};

  if (searchParams.category) {
    const categoryDoc = await Category.findOne({ slug: searchParams.category });
    if (categoryDoc) {
      categoryFilter = { category: categoryDoc._id };
    }
  }

  // Populate category to safely access category.name in ProductCard
  products = await Product.find(categoryFilter).populate("category").lean();

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {searchParams.category ? `${searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1)}` : "All Products"}
          </h1>
          <div className="flex items-center">
            {/* Filter Dropdown placeholder */}
            <span className="text-sm text-gray-500">{products.length} Products</span>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Filters sidebar (Desktop) */}
            <div className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                <li><a href="/shop" className={!searchParams.category ? "text-indigo-600" : ""}>All Products</a></li>
                <li><a href="/shop?category=frames" className={searchParams.category === "frames" ? "text-indigo-600" : ""}>Frames</a></li>
                <li><a href="/shop?category=sunglasses" className={searchParams.category === "sunglasses" ? "text-indigo-600" : ""}>Sunglasses</a></li>
                <li><a href="/shop?category=lenses" className={searchParams.category === "lenses" ? "text-indigo-600" : ""}>Lenses</a></li>
              </ul>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {products.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={(product as any)._id.toString()} product={JSON.parse(JSON.stringify(product))} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
