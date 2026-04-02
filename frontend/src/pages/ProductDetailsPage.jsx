import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://vantage-inyd.onrender.com/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading product details...</div>;
  if (!product) return <div className="text-center mt-20 text-xl text-red-600">Product not found!</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-1/2 h-96 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden">
        {product.image_url ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" /> : <span className="text-gray-400">No Image</span>}
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        <span className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">{product.category}</span>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">{product.name}</h1>
        <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">S/. {product.price.toFixed(2)}</p>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">{product.description}</p>
        <div className="mt-auto">
          <button onClick={() => addToCart(product)} disabled={product.stock <= 0} className={`w-full py-4 rounded-xl font-bold text-xl transition shadow-lg ${product.stock > 0 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
          <Link to="/shop" className="block text-center mt-6 text-gray-500 dark:text-gray-400 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">&larr; Back to Shop</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;