import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_baseURL;
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${baseURL}/user/cart`, {
          withCredentials: true,
        });
        setCartItems(res.data); // Assumes array of { productId: {}, quantity }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.productId?.price || 0) * item.quantity;
  }, 0);

  if (loading) {
    return <p className="text-center p-6 text-orange-700">Loading your cart...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-50 to-pink-100 p-6">
      <h1 className="text-4xl font-extrabold text-orange-700 mb-10 text-center">
        🛒 Your Cart
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 border-4 border-orange-200">
        {cartItems.length === 0 ? (
          <p className="text-center text-orange-800 font-semibold text-lg">
            Your cart is feeling a little lonely! Add some tasty treats 🍢
          </p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.productId._id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      className="w-16 h-16 rounded-lg border border-orange-300"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-orange-700">
                        {item.productId.name}
                      </h2>
                      <p className="text-orange-600">
                        ₹{item.productId.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-orange-800 font-semibold">
                    ₹{item.productId.price * item.quantity}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-between items-center text-lg font-bold text-orange-800">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="mt-6 text-right">
              <button
              onClick={() => navigate('/checkout')}
              className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
