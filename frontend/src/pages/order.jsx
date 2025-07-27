import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar'

const baseURL = import.meta.env.VITE_API_baseURL;

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async () => {
    try {
      const res = await axios.get(`${baseURL}/user/myorders`, {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch user orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  if (loading) return <p className="text-center p-4">Loading your orders...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-black p-4 rounded-md shadow">
              <p className="font-semibold">Order ID: {order._id}</p>
              <p className="text-sm text-gray-600">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm">
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.productId?.name} × {item.quantity} — ₹
                    {item.productId?.price * item.quantity}
                  </li>
                ))}
              </ul>

              <p className="mt-2 font-semibold">
                Total: ₹
                {order.items.reduce(
                  (acc, item) => acc + item.productId?.price * item.quantity,
                  0
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
