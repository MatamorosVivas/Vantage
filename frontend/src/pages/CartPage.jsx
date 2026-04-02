import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if logged in

  const handleCheckoutClick = () => {
    if (!token) {
      alert("Please log in or register to continue to checkout.");
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-4 mb-8">Looks like you haven't added any ergonomic gear yet.</p>
        <Link to="/shop" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
          {cart.map((item) => (
            <li key={item._id} className="p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-750 transition">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-800 dark:text-white">{item.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity} x S/. {item.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  S/. {(item.price * item.quantity).toFixed(2)}
                </span>
                <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 font-semibold text-sm">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-end border-t border-gray-200 dark:border-gray-700">
          <div className="text-xl mb-4">
            <span className="text-gray-600 dark:text-gray-400 mr-4">Subtotal:</span>
            <span className="text-3xl font-black text-gray-900 dark:text-white">S/. {getCartTotal().toFixed(2)}</span>
          </div>
          <button onClick={handleCheckoutClick} className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition shadow-lg w-full md:w-auto text-center">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;