import React from 'react';
import ReactDOM from 'react-dom/client';
import AllProducts from './views/AllProducts.jsx';
import CartPage from './views/CartPage.jsx';
import Home from './views/Home.jsx';
import ProductDetails from './views/ProductDetails.jsx';
import AdminPage from './views/AdminPage.jsx';
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/admin',
        element: <AdminPage />
      },
      {
        path: '/products/:id',
        element: <ProductDetails />
      },
      {
        path: '/products',
        element: <AllProducts />
      },
      {
        path: '/cart/:userId',
        element: <CartPage />
      },
    ]
  }
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
); 
