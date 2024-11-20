import React from 'react'
import { Link } from 'react-router-dom';
import "./menubar.css"
const MenuBar= ()=>{
    return(
        <nav>
            <div className='logo'>
            <img src="/logo.jpg" alt=''/>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to='/feed'>Feed</Link></li>
                <li><Link to='/login'>Log in</Link></li>
            </ul>
        </nav>
    );
}
export default MenuBar;