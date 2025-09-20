import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import About from './pages/About';

import api from './api';

export default function App() {
  const [headerImage, setHeaderImage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    api.get('/settings/headerImage').then(r => {
      setHeaderImage(r.data);
    }).catch(() => {});
  }, []);

  // Determine if navbar should be shown
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="container">
        {headerImage && <div className="header-image" style={{ backgroundImage: `url(${headerImage})` }} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </div>
    </>
  );
}

