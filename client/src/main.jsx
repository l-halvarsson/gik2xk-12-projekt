import React from 'react';
import ReactDOM from 'react-dom/client';
import AllProducts from './views/AllProducts.jsx';
import CartPage from './views/CartPage.jsx';
import Home from './views/Home.jsx';
import ProductDetails from './views/ProductDetails.jsx';
import ProductEdit from './views/ProductEdit.jsx';
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
