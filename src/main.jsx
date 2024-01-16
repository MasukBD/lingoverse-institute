import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Provider/AuthProvider';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <div className='max-w-screen-2xl mx-auto'>
          <RouterProvider router={router} />
          <Toaster></Toaster>
        </div>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
)
