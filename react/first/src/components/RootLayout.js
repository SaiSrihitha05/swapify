import React from 'react';
import Navbar from './navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import './RootLayout.css'
function RootLayout() {
  return (
    <div className='out'>
      <Navbar />
      <div style={{ minHeight: '100vh'}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
