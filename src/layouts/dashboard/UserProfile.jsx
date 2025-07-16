import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

// import { account as initialAccount } from 'src/_mock/account';

export default function UserProfile({ handleClose, pharmacy }) {
  console.log('this is pharm', pharmacy);

  // const [account, setAccount] = useState(initialAccount);
  const [buttonState, setButtonState] = useState('idle');
  const [avatarUrl, setAvatarUrl] = useState(pharmacy.avatar);

  const [pharmacyState, setPharmacyState] = useState(pharmacy);

  const handleChange = (field, value) => {
    setPharmacyState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result); // Update avatar URL
        // setAccount((prev) => ({
        //   ...prev,
        //   photoURL: reader.result, // Update account with new avatar URL
        // }));
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  const handleSave = async () => {
    setButtonState('loading');

    try {
      const response = await fetch(
        `https://lifelinebackend.onrender.com/api/pharmacys/${pharmacy.id}/update`,
        {
          method: 'PATCH',
          headers: {
            // 'Content-Type': 'application/json',
            // Authorization: `Bearer ${pharmacy.id}`, // Replace with your actual token
          },
          body: JSON.stringify({
            userName: pharmacy.userName,
            location: pharmacy.location,
            avatar: avatarUrl,
            // Add other fields as necessary
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to update pharmacy');

      setButtonState('done');
      alert('Pharmacy profile updated successfully!');
    } catch (error) {
      console.error('Error updating pharmacy:', error);
      alert('Failed to update pharmacy profile.');
      setButtonState('idle');
    }
  };

  const getButtonColor = (state) => {
    switch (state) {
      case 'done':
        return '#00AC4F';
      case 'loading':
        return 'gray';
      default:
        return '#00AC4F';
    }
  };

  const getHoverColor = (state) => {
    switch (state) {
      case 'done':
        return '#00853e';
      case 'loading':
        return 'gray'; // Same as loading color
      default:
        return '#00853e';
    }
  };

  const getButtonContent = (state) => {
    switch (state) {
      case 'loading':
        return <CircularProgress size={24} sx={{ color: 'white' }} />;
      case 'done':
        return 'Done';
      default:
        return 'Save changes';
    }
  };

  return (
    <Box
      sx={{
        width: 500,
        margin: 'auto',
        p: 4,
        borderRadius: 2,
        backgroundColor: '#fff',
        position: 'relative',
      }}
    >
      {/* Close Icon */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Avatar and Email */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Avatar src={avatarUrl} alt="Profile Picture" sx={{ width: 64, height: 64 }} />
          <IconButton
            component="label"
            sx={{
              position: 'absolute',
              bottom: '-5px',
              right: '-5px',
              color: 'black',
              background: 'white',
              boxShadow: '1px 1px 1px rgba(0,0,0,0.3)',
              '&:hover': { backgroundColor: 'white' },
            }}
          >
            <DriveFileRenameOutlineIcon
              sx={{
                fontSize: 15,
              }}
            />
            <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="subtitle1">{pharmacy.userName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {pharmacy.email}
          </Typography>
        </Box>
      </Box>
      <FormControl fullWidth sx={{ '& .MuiTextField-root': { mb: 3 } }}>
        <TextField
          label="email"
          variant="outlined"
          fullWidth
          defaultValue={pharmacy.email}
          disabled="true"
          // onChange={(e) => handleChange(key, Object.keys(rest)[0], e.target.value)}
        />
        <TextField
          label="User Name"
          variant="outlined"
          fullWidth
          value={pharmacyState.userName}
          onChange={(e) => handleChange('userName', e.target.value)}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={pharmacyState.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </FormControl>
      {/* Save Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          height: '50px',
          backgroundColor: getButtonColor(buttonState),
          '&:hover': { backgroundColor: getHoverColor(buttonState) },
        }}
        onClick={buttonState === 'done' ? handleClose : handleSave}
        disabled={buttonState === 'loading'}
      >
        {getButtonContent(buttonState)}
      </Button>
    </Box>
  );
}

UserProfile.propTypes = {
  handleClose: PropTypes.func,
  pharmacy: PropTypes.any,
};
