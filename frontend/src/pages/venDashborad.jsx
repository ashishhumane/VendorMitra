import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, ShoppingCart, CreditCard, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from '../components/popup'
import Sidebar from '../components/sidebar';
const baseURL = import.meta.env.VITE_API_baseURL;

const sampleStats = [
    { name: 'Week 1', savings: 250 },
    { name: 'Week 2', savings: 420 },
    { name: 'Week 3', savings: 380 },
    { name: 'Week 4', savings: 460 },
];

const VendorDashboard = () => {

    const navigate = useNavigate()
    const [groupBuys, setGroupBuys] = useState([]);
    const [grp, setGrp] = useState([]);
    const [user, setUser] = useState(null)

    const handleNavigate = () => {
        navigate('/groupbuy/create')
    }
    // gets all the created groups 
    useEffect(() => {
        const fetchAllGroupBuys = async () => {
            try {
                const res = await axios.get(`${baseURL}/user/groupsCreated/all`);
                setGroupBuys(res.data);
            } catch (error) {
                console.error('Failed to fetch all group buys:', error);
            }
        };

        fetchAllGroupBuys();
    }, [])

    // get the logged in user 
    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const res = await axios.get(`${baseURL}/user/me`, { withCredentials: true });
                setUser(res.data);
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };

        fetchLoggedInUser();
    }, []);

    // gets the joined group info 
    useEffect(() => {
        const fetchJoinedGroupBuys = async () => {
            try {
                const res = await axios.get(`${baseURL}/user/groupsCreated/joined`, { withCredentials: true });
                setGrp(res.data);
            } catch (error) {
                console.error('Failed to fetch all group buys:', error);
            }
        };

        fetchJoinedGroupBuys();
    }, [])

    const handleJoinGroup = async (groupId) => {
        const quantity = prompt("Enter quantity to join the group:");

        if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        try {
            const res = await axios.post(
                `${baseURL}/user/groupbuy/join/${groupId}`,
                { quantity: Number(quantity) },
                { withCredentials: true } // if using cookies for auth
            );
            alert(res.data.message);
            // Refresh the list after joining
            fetchAllGroupBuys(); // make sure this function is defined
        } catch (error) {
            console.error("Failed to join group:", error);
            alert(error.response?.data?.message || 'Failed to join group');
        }
    };

    return (
        <div className="flex ">
            <Sidebar />

            <main className="ml-64 p-8 w-320 bg-orange-50 min-h-screen w-full">
                <Popup />
                <h1 className="text-3xl font-bold text-orange-700 mb-6">👋 Welcome, {user && user.name}</h1>

                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-5 rounded-xl shadow border-l-4 border-orange-500">
                        <h3 className="text-lg font-bold text-orange-700">Total Orders</h3>
                        <p className="text-2xl font-semibold">{user?.orders?.length || 0}</p>
                    </div>
                    <div className="flex justify-center items-center p-5">
                        <button
                            className="w-full h-full text-lg font-medium text-orange-800 hover:text-white bg-white hover:bg-orange-600 border-l-4 border-r-4 border-orange-500 rounded-xl shadow-sm transition duration-200"
                            onClick={handleNavigate}>
                            ➕ Create Group Buy
                        </button>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow border-l-4  border-orange-500">
                        <h3 className="text-lg font-bold text-orange-700">Pending Payments</h3>
                        <p className="text-2xl font-semibold">₹1,280</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-bold text-orange-700 mb-4">📦 Group Order</h2>

                        {
                            grp && grp.length > 0 ? (
                                <div>
                                    {
                                        grp.map((g) => (
                                            <div key={g._id}>
                                                <p className="mb-2 text-orange-800">Joined Group: <strong>{g.productId?.name}</strong></p>
                                                <p className="text-orange-700 mb-4">Delivery: <strong>{new Date(g.createdAt).toLocaleString()}</strong></p>
                                                <Link to='/orders' className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-all">View Order</Link>
                                            </div>
                                        ))
                                    }

                                </div>
                            ) : (
                                <p className="text-orange-600">You haven't joined any group buys yet.</p>
                            )
                        }


                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        {groupBuys && groupBuys.length === 0 ? (
                            <p className="text-orange-600">No group buys available.</p>
                        ) : (
                            <ul className="space-y-4">
                                {groupBuys.map((grp) => (
                                    <li key={grp._id} className="border p-4 rounded-md bg-orange-100">
                                        <h3 className="text-lg font-semibold text-orange-800">
                                            🛒 {grp.productId?.name || 'Unnamed Product'}(Rs.{grp.productId?.price})
                                        </h3>
                                        <p>Created by: <strong>{grp.createdBy?.name || 'Unknown Vendor'}</strong></p>
                                        <p>Target Quantity: {grp.targetQuantity}</p>
                                        <p>Current Quantity: {grp.currentQuantity}</p>
                                        <p>Negotiated Price: ₹{grp.negotiatedPrice}</p>
                                        <p>Members: {grp.participants.length}</p>
                                        <p>Status: {grp && grp.status}</p>
                                        <p>Ends At: {new Date(grp.endsAt).toLocaleString()}</p>

                                        {grp.isActive && (
                                            <button
                                                className="mt-3 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-all"
                                                onClick={() => handleJoinGroup(grp._id)}
                                            >
                                                Join Group
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>

                        )}

                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold text-orange-700 mb-4">📊 Weekly Savings</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={sampleStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="savings" stroke="#fb923c" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </main>
        </div>
    );
};

export default VendorDashboard;