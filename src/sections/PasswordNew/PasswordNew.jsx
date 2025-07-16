import axios from 'axios';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

export default function PasswordNew() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Basic Validation
    if (!otp || otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const lowerNewPassword = newPassword.toLocaleLowerCase();
      const lowerConfirmPassword = newPassword.toLocaleLowerCase();

      const response = await axios.patch(
        'https://lifelinebackend.onrender.com/api/pharmacys/reset-password/dashboard',
        { otp, newPassword: lowerNewPassword, confirmPassword: lowerConfirmPassword }
      );

      setSuccess(response.data.message || 'Password reset successful! Redirecting...');
      setLoading(false);

      setTimeout(() => {
        router.push('/login'); // Redirect to the login page or a relevant route
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Left Section: Image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url('/assets/Lifeshield_login.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Right Section: Form */}
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
          <img
            src="/assets/lifeshield_logo.png"
            alt="logo"
            style={{
              textAlign: 'center',
              marginBottom: '50px',
            }}
          />

          <Typography variant="h6" sx={{ mb: 2, width: "100%" }}>
            Reset Password
          </Typography>
          {/* <Typography color="#00A76F" sx={{ mt: 2 }}>
            An OTP has been sent to your email
          </Typography> */}

          {/* {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" sx={{ mt: 2 }}>
              {success}
            </Typography>
          )} */}

          {/* <TextField
            fullWidth
            name="otp"
            label="Enter OTP"
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
            sx={{ marginTop: 2 }}
          /> */}
          <TextField
            fullWidth
            name="newPassword"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
            sx={{ marginTop: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={confirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            sx={{ marginTop: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setConfirm(!confirm)} edge="end">
                    <Iconify icon={confirm ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Reset Password'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
