import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>
      
      {loading && <p>Loading products from the database...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {}
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;