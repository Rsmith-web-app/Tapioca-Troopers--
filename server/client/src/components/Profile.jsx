// Profile.jsx
import React, { useContext } from "react";
import { UserContext } from "../modules/UserContext";
import Navbar from "./Navbar";
import Posts from "./Posts";

const Profile = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <p>You need to log in to view your profile.</p>;
    }

    return (
        <div className="profile">
            <Navbar />
            <div className="profile-details">
                <h1>Welcome, {user.name}!</h1>
      
            </div>
            <Posts />
        </div>
    );
};

export default Profile;
