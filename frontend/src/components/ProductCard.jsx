import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
      <Link to={`/product/${product._id}`}>
        <div className="h-56 bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:opacity-80 transition cursor-pointer overflow-hidden">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 dark:text-gray-400 font-medium">View Details</span>
          )}
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">{product.category}</p>
        <Link to={`/product/${product._id}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-400 transition">
              {product.name}
            </h3>
        </Link>
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-2xl font-black text-gray-900 dark:text-white">S/. {product.price.toFixed(2)}</span>
          <button onClick={() => addToCart(product)} className="bg-gray-900 dark:bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 dark:hover:bg-orange-600 transition-colors">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;