import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const GroupBuyNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md border-b-2 border-orange-500 px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-orange-700">
        🛒 Group Buy
      </div>

      <div className="flex items-center gap-4">
        {/* Example nav links */}
        <Link
          to="/groupby/all"
          className="text-orange-700 font-medium hover:text-orange-900 transition"
        >
          All Groups
        </Link>
        <Link
          to="/groupby/my"
          className="text-orange-700 font-medium hover:text-orange-900 transition"
        >
          My Groups
        </Link>

        <button
          onClick={() => navigate('/dashboard')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded transition"
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </nav>
  );
};

export default GroupBuyNavbar;
