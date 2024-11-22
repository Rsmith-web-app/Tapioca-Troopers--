import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function PostDetails() {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Fetch the post details
    axios.get(`/api/posts/${id}`).then((response) => {
      setPost(response.data.post);
    });
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
      await axios.post(`/api/posts/${id}/comments`, { content: comment });
      setComment(''); // Clear the comment field after submission
      alert('Comment added successfully!');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 4 }}>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="body1" gutterBottom>
        {post.content}
      </Typography>
      <Avatar
        alt={post.author}
        src={`https://picsum.photos/48/48/?random=${post.author}`}
        sx={{ width: 48, height: 48 }}
      />
      <Typography variant="caption">By {post.author}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
        <TextField
          label="Add a comment"
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={3}
        />
        <Button variant="contained" onClick={handleCommentSubmit}>
          Submit Comment
        </Button>
      </Box>
    </Box>
  );
}
