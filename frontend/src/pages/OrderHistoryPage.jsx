import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://vantage-inyd.onrender.com/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Link to="/profile" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">&larr; Back to Account</Link>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Orders</h1>
      
      {loading ? <p className="dark:text-white">Loading...</p> : orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">You haven't placed any orders yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between">
              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">Order ID: {order._id}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">To: {order.shipping_address.street}</p>
              </div>
              <div className="text-right mt-4 md:mt-0 flex flex-col justify-between items-end">
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  {order.order_status}
                </span>
                <Link to={`/receipt/${order._id}`} className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition text-sm">
                  View Receipt
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;