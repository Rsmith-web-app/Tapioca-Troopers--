import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import navbar from   "@Components/navbar";




import './style.css';

const App = () => {
    return(
        <>
        <Router>
            <navbar />
            <Routes>
                {/* <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} /> */}
            </Routes>
        </Router>
        </>
    )
}
export default App;