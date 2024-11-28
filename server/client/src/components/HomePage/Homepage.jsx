import React from "react";
import {Box, Typography, Container} from '@mui/material'
import MainContent from "./MainContent";
import Navbar from "../Navbar/navbar";

const topPosts = [
    {
      _id: '1',
      title: 'Post 1',
      content: 'This is the content for post 1',
      mediaUrl: 'https://via.placeholder.com/150',
      author: 'Author 1',
      updatedAt: '2024-11-27',
    },
    {
      _id: '2',
      title: 'Post 2',
      content: 'This is the content for post 2',
      mediaUrl: 'https://via.placeholder.com/150',
      author: 'Author 2',
      updatedAt: '2024-11-28',
    },
    {
        _id: '3',
        title: 'Post 3',
        content: 'This is the content for post 3',
        mediaUrl: 'https://via.placeholder.com/150',
        author: 'Author 3',
        updatedAt: '2024-11-26',
      },
  ];

export default function HomePage(){
    return(
        <Box sx= {{minHeight: '150vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Navbar />
            <Container>
                <Typography variant="h4" align="center" style= {{marginBottom: '32px', marginTop: '50px'}}>
                    Hi, welcome to the Tapioca Troopers blog site. 
                </Typography> 
                <Typography variant="h6" align="center" style= {{marginBottom: '60px'}}>
                    <h4>below is a guide to each tab you can access through the menu bar, as well as the post feed</h4>
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: 4}}>
                        <MainContent topPosts={topPosts}/>
                <Box sx={{flex: 1, maxWidth: '400px'}}> 
                    <br/>
                    <ul>
                        <li style={{ marginBottom: '24px', marginTop:'60px' }}><b>Home:</b> this will take you back here</li>
                        <li style={{ marginBottom: '24px' }}><b>Sign in/Sign up:</b> here you can sign into your account, or make a new one if you havent made one yet!</li>
                        <li style={{ marginBottom: '24px' }}><b>Post:</b> here you can see your feed, you can also make posts and commments after signing in</li>
                    </ul>
                </Box>
                </Box>
            </Container>
        </Box>
    )
}