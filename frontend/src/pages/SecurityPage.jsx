import React from 'react';
import { Link } from 'react-router-dom';

const SecurityPage = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Link to="/profile" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">&larr; Back to Account</Link>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Login & Security</h1>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
        
        <div className="p-6 flex justify-between items-center">
          <div>
            <p className="font-bold text-gray-900 dark:text-white">Name</p>
            <p className="text-gray-600 dark:text-gray-400">{user.first_name} (Role: {user.role})</p>
          </div>
          <button className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 border dark:border-gray-600">Edit</button>
        </div>

        <div className="p-6 flex justify-between items-center">
          <div>
            <p className="font-bold text-gray-900 dark:text-white">Email</p>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
          <button className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 border dark:border-gray-600">Edit</button>
        </div>

        <div className="p-6 flex justify-between items-center">
          <div>
            <p className="font-bold text-gray-900 dark:text-white">Password</p>
            <p className="text-gray-600 dark:text-gray-400">********</p>
          </div>
          <button className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 border dark:border-gray-600">Edit</button>
        </div>

      </div>
    </div>
  );
};

export default SecurityPage;