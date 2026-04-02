import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ReceiptPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get('https://vantage-inyd.onrender.com/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const foundOrder = response.data.find(o => o._id === id);
        setOrder(foundOrder);
      } catch (error) { console.error(error); }
    };
    fetchOrder();
  },[id, token]);

  if (!order) return <div className="text-center mt-20 dark:text-white">Loading Receipt...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Link to="/profile/orders" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block print:hidden">&larr; Back to Orders</Link>
      
      <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center border-b dark:border-gray-700 pb-6 mb-6">
          <h1 className="text-3xl font-black text-[#0F3057] dark:text-white tracking-tighter">VANTAGE.</h1>
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Receipt</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-bold text-gray-800 dark:text-gray-200">Order ID:</p>
          <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">{order._id}</p>
        </div>

        <div className="mb-8">
          <p className="font-bold text-gray-800 dark:text-gray-200">Shipping To:</p>
          <p className="text-gray-600 dark:text-gray-400">{order.shipping_address.street}, {order.shipping_address.city}</p>
        </div>

        <table className="w-full text-left mb-8">
          <thead>
            <tr className="border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">
              <th className="pb-2">Item ID</th>
              <th className="pb-2 text-right">Qty</th>
              <th className="pb-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-400">
            {order.order_items.map((item, index) => (
              <tr key={index} className="border-b dark:border-gray-700">
                <td className="py-3 font-mono text-sm">{item.product_id}</td>
                <td className="py-3 text-right">{item.quantity}</td>
                <td className="py-3 text-right">S/. {item.unit_price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right text-2xl font-black text-gray-900 dark:text-white">
          Total: S/. {order.total_amount.toFixed(2)}
        </div>
      </div>

      <div className="mt-6 text-center print:hidden">
        <button onClick={() => window.print()} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md">
          Download / Print Receipt
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;