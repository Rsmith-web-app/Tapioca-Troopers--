import React from 'react';
import MenuBar from '../menubar/menubar.js';
import '../styles.css'
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
        <MenuBar/>
        <div className='content'>
            <h1>Welcome to the Tapioca Troopers Blog site</h1>
            <p>The menu bar above can be used to navigate the website, Please sign in to view your feed!</p>
            <br></br>
            <ul>
                <li><b>Home</b> will return you here Again!</li>
                <br/>
                <li><b>Feed</b> will take you to view posts you can even make your own or comment on others!</li>
                <br/>
                <li><b>Log in</b> is where you can sign in to your account to post what you'd like, or register for a new account.</li>
                <br/>
                <p>You can also click the Image to the right to go to your log in!</p>
            </ul>
            <Link to='/login'><img src='TT.png' className='troop' title='Join the Troop!'/></Link>
        </div>
        </div>
    );
}
export default Home;