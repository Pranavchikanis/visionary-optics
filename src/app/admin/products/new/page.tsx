"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    compareAtPrice: "",
    stock: "",
    images: "",
    category: "",
  });

  useEffect(() => {
    // We would ideally fetch categories from API, but for simplicity we'll hardcode or fetch if API exists
    // Since we don't have a categories GET API yet, let's hardcode the typical ones or rely on seeding later
    // Actually, I can fetch categories directly from an API if I make one, or just provide options.
    // For now, assume Admin will enter Category ID or we fetch it. We'll use text input for slug for simplicity 
    // in this prototype, or select from a hardcoded list of known ObjectIDs? 
    // It's better to fetch from /api/categories which we will create next.
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : null,
      stock: Number(formData.stock),
      images: formData.images.split(",").map(i => i.trim()),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create product");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input required type="text" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input required type="text" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea required rows={4} className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input required type="number" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Compare At (₹)</label>
            <input type="number" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.compareAtPrice} onChange={(e) => setFormData({...formData, compareAtPrice: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input required type="number" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select required className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option value="">Select a category</option>
            {categories.map((cat: any) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Images (Comma separated URLs)</label>
          <input required type="text" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="https://..." value={formData.images} onChange={(e) => setFormData({...formData, images: e.target.value})} />
        </div>

        <div className="flex justify-end pt-4">
          <button type="button" onClick={() => router.back()} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
