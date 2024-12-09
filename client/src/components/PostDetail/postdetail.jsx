import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Avatar,
  Container,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { deepOrange } from "@mui/material/colors";
import Navbar from "../Navbar/navbar";

const api = process.env.REACT_APP_SERVER_URL;

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch post details
    fetch(`${api}/api/post/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setPost(data.post);
        setComments(data.post.comments || []);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token

    fetch(`${api}/api/post/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
      body: JSON.stringify({ content: newComment }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || "Failed to submit comment");
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.comment) {
          setComments((prevComments) => [...prevComments, data.comment]);
          setNewComment("");
          setCommentError(null); // Clear any previous error
        }
      })
      .catch((err) => setCommentError(err.message));
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  if (!post) {
    return (
      <Typography
        variant="h6"
        align="center"
        sx={{ marginTop: 4, color: "gray" }}
      >
        {error || "Loading post details..."}
      </Typography>
    );
  }

  return (
    <>
      <Navbar />
      <Container sx={{ maxWidth: "800px", margin: "auto", padding: 4 }}>
        {/* Post Details */}
        <Card elevation={3} sx={{ mb: 4 }}>
          <Box sx={{ position: "relative", height: "400px", overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={post.mediaUrl || "https://via.placeholder.com/800x450"}
              alt={post.title}
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                filter: "brightness(0.9)",
                transition: "transform 0.5s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  filter: "brightness(1)",
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                padding: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {post.title}
              </Typography>
              <Button variant="contained" onClick={toggleModal}>
                Read More
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Modal for Post Content */}
        <Dialog open={isModalOpen} onClose={toggleModal} maxWidth="md" fullWidth>
          <DialogTitle>{post.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{post.content}</Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", mt: 2 }}>
              By {post.author?.alias || "Unknown"} |{" "}
              {new Date(post.createdAt).toLocaleString()}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleModal} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Comments Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Comments
          </Typography>
          {comments.length === 0 ? (
            <Typography sx={{ color: "text.secondary" }}>
              No comments yet. Be the first to comment!
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {comments.map((comment) => (
                <Grid item xs={12} key={comment._id}>
                  <Card
                    elevation={1}
                    sx={{
                      padding: 2,
                      "&:hover": { boxShadow: 4 },
                    }}
                  >
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                      <Avatar sx={{ bgcolor: deepOrange[500], mr: 2 }}>
                        {comment.author?.alias
                          ? comment.author.alias.charAt(0).toUpperCase()
                          : "A"}
                      </Avatar>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        {comment.author?.alias || "Anonymous"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", ml: "auto" }}
                      >
                        {new Date(comment.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{comment.content}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Add Comment */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Add a Comment
          </Typography>
          {commentError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {commentError}
            </Alert>
          )}
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddComment}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
          >
            Submit Comment
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default PostDetail;
