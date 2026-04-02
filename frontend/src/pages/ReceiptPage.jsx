import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ReceiptPage = () => {
  const { id } = useParams();
  const[order, setOrder] = useState(null);
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
      
      {/* RECEIPT PAPER - Stays light for printing */}
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200 text-gray-800">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b-2 border-gray-800 pb-4 mb-8">
          <h1 className="text-4xl font-black text-gray-300 tracking-tighter">VANTAGE.</h1>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-500">Receipt</h2>
            <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toISOString().split('T')[0]}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="mb-6">
          <p className="font-bold text-gray-500 text-sm">Order ID:</p>
          <p className="text-gray-800">{order._id}</p>
        </div>

        <div className="mb-10">
          <p className="font-bold text-gray-500 text-sm">Shipping To:</p>
          <p className="text-gray-800">{order.shipping_address.street}, {order.shipping_address.city}</p>
        </div>

        {/* Items Table */}
        <table className="w-full text-left mb-8">
          <thead>
            <tr className="border-b-2 border-gray-800 text-gray-500 text-sm">
              <th className="pb-2 font-bold">Item ID</th>
              <th className="pb-2 text-right font-bold">Qty</th>
              <th className="pb-2 text-right font-bold">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {order.order_items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 text-sm">{item.product_id}</td>
                <td className="py-4 text-right">{item.quantity}</td>
                <td className="py-4 text-right">S/. {item.unit_price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="text-right text-3xl font-black text-gray-400">
          Total: S/. {order.total_amount.toFixed(2)}
        </div>
      </div>

      <div className="mt-6 text-center print:hidden">
        <button onClick={() => window.print()} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md transition">
          Download / Print Receipt
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;