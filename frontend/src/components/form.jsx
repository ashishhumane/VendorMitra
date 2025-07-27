import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';
const baseURL = import.meta.env.VITE_API_baseURL;

const CreateGroupBuyPage = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        productId: '',
        targetQuantity: '',
        endsAt: '',
        negotiatedPrice: '', // 💰 Add this
        maxParticipants: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch products to populate dropdown
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${baseURL}/product/all`); // adjust as needed
                setProducts(res.data.products);
                console.log(res.data.products);

            } catch (err) {
                console.error(err);
                setError('Failed to load products.');
            }
        };
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const { productId, targetQuantity, endsAt,negotiatedPrice,maxParticipants } = formData;
        if (!productId || !targetQuantity || !endsAt) {
            setError('All fields are required.');
            return;
        }

        try {
            await axios.post(`${baseURL}/user/groupbuy/create`, formData, { withCredentials: true });
            setMessage('✅ Group Buy created successfully!');
            setTimeout(() => navigate('/vdashboard'), 1000);
        } catch (err) {
            console.error(err);
            setError('❌ Failed to create group buy. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 p-8">
            <h1 className="text-3xl font-bold text-orange-700 mb-6">➕ Create Group Buy</h1>

            {message && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded shadow">{message}</div>}
            {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded shadow">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md max-w-xl">
                {/* Product Select */}
                <div className="mb-4">
                    <label className="block text-orange-800 font-semibold mb-1">Product</label>
                    <select
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                        <option value="">-- Select Product --</option>
                        {products && products.map((p) => (
                            <option key={p._id} value={p._id}>{p.name}   (Rs.{p.price})</option>
                        ))}
                    </select>
                </div>

                {/*  negotiatedPrice */}
                <div className="mb-4">
                    <label className="block text-orange-800 font-semibold mb-1">Negotiation Price</label>
                    <input
                        type="number"
                        name="negotiatedPrice"
                        value={formData.negotiatedPrice}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    />
                </div>
                {/* Max Participants */}
                <div className="mb-4">
                    <label className="block text-orange-800 font-semibold mb-1">Max Participants</label>
                    <input
                        type="number"
                        name="maxParticipants"
                        placeholder="Max Participants (optional)"
                        value={formData.maxParticipants}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-3 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-orange-800 font-semibold mb-1">Target Quantity</label>
                    <input
                        type="number"
                        name="targetQuantity"
                        value={formData.targetQuantity}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-3 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                {/* End Date & Time */}
                <div className="mb-6">
                    <label className="block text-orange-800 font-semibold mb-1">End Date & Time</label>
                    <input
                        type="datetime-local"
                        name="endsAt"
                        value={formData.endsAt}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-600 text-white font-semibold py-2 px-4 rounded hover:bg-orange-700 transition"
                >
                    🚀 Create Group Buy
                </button>
            </form>
        </div>
    );
};

export default CreateGroupBuyPage;
