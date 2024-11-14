import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaUser} from 'react-icons/fa'
import './styles/Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Tapioca Troopers</Link>
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                &#9776;
            </div>
            <ul className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
                <li><Link to="/">Feed</Link></li>
                <li><Link to="/about">Profile</Link></li>
                <li><Link to="/services">Categories</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                
            </ul>
        </nav>
    );
};

export default Navbar;
