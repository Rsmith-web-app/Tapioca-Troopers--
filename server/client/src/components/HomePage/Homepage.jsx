import React, { useState, useEffect } from "react";
import {Box, Typography, Container} from '@mui/material'
import MainContent from "./MainContent";
import Navbar from "../Navbar/navbar";
import { getPostsApi } from "../../api";



export default function HomePage(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await getPostsApi();
            const sortedPosts = postsData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setPosts(sortedPosts.slice(0, 4)); 
        };

        fetchPosts();

    }, []);

    return(
        <Box sx= {{minHeight: '150vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Navbar />
            <Container>
                <Typography variant="h4" align="center" style= {{marginBottom: '32px', marginTop: '50px'}}>
                    Hi, welcome to the Tapioca Troopers blog site. 
                </Typography> 
                <Typography variant="h6" align="center" style= {{marginBottom: '60px'}}>
                    <h4>below is a guide to each tab you can access through the menu bar, as well as a preview of the post feed</h4>
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: 4}}>
                <Box sx={{ flex: 1, maxWidth: '900px' }}>
                        <MainContent topPosts={posts}/>
                </Box>
                <Box sx={{flex: 1, maxWidth: '400px'}}> 
                    <br/>
                    <ul>
                        <li style={{ marginBottom: '24px', marginTop:'60px' }}><b>Home:</b> this will take you back here</li>
                        <li style={{ marginBottom: '24px' }}><b>Feed:</b> here you can see your full feed</li>
                        <li style={{ marginBottom: '24px' }}><b>Profile:</b> This tab allows you to make posts and see the posts you've made if you're signed in</li>
                        <li style={{ marginBottom: '24px' }}><b>Sign in/Sign up:</b> here you can sign into your account, or make a new one if you havent made one yet!</li>

                    </ul>
                </Box>
                </Box>
            </Container>
        </Box>
    )
}