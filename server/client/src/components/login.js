import React from 'react';
import { Box, TextField, Button, Typography, Link, Container } from '@mui/material';

function Login() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
      <Typography align="center">
        Don't have an account?{' '}
        <Link href="/register" underline="hover">
          Register
        </Link>
      </Typography>
    </Container>
  );
}

export default Login;
