import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mt-4 mb-8">Looks like you haven't added any ergonomic gear yet.</p>
        <Link to="/shop" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {}
        <ul className="divide-y divide-gray-100">
          {cart.map((item) => (
            <li key={item._id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-800">{item.name}</span>
                <span className="text-sm text-gray-500">Qty: {item.quantity} x S/. {item.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xl font-bold text-blue-600">
                  S/. {(item.price * item.quantity).toFixed(2)}
                </span>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 font-semibold text-sm"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        {}
        <div className="bg-gray-50 p-6 flex flex-col items-end border-t border-gray-200">
          <div className="text-xl mb-4">
            <span className="text-gray-600 mr-4">Subtotal:</span>
            <span className="text-3xl font-black text-gray-900">S/. {getCartTotal().toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition shadow-lg w-full md:w-auto text-center">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;