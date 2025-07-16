import axios from 'axios';
// import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
// import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/useAuth';

import Iconify from 'src/components/iconify';

export default function LoginView() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const lowerCaseEmail = email.toLowerCase();
      const lowerCasePassword = password.toLowerCase();

      const response = await axios.post('https://lifelinebackend.onrender.com/api/admin/login', {
        email: lowerCaseEmail,
        password: lowerCasePassword,
      });

      const newToken = response.data.data.token;

      if (newToken) {
        login(newToken); // ✅ Correctly stores token and userId

        setTimeout(() => {
          router.push(`/`);
          setLoading(false);
        }, 2000);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Box
        sx={{
          flex: 1,
          background: 'white',
          backgroundImage: `url('/assets/Lifeshield_login.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

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
            style={{ textAlign: 'center', marginBottom: '50px', height: "90px" }}
          />

          <Typography variant="h5" sx={{ mb: 2, width: "100%" }}>
            Log In
          </Typography>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={Boolean(error)}
            helperText={error && 'Invalid email or password'}
          />

          <TextField
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={Boolean(error)}
            helperText={error && 'Invalid email or password'}
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

          <FormControlLabel control={<Checkbox />} label="Remember me" sx={{ marginY: 1, width: "100%" }} />

          <Link to="/" style={{ textDecoration: 'none', width: "100%" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="success"
              fullWidth
              sx={{
                paddingY: 1.2,
                marginTop: 2,
                background: '#438EF2',
                '&:hover': {
                  backgroundColor: '#438EF2',
                },
              }}
              // onClick={handleSubmit}
              disabled={loading}
            >
              {/* {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Log In'} */}
              Log In
            </Button>
          </Link>

          <Link to="/reset-password/email" style={{ textDecoration: 'none', width: "100%" }}>
            <Typography
              variant="body1"
              sx={{  marginTop: 2, color: '#438EF2', width: "100%" }}
            >
              Forgot password?
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
