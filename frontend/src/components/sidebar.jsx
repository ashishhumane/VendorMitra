import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, ShoppingCart, CreditCard, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from '../components/popup'
const baseURL = import.meta.env.VITE_API_baseURL;

const sidebar = () => {
    const navigate = useNavigate()
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

    return (
        <div>
            <aside className="w-64 bg-orange-100 min-h-screen p-6 shadow-md fixed">
                <h2 className="text-2xl font-bold text-orange-700 mb-8">VendorMitra</h2>
                <nav className="space-y-6">
                    <Link to='/vdashboard' className="flex items-center text-orange-800 hover:text-orange-600">
                        <Home className="mr-3" /> Dashboard
                    </Link>
                    <Link to='/orders' className="flex items-center text-orange-800 hover:text-orange-600">
                        <ShoppingCart className="mr-3" /> Orders
                    </Link>
                    <Link to='/products' className="flex items-center text-orange-800 hover:text-orange-600">
                        <CreditCard className="mr-3" /> Products
                    </Link>
                    {/* <Link to='/' className="flex items-center text-orange-800 hover:text-orange-600">
                <User className="mr-3" /> Profile
            </Link> */}
                    <Link onClick={handleLogout} to='/' className="flex items-center text-orange-800 hover:text-orange-600">
                        <LogOut className="mr-3" /> Logout
                    </Link>
                </nav>
            </aside>
        </div>
    )
}

export default sidebar
