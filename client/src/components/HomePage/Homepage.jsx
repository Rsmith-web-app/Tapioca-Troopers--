import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import HomeContent from "./HomeContent";
import Navbar from "../Navbar/navbar";
import { getPostsApi } from "../../api";
import { CircularProgress } from '@mui/material';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPostsApi();
      const sortedPosts = postsData.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setPosts(sortedPosts.slice(0, 4));
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "150vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >

        <Container>
          <Typography
            variant="h4"
            align="center"
            style={{ marginBottom: "32px", marginTop: "50px" }}
          >
            Hi, welcome to the Tapioca Troopers blog site.
          </Typography>
          <Typography variant="h4" align="center" style={{ marginBottom: "70px" }}>
            <h4>
              Below is a guide to each tab you can access through the menu bar, as
              well as the most recent posts!
            </h4>
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
            <Box sx={{ flex: 1, maxWidth: "900px" }}>
              {loading ? (
                <CircularProgress color="secondary" />
              ) : (
                <HomeContent topPosts={posts} />
              )}

            </Box>
            <Box sx={{ flex: 1, maxWidth: "400px" }}>
              <br />
              <ul>
                <li style={{ marginBottom: "24px" }}>
                  <b>Home:</b> View the latest blog posts and updates.
                </li>
                <li style={{ marginBottom: "24px" }}>
                  <b>About Us:</b> Learn more about the Tapioca Troopers team.
                </li>
                <li style={{ marginBottom: "24px" }}>
                  <b>Contact:</b> Get in touch with us for inquiries or feedback.
                </li>
                <li style={{ marginBottom: "24px" }}>
                  <b>Archives:</b> Browse older posts and content.
                </li>
              </ul>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
