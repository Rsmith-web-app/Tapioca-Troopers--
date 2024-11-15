import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import './App.css';

// imports
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import Profile from './components/Profile';


// Page Components


const Services = () => <h1>Our Services</h1>;
const Contact = () => <h1>Contact Us</h1>;

const App = () => {
    return (
        <>
        <Router>
            
            <div>
                <Routes>
                    <Route path='/register' element={<Registration />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
        </>
    );
};

export default App;
