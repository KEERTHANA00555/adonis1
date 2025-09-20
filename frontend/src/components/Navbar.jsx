import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar-container">
      <div className="navbar">
        {/* Logo / Brand */}
        <div className="brand">
          <div className="logo">HR</div>
          <div className="brand-text">
            <div className="company-name">Adonis</div>
            <div className="subtitle">Hiring Portal</div>
          </div>
        </div>

        {/* Hamburger toggle button for mobile */}
        <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>

        {/* Nav links */}
        <div className={`navlinks ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Jobs
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link to="/admin/login" onClick={() => setMenuOpen(false)}>
            Admin
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>
            Services
          </Link>
          <Link to="/clients" onClick={() => setMenuOpen(false)}>
            Clients
          </Link>
        </div>
      </div>
    </nav>
  );
}
