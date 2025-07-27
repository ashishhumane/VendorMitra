import React, { useEffect, useState } from 'react';
import axios from 'axios';
const baseURL = import.meta.env.VITE_API_baseURL
const SupplierGroupBuyDashboard = () => {
    const [groupBuys, setGroupBuys] = useState([]);

    const fetchGroupBuys = async () => {
        try {
            const res = await axios.get(`${baseURL}/supplier/groupbuys`, { withCredentials: true });
            setGroupBuys(res.data);
        } catch (err) {
            console.error(err);
            alert('Error fetching group buys');
        }
    };

    const handleAction = async (id, action, reason = '') => {
        try {
            await axios.post(`${baseURL}/supplier/groupbuys/${id}/${action}`, { reason }, { withCredentials: true });
            fetchGroupBuys(); // refresh UI
        } catch (err) {
            alert('Error updating group buy status');
        }
    };

    useEffect(() => {
        fetchGroupBuys();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-orange-700">Group Buy Requests</h1>

            {groupBuys && groupBuys.length === 0 && <p>No group buys found.</p>}

            {groupBuys && groupBuys.map((gb) => (
                <div key={gb._id} className="bg-white p-5 rounded-lg mb-6 border shadow-lg border-yellow-400">
                    <h2 className="text-xl font-semibold mb-2">{gb.productId?.name}</h2>
                    <p><strong>Status:</strong> <span className="capitalize">{gb.status}</span></p>
                    <p><strong>Target Quantity:</strong> {gb.targetQuantity}</p>
                    <p><strong>Current Quantity:</strong> {gb.currentQuantity}</p>
                    <p><strong>Negotiated Price:</strong> ₹{gb.negotiatedPrice}</p>
                    <p><strong>Ends At:</strong> {new Date(gb.endsAt).toLocaleString()}</p>

                    <div className="mt-3">
                        <p className="font-semibold">Participants:</p>
                        <ul className="list-disc ml-6">
                            {gb.participants.map((p) => (
                                <li key={p._id}>
                                    {p.userId.name} - {p.quantity} {gb.productId?.unit}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {gb.status === 'pending' && (
                        <div className="mt-4 flex gap-4">
                            <button
                                className="bg-green-600 text-white px-4 py-1 rounded"
                                onClick={() => handleAction(gb._id, 'accept')}
                            >
                                Accept
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-1 rounded"
                                onClick={() => {
                                    const reason = prompt('Enter rejection reason:');
                                    if (reason) handleAction(gb._id, 'reject', reason);
                                }}
                            >
                                Reject
                            </button>
                        </div>
                    )}

                    {gb.status === 'rejected' && gb.rejectionReason && (
                        <p className="text-red-500 mt-2">Rejection Reason: {gb.rejectionReason}</p>
                    )}

                    {gb.isSuccessful && (
                        <p className="text-green-600 mt-2 font-medium">✅ Group Buy status is successful!</p>
                    )}

                    {!gb.isActive && !gb.isSuccessful && (
                        <p className="text-gray-500 mt-2 italic">❌ Group Buy ended unsuccessfully.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SupplierGroupBuyDashboard;
