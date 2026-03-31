import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
      
      {/* 1. CLICKABLE IMAGE */}
      <Link to={`/product/${product._id}`}>
        <div className="h-56 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
          <span className="text-gray-500 font-medium">View Details</span>
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">{product.category}</p>
        
        {/* 2. CLICKABLE TITLE */}
        <Link to={`/product/${product._id}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition">
              {product.name}
            </h3>
        </Link>

        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-2xl font-black text-gray-900">S/. {product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)} 
            className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;