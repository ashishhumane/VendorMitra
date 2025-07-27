import { useState, useEffect } from "react"
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Bell,
  Settings,
  Eye,
  Edit,
  Plus,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  LogOut,
} from "lucide-react"
import axios from 'axios';
import  Group  from '../components/groupby'
const baseURL = import.meta.env.VITE_API_baseURL;

import { Link, useNavigate } from "react-router"

// Mock data for supplier dashboard
const supplierInfo = {
  name: "Rajesh Grain Suppliers",
  email: "rajesh@grains.com",
  phone: "+91 98765 43210",
  address: "Shop 15, Grain Market, Mumbai",
  joinedDate: "January 2024",
  rating: 4.8,
  totalCustomers: 156,
}

const dashboardStats = {
  totalProducts: 24,
  pendingOrders: 8,
  monthlyRevenue: 45000,
  totalCustomers: 156,
  lowStockItems: 3,
  completedOrders: 142,
}

const recentOrders = [
  {
    id: "ORD001",
    customerName: "Mumbai Street Food Co.",
    items: "Basmati Rice (50kg), Cooking Oil (25L)",
    amount: 8500,
    status: "pending",
    date: "2024-01-26",
    priority: "high",
  },
  {
    id: "ORD002",
    customerName: "Tasty Bites Restaurant",
    items: "Onions (30kg), Tomatoes (20kg)",
    amount: 2100,
    status: "processing",
    date: "2024-01-26",
    priority: "medium",
  },
  {
    id: "ORD003",
    customerName: "Spice Garden Cafe",
    items: "Garam Masala (5kg)",
    amount: 1000,
    status: "completed",
    date: "2024-01-25",
    priority: "low",
  },
  {
    id: "ORD004",
    customerName: "Fresh Food Corner",
    items: "Mixed Vegetables (40kg)",
    amount: 1800,
    status: "pending",
    date: "2024-01-25",
    priority: "medium",
  },
]

const topProducts = [
  { name: "Basmati Rice", sold: 450, revenue: 54000, stock: 200 },
  { name: "Cooking Oil", sold: 320, revenue: 48000, stock: 50 },
  { name: "Onions", sold: 280, revenue: 9800, stock: 150 },
  { name: "Tomatoes", sold: 250, revenue: 10000, stock: 80 },
]

const notifications = [
  { id: 1, message: "Low stock alert: Cooking Oil (25L remaining)", type: "warning", time: "2 hours ago" },
  { id: 2, message: "New order received from Mumbai Street Food Co.", type: "info", time: "4 hours ago" },
  { id: 3, message: "Payment received for Order #ORD001", type: "success", time: "1 day ago" },
]

export default function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [orderFilter, setOrderFilter] = useState("all")

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "processing":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const filteredOrders = recentOrders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = orderFilter === "all" || order.status === orderFilter
    return matchesSearch && matchesFilter
  })

  // ------------------------------------------------------------------------------------------
  const navigate = useNavigate()
  const [supplier, setSupplier] = useState('')
  const [myproducts, setMyproducts] = useState('')
  // fetch supplier details 

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const res = await axios.get(`${baseURL}/supplier/get`, { withCredentials: true });
        console.log(res.data);
        setSupplier(res.data); // set the actual supplier data
      } catch (error) {
        alert('Error fetching supplier');
        console.error(error);
      }
    };

    getSupplier(); // call once when component mounts
  }, []);

  useEffect(() => {
    const getproducts = async () => {
      try {
        const res = await axios.get(`${baseURL}/supplier/mysupplies`, { withCredentials: true });
        console.log(res.data);
        setMyproducts(res.data); // set the actual supplier data
      } catch (error) {
        alert('Error fetching products');
        console.error(error);
      }
    };

    getproducts(); // call once when component mounts
  }, []);

  const handleLogout = async () => {
        try {
            const res = await axios.get(`${baseURL}/user/logout`, {
                withCredentials: true,
            });

            if (res.status === 200) {
                console.log(res.data.message); // Optionally show it
              
                navigate('/'); // or '/login' depending on your flow
            } else {
                alert('Logout failed. Please try again.');
            }
        } catch (error) {
            console.error('Logout failed:', error);
            alert('An error occurred during logout.');
        }
    };

  const [orders, setOrders] = useState('')
  useEffect(() => {
    axios.get(`${baseURL}/supplier/orders/all`, { withCredentials: true })
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to fetch orders', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-orange-300">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-orange-700 drop-shadow">VendorMitra Supplier</h1>
              <p className="text-orange-600 mt-1">Welcome back, {supplier && supplier.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div onClick={handleLogout} className="relative group cursor-pointer">
                <LogOut className="w-6 h-6 text-gray-600" />
                <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-10">
                  Logout
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {supplier && supplier.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-orange-700">{supplier && supplier.name}</p>
                  <p className="text-sm text-orange-600">Supplier</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Total Products</p>
                    <p className="text-2xl font-bold text-orange-700">{myproducts && myproducts.length}</p>
                  </div>
                  <Package className="w-8 h-8 text-orange-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Pending Orders</p>
                    <p className="text-2xl font-bold text-orange-700">{dashboardStats.pendingOrders}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-orange-700">
                      ₹{dashboardStats.monthlyRevenue.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Total Customers</p>
                    <p className="text-2xl font-bold text-orange-700">{dashboardStats.totalCustomers}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Recent Orders & Top Products */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-orange-200">
                <div className="p-6 border-b border-orange-200">
                  <h3 className="text-xl font-bold text-orange-700">Recent Orders</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentOrders.slice(0, 4).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-orange-700">{order.id}</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}
                            >
                              {order.priority}
                            </span>
                          </div>
                          <p className="text-sm text-orange-600">{order.customerName}</p>
                          <p className="text-xs text-orange-500 mt-1">{order.items}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-700">₹{order.amount.toLocaleString()}</p>
                          <span
                            className={`inline-block w-3 h-3 rounded-full ${getStatusColor(order.status)} mt-1`}
                          ></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-orange-200">
                <div className="p-6 border-b border-orange-200">
                  <h3 className="text-xl font-bold text-orange-700">Top Products</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {myproducts && myproducts.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200"
                      >
                        <div>
                          <p className="font-semibold text-orange-700">{product.name}</p>
                          <p className="text-sm text-orange-600">{product.quantity} {product.unit} in stock</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-700">{new Date(product.createdAt).toLocaleString()}</p>
                          <p className="text-sm text-orange-600">{product.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <Group />

          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-orange-700 font-semibold py-6">
        &copy; {new Date().getFullYear()} VendorMitra Supplier Dashboard. Khushiyon ki Guarantee!
      </footer>
    </div>
  )
}
