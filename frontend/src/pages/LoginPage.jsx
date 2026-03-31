import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const[isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData,[e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage('✅ Login Successful!');
        setTimeout(() => navigate('/shop'), 1000);
      } else {
        await axios.post('http://localhost:5000/api/auth/register', {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password_hash: formData.password,
          role: 'customer'
        });
        setMessage('✅ Registration Successful! Please log in.');
        setIsLogin(true);
      }
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {isLogin ? 'Welcome Back to Vantage' : 'Create an Account'}
        </h2>
        
        {message && <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded font-semibold text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="flex gap-4">
              <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required className="w-1/2 p-3 border rounded-lg bg-gray-50" />
              <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required className="w-1/2 p-3 border rounded-lg bg-gray-50" />
            </div>
          )}
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="w-full p-3 border rounded-lg bg-gray-50" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 border rounded-lg bg-gray-50" />
          
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500 cursor-pointer hover:text-blue-600" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register here." : "Already have an account? Sign in here."}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;