import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate, token]);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h1 className="text-3xl font-black text-blue-900 mb-2">My Profile</h1>
        <p className="text-gray-600 text-lg">Welcome back, <b>{user.first_name}</b>!</p>
        <p className="text-gray-400">Account Type: <span className="uppercase text-blue-500 font-bold">{user.role}</span></p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
      
      {loading ? (
        <p>Loading receipts...</p>
      ) : orders.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-xl border text-center text-gray-500">You haven't placed any orders yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between">
              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">Order ID: {order._id}</p>
                <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-sm font-bold mt-2">Shipping: <span className="text-blue-600">{order.shipping_method}</span></p>
                <p className="text-sm text-gray-500">To: {order.shipping_address.street}, {order.shipping_address.city}</p>
              </div>
              <div className="text-right mt-4 md:mt-0 flex flex-col justify-between">
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider">
                  {order.order_status}
                </span>
                <div className="mt-4 text-2xl font-black text-gray-900">
                  S/. {order.total_amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;