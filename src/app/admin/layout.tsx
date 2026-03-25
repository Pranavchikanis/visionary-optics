import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FiHome, FiBox, FiShoppingBag, FiUsers } from "react-icons/fi";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Admin Panel
          </h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:bg-gray-50 hover:text-indigo-600">
            <FiHome className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:bg-gray-50 hover:text-indigo-600">
            <FiBox className="h-5 w-5" />
            <span className="font-medium">Products</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:bg-gray-50 hover:text-indigo-600">
            <FiShoppingBag className="h-5 w-5" />
            <span className="font-medium">Orders</span>
          </Link>
          <Link href="/admin/users" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:bg-gray-50 hover:text-indigo-600">
            <FiUsers className="h-5 w-5" />
            <span className="font-medium">Users</span>
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}
