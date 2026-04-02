import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';

function App() {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  // DARK MODE STATE
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    // The main wrapper changes color based on dark mode!
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans text-gray-900 dark:text-gray-100">
      
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-black text-[#0F3057] dark:text-white tracking-tighter flex items-center gap-2">
            <span className="bg-orange-500 text-white p-1 rounded">🛍️</span> MOSHA
          </Link>
          
          <ul className="flex items-center space-x-6 font-semibold">
            <li><Link to="/shop" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition">Tienda</Link></li>
            
            {user && user.role === 'admin' && (
              <li><Link to="/admin" className="text-red-600 dark:text-red-400 hover:text-red-800 transition">Dashboard</Link></li>
            )}

            {user ? (
              <>
                <li><Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition">Mi Perfil</Link></li>
                <li><button onClick={handleLogout} className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition">Salir</button></li>
              </>
            ) : (
              <li><Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition">Ingresar</Link></li>
            )}

            <li>
              <Link to="/cart" className="bg-[#0F3057] dark:bg-orange-500 text-white px-5 py-2 rounded-full shadow hover:bg-[#1a4175] dark:hover:bg-orange-600 transition">
                🛒 ({totalItems})
              </Link>
            </li>

            {/* DARK MODE BUTTON */}
            <li>
              <button onClick={toggleDarkMode} className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </nav>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;