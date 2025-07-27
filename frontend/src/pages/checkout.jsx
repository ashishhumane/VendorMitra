import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
const baseURL = import.meta.env.VITE_API_baseURL;
export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await axios.get("http://localhost:3000/user/cart", {
                    withCredentials: true,
                });
                const data = res.data;
                setCartItems(Array.isArray(data) ? data : data.cart || []);
            } catch (err) {
                console.error("Failed to fetch cart", err);
                setError("Failed to load cart items. Please refresh the page.");
            } finally {
                setLoading(false);
            }
        }
        fetchCart();
    }, []);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.productId.price * item.quantity,
        0
    );

    const handlePlaceOrder = async () => {
        if (!name.trim() || !address.trim() || !phone.trim()) {
            setError("Please fill in all delivery details.");
            return;
        }

        if (!/^\+?[\d\s\-()]{10,}$/.test(phone.trim())) {
            setError("Please enter a valid phone number.");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
            const res = await axios.post(
                `${baseURL}/user/order/place`,
                {
                    name: name.trim(),
                    address: address.trim(),
                    phone: phone.trim(),
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            setSuccessMsg("Order placed successfully! 🎉");
            setCartItems([]);
            setName("");
            setAddress("");
            setPhone("");

            setTimeout(() => setSuccessMsg(""), 5000);
        } catch (err) {
            console.error(err);
            setError("Failed to place order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Now return the actual UI outside of the handler
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-orange-700 font-semibold">Loading your cart...</p>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center bg-white rounded-2xl shadow-xl p-8 border-4 border-orange-200">
                    <p className="text-xl text-orange-600 font-semibold mb-4">
                       Order Placed
                    </p>
                    <Link to='/products' className="bg-orange-500 text-white px-6 py-2 rounded-full">
                        Continue Shopping
                    </Link >
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-50 to-pink-100 p-6 w-full mx-auto">
            <h1 className="text-4xl font-extrabold text-orange-700 mb-10 text-center">
                🛍️ Checkout
            </h1>

            {/* Cart Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-orange-200 mb-10">
                <h2 className="text-2xl font-bold text-orange-700 mb-6 flex items-center">
                    📋 Order Summary
                </h2>
                <ul className="space-y-4">
                    {cartItems.map(({ productId, quantity, _id }) => (
                        <li key={_id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={productId.imageUrl}
                                    alt={productId.name}
                                    className="w-16 h-16 rounded-lg border border-orange-300 object-cover"
                                    // onError={(e) => {
                                    //     e.target.src = "https://via.placeholder.com/64?text=No+Image";
                                    // }}
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-orange-700">{productId.name}</h3>
                                    <p className="text-orange-600 text-sm">
                                        {productId.description} • {productId.category}
                                    </p>
                                    <p className="text-orange-600 font-medium">
                                        ₹{productId.price} × {quantity} {productId.unit}
                                    </p>
                                </div>
                            </div>
                            <div className="text-orange-800 font-bold text-lg">
                                ₹{productId.price * quantity}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-8 pt-4 border-t-2 border-orange-200 flex justify-between items-center text-2xl font-bold text-orange-800">
                    <span>Total:</span>
                    <span className="bg-orange-100 px-4 py-2 rounded-lg">₹{totalPrice}</span>
                </div>
            </div>

            {/* Delivery Details Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-4 border-orange-200">
                <h2 className="text-2xl font-bold text-orange-700 mb-6 flex items-center">
                    🚚 Delivery Details
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
                        <span className="mr-2">⚠️</span>
                        {error}
                    </div>
                )}

                {successMsg && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center">
                        <span className="mr-2">✅</span>
                        {successMsg}
                    </div>
                )}

                <div>
                    <div className="mb-4">
                        <label className="block font-semibold text-orange-700 mb-2" htmlFor="name">
                            👤 Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-2 border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                            placeholder="Enter your full name"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold text-orange-700 mb-2" htmlFor="address">
                            📍 Delivery Address
                        </label>
                        <textarea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border-2 border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition min-h-[100px]"
                            placeholder="Enter your complete delivery address"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block font-semibold text-orange-700 mb-2" htmlFor="phone">
                            📞 Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border-2 border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                            placeholder="e.g. +91 9876543210"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-4 rounded-full hover:from-pink-600 hover:to-orange-600 transition font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Placing Order...
                            </>
                        ) : (
                            <>
                                🎯 Place Order (₹{totalPrice})
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
