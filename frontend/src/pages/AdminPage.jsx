import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const[products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null); // Tracks if we are updating a product
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', stock: '', category: 'Ergonomics', image_url: ''
  });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // 1. Fetch all products when the page loads
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://vantage-inyd.onrender.com/api/products');
      setProducts(response.data);
    } catch (error) { console.error("Error fetching products"); }
  };

  useEffect(() => {
    fetchProducts();
  },[]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // 2. Handle Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || user?.role !== 'admin') return setMessage('❌ Access Denied');

    try {
      if (editingId) {
        // UPDATE EXISTING PRODUCT
        await axios.put(`https://vantage-inyd.onrender.com/api/products/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('✅ Product Updated Successfully!');
      } else {
        // CREATE NEW PRODUCT
        await axios.post('https://vantage-inyd.onrender.com/api/products', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('✅ Product Added Successfully!');
      }
      
      setFormData({ name: '', description: '', price: '', stock: '', category: 'Ergonomics', image_url: '' });
      setEditingId(null);
      fetchProducts(); // Refresh the list
    } catch (error) {
      setMessage('❌ Error saving product.');
    }
  };

  // 3. Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await axios.delete(`https://vantage-inyd.onrender.com/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('🗑️ Product Deleted!');
      fetchProducts(); // Refresh the list
    } catch (error) {
      setMessage('❌ Error deleting product.');
    }
  };

  // 4. Populate form for Editing
  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name, description: product.description, price: product.price,
      stock: product.stock, category: product.category, image_url: product.image_url || ''
    });
    window.scrollTo(0, 0); // Scroll to top
  };

  if (!user || user.role !== 'admin') return <div className="text-center mt-20 text-2xl font-bold text-red-600">Access Denied</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      
      {/* TOP SECTION: THE FORM */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
        <h1 className="text-3xl font-black text-blue-900 mb-2">{editingId ? 'Edit Product' : 'Add New Product'}</h1>
        
        {message && <div className="mb-6 p-4 rounded-lg font-bold bg-blue-100 text-blue-800">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded bg-gray-50" placeholder="Product Name" />
          <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full p-3 border rounded bg-gray-50" rows="3" placeholder="Description"></textarea>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full p-3 border rounded bg-gray-50" placeholder="Image URL (e.g. https://...)" />
          
          <div className="flex gap-4">
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-1/2 p-3 border rounded bg-gray-50" placeholder="Price (S/.)" />
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="w-1/2 p-3 border rounded bg-gray-50" placeholder="Stock Qty" />
          </div>
          
          <div className="flex gap-4 mt-4">
            <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded hover:bg-blue-600 transition">
              {editingId ? '💾 Update Product' : '+ Publish Product'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', description: '', price: '', stock: '', category: 'Ergonomics', image_url: '' }); }} className="w-1/3 bg-red-100 text-red-600 font-bold py-3 rounded hover:bg-red-200 transition">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* BOTTOM SECTION: THE INVENTORY LIST */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Inventory</h2>
        <div className="space-y-4">
          {products.map((p) => (
            <div key={p._id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-bold text-gray-900">{p.name}</p>
                <p className="text-sm text-gray-500">S/. {p.price.toFixed(2)} | Stock: {p.stock}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(p)} className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-bold hover:bg-blue-200">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="bg-red-100 text-red-700 px-4 py-2 rounded font-bold hover:bg-red-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminPage;