import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Feed from './pages/feed';
import Login from './pages/login';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
export default App;