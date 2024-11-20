import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ResponsiveAppBar from '@Components/ResponsiveAppBar';



import './style.css';

const App = () => {
    return(
        <>
        <Router>
            <ResponsiveAppBar />
            <Routes>
                {/* <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} /> */}
            </Routes>
        </Router>
        </>
    )
}
export default App;