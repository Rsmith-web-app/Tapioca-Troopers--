import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/login';
import Register from './components/Register/register';
import ProfilePage from './components/Profile/profile';
import PostDetails from './components/PostDetail/postdetail';

import Blog from './pages/Blog';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/' element={<Blog />} />
          <Route path='/post/:id' element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
