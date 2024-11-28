import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import MainContent from '../components/HomePage/MainContent';
import { getPostsApi } from '../api';
import { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar/navbar';

export default function Blog(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPostsApi();
      setPosts(postsData);
    };

    fetchPosts();
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <>
      <Navbar />
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent topPosts={posts} />
      </Container>
    </>
  );
}
