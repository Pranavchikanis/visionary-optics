import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export const revalidate = 0;

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  await connectToDatabase();
  
  const product = await Product.findOne({ slug: params.slug }).lean();

  if (!product) {
    notFound();
  }

  // Convert MongoDB doc to a serializable object
  const serializedProduct = JSON.parse(JSON.stringify(product));

  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          
          {/* Image gallery */}
          <div className="rounded-lg overflow-hidden lg:block h-[500px] w-full relative shadow-lg border border-gray-100">
            <img
              src={serializedProduct.images[0] || "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800"}
              alt={serializedProduct.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{serializedProduct.title}</h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-end gap-4">
                <p className="text-3xl font-bold text-gray-900">₹{serializedProduct.price}</p>
                {serializedProduct.compareAtPrice > serializedProduct.price && (
                  <p className="text-xl text-gray-400 line-through">₹{serializedProduct.compareAtPrice}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                <p>{serializedProduct.description}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <AddToCartButton product={serializedProduct} />
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="mt-4">
                <ul role="list" className="pl-4 list-disc text-sm space-y-2 text-gray-500">
                  <li>Premium materials for durability</li>
                  <li>In-stock and ready to ship</li>
                  <li>100% authenticity guaranteed</li>
                  <li>14-day return policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
