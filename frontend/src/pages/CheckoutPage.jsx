import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    street: '', city: '', state: '', zip_code: '',
    national_id: '', shipping_method: 'Local Delivery'
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData,[e.target.name]: e.target.value });
  };

  const cartTotal = getCartTotal();
  const shippingDeduction = formData.shipping_method === 'Shalom Agency' ? 15.00 : 0.00;
  const finalTotal = cartTotal - shippingDeduction;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    if (!token || !userString) {
      setMessage('❌ You must be logged in to checkout! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const user = JSON.parse(userString);
    const orderItems = cart.map(item => ({
      product_id: item._id,
      quantity: item.quantity,
      unit_price: item.price
    }));

    const orderData = {
      user_id: user.id,
      shipping_address: {
        street: formData.street, city: formData.city,
        state: formData.state, zip_code: formData.zip_code
      },
      national_id: formData.national_id,
      shipping_method: formData.shipping_method,
      shipping_deduction: shippingDeduction,
      total_amount: finalTotal,
      order_items: orderItems
    };

    try {
      const response = await axios.post('/https://vantage-inyd.onrender.comapi/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201) {
        setIsSuccess(true);
        clearCart(); 
        setTimeout(() => navigate('/shop'), 4000);
      }
    } catch (error) {
      setMessage('❌ Error: Could not process order.');
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-4xl font-black text-green-600 mb-4">Order Placed Successfully!</h2>
        <p className="text-xl text-gray-600 mb-2">Please prepare your Yape for delivery.</p>
        <p className="text-gray-400">Redirecting you back to the homepage...</p>
      </div>
    );
  }

  if (cart.length === 0) return <div className="text-center mt-20 text-2xl font-bold">Your cart is empty!</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Details</h2>
        {message && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded font-bold">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="street" placeholder="Street Address" onChange={handleChange} required className="w-full p-3 border rounded-lg bg-gray-50" />
          <div className="flex gap-4">
            <input type="text" name="city" placeholder="City" onChange={handleChange} required className="w-1/2 p-3 border rounded-lg bg-gray-50" />
            <input type="text" name="state" placeholder="State/Province" onChange={handleChange} required className="w-1/4 p-3 border rounded-lg bg-gray-50" />
            <input type="text" name="zip_code" placeholder="ZIP" onChange={handleChange} required className="w-1/4 p-3 border rounded-lg bg-gray-50" />
          </div>
          <input type="text" name="national_id" placeholder="ID" onChange={handleChange} required className="w-full p-3 border rounded-lg bg-gray-50" />
          <div className="pt-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Shipping Method</label>
            <select name="shipping_method" onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50 font-semibold text-gray-700">
              <option value="Local Delivery">Local Delivery</option>
              <option value="Shalom Agency">Out of province</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition mt-6 text-lg shadow-md">
            Confirm Order & Pay
          </button>
        </form>
      </div>

      {}
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
        <ul className="divide-y divide-gray-200 mb-6">
          {cart.map(item => (
            <li key={item._id} className="py-3 flex justify-between">
              <span className="text-gray-600">{item.quantity}x {item.name}</span>
              <span className="font-bold text-gray-900">S/. {(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between text-gray-500 mb-2">
          <span>Subtotal:</span>
          <span>S/. {cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-blue-600 font-bold mb-4 border-b border-gray-200 pb-4">
          <span>Shipping Deduction:</span>
          <span>- S/. {shippingDeduction.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-2xl font-black text-gray-900">
          <span>Total:</span>
          <span>S/. {finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;