import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import './App.css';

// imports
import Login from './components/Login';
import Home from './components/Home';


// Page Components

const About = () => <h1>About Us</h1>;
const Services = () => <h1>Our Services</h1>;
const Contact = () => <h1>Contact Us</h1>;

const App = () => {
    return (
        
        <Router>
            <div>
                <Navbar /> {/* Navigation Bar */}
                <Login />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
