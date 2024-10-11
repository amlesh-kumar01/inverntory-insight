import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
return (
    <nav className="navbar">
        <div className="logo">
            <img src={'/assets/logo.png'} alt="Inventory Insight Logo" />
        </div>
        <ul className="nav-links">
            <li><Link to="/" className="nav-item">Home</Link></li>
            <li><Link to="/login" className="nav-item">Login</Link></li>
        </ul>
    </nav>
);
};

export default Navbar;
