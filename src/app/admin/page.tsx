import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";

export default async function AdminDashboard() {
  await connectToDatabase();

  const productsCount = await Product.countDocuments();
  const ordersCount = await Order.countDocuments();
  const usersCount = await User.countDocuments();
  
  // Quick aggregation for revenue
  const orders = await Order.find({ paymentStatus: 'paid' }).lean();
  let totalRevenue = 0;
  if(orders.length > 0) {
    totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900">{ordersCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Products</p>
          <p className="text-3xl font-bold text-gray-900">{productsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
          <p className="text-3xl font-bold text-gray-900">{usersCount}</p>
        </div>
      </div>
    </div>
  );
}
