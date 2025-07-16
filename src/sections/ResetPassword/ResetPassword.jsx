import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

// export default function LoginView() {
//   const theme = useTheme();

//   const [showPassword, setShowPassword] = useState(false);

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const lowerCaseEmail = email.toLowerCase();

      const response = await axios.post(
        'https://lifelinebackend.onrender.com/api/pharmacys/request-password-reset-otp',
        { email: lowerCaseEmail }
      );
      setMessage(response.data.message || 'OTP sent to your email!');
      setLoading(false);
      setError(null);
      router.push('/reset-password/new');
    } catch (err) {
      setError(err.response.data.message || 'Failed to send OTP');
      setLoading(false);
      setMessage(null);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Left Section: Image */}
      <Box
        sx={{
          flex: 1,
          background: 'white',
          backgroundImage: `url('/assets/Lifeshield_login.png')`, // Replace with your actual image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Right Section: Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 600, alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
          {/* Logo */}
          <img
            src="/assets/lifeshield_logo.png"
            alt="logo"
            style={{
              textAlign: 'center',
              marginBottom: '50px',
              height: "90px"
            }}
          />

          {/* Login Form */}
          <Typography variant="h6" sx={{ mb: 2, width: "100%" }}>
            Forgot password
          </Typography>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(error)}
          />

          <Link to="/new-password" style={{ textDecoration: 'none', width: "100%" }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ paddingY: 1.2, 
                marginTop: 2, 
                backgroundColor: "#438EF2",
                '&:hover': {
                  backgroundColor: '#438EF2',
                }, 
              }}
              // onClick={handleSubmit}
              disabled={loading}
              
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send'}
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
