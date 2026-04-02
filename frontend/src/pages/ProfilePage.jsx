import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Box 1: Orders */}
        <Link to="/profile/orders" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-start gap-4">
          <div className="text-4xl">📦</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Orders</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Track, return, or view receipts for past purchases</p>
          </div>
        </Link>

        {/* Box 2: Security */}
        <Link to="/profile/security" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-start gap-4">
          <div className="text-4xl">🔒</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Login & Security</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Edit your name, email, and password</p>
          </div>
        </Link>

        {/* Box 3: Addresses */}
        <Link to="/profile/addresses" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-start gap-4">
          <div className="text-4xl">📍</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Addresses</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Edit your saved addresses for future orders</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;