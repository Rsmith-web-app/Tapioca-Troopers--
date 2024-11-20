import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ResponsiveAppBar from './components/nav';
import Login from '@Components/login';
import Register from '@Components/register';
import Nav from '@Components/nav';

import './style.css';


const App = () => {
    return(
        <>
        <Router>
            <ResponsiveAppBar />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
        </>
    )
}
export default App;