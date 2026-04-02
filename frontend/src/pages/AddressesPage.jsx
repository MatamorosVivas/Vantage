import React from 'react';
import { Link } from 'react-router-dom';

const AddressesPage = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Link to="/profile" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">&larr; Back to Account</Link>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Addresses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Add Address Box */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center h-64 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition">
          <span className="text-gray-500 dark:text-gray-400 font-bold text-xl">+ Add Address</span>
        </div>

        {/* Saved Address Box */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 h-64 bg-white dark:bg-gray-800 flex flex-col relative shadow-sm">
          <span className="text-xs font-bold text-gray-500 border-b dark:border-gray-700 pb-2 mb-3">Default</span>
          <p className="font-bold text-gray-900 dark:text-white">{user.first_name}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-1">123 Main St</p>
          <p className="text-gray-600 dark:text-gray-300">Vancouver</p>
          <p className="text-gray-600 dark:text-gray-300">Canada</p>
          
          <div className="absolute bottom-6 left-6 flex gap-4 text-blue-600 dark:text-blue-400 text-sm font-semibold">
            <button className="hover:underline">Edit</button>
            <button className="hover:underline">Remove</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddressesPage;