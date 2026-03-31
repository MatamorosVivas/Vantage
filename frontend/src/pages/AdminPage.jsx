import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Ergonomics'
  });
  const[message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData,[e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    if (!token || !userString) {
      setMessage('❌ You are not logged in!');
      return;
    }

    const user = JSON.parse(userString);
    if (user.role !== 'admin') {
      setMessage('❌ Access Denied: You are not an Admin!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201) {
        setMessage('✅ Product Successfully Added to the Store!');
        setFormData({ name: '', description: '', price: '', stock: '', category: 'Ergonomics' }); 
      }
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black text-blue-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 mb-8">Add new inventory to Tiendas Mosha.</p>

        {message && (
          <div className={`mb-6 p-4 rounded-lg font-bold ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-gray-50" placeholder="e.g. Posture Corrector Pro" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-gray-50" rows="3" placeholder="Product details..."></textarea>
          </div>

          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Price (Soles)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-gray-50" placeholder="0.00" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Stock Quantity</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-gray-50" placeholder="0" />
            </div>
          </div>

          <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-blue-600 transition duration-300 text-lg shadow-md">
            + Publish Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;