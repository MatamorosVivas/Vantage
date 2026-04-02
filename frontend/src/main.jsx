import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { CartProvider } from './context/CartContext.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import OrderHistoryPage from './pages/OrderHistoryPage.jsx';
import ReceiptPage from './pages/ReceiptPage.jsx';
import SecurityPage from './pages/SecurityPage.jsx';
import AddressesPage from './pages/AddressesPage.jsx';

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
      { path: "/profile/orders", element: <OrderHistoryPage /> },
      { path: "/profile/security", element: <SecurityPage /> }, 
      { path: "/profile/addresses", element: <AddressesPage /> },
      
      { path: "/receipt/:id", element: <ReceiptPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);