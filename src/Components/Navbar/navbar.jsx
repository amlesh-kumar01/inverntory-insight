import React,{useContext}from 'react';
import { AuthContext } from '../../Contexts/authContext.js';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const{auth,logout}= useContext(AuthContext);
return (
    <nav className="navbar">
        <div className="logo">
            <img src={'/assets/logo.png'} alt="Inventory Insight Logo" />
        </div>
        <ul className="nav-links">
            <li>
                <Link to="/inventory" className='nav-item'>Inventory</Link>
            </li>
            <li><Link to="/" className="nav-item">Home</Link></li>
        {auth.isAuthenticated ? (
          <li><button onClick={logout} className="nav-item">Logout</button></li>
        ) : (
          <li><Link to="/login" className="nav-item">Login</Link></li>
        )}
        </ul>
    </nav>
);
};

export default Navbar;
