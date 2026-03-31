import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';

function App() {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-black text-blue-800 tracking-tighter">VANTAGE.</Link>
          <ul className="flex items-center space-x-6 font-semibold">
            <li><Link to="/shop" className="text-gray-600 hover:text-blue-600 transition">Shop</Link></li>
            
            {}
            {user && user.role === 'admin' && (
              <li><Link to="/admin" className="text-red-600 hover:text-red-800 transition">Dashboard</Link></li>
            )}

            {}
            {user ? (
              <>
                <li><Link to="/profile" className="text-gray-600 hover:text-blue-600 font-bold transition">My Profile</Link></li>
                <li><button onClick={handleLogout} className="text-gray-600 hover:text-red-600 transition">Logout</button></li>
              </>
            ) : (
              <li><Link to="/login" className="text-gray-600 hover:text-blue-600 transition">Login</Link></li>
            )}

            <li>
              <Link to="/cart" className="bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700 transition">
                Cart ({totalItems})
              </Link>
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