import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/login';
import Register from './components/Register/register';
import ProfilePage from './components/Profile/profile';


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
