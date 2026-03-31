import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import ShopPage from './pages/ShopPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { CartProvider } from './context/CartContext.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

const HomePage = () => <div className="text-center mt-20"><h1 className="text-5xl font-black text-blue-900">VANTAGE</h1><p className="mt-4 text-xl text-gray-600">The premium destination for ergonomic imports.</p></div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      { path: "/", element: <HomePage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/admin", element: <AdminPage /> },
      { path: "/product/:id", element: <ProductDetailsPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {}
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
); 