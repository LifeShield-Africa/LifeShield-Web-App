import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

import { useAuth } from 'src/useAuth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  gap: 2,
};

export default function AddMedication({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  const { auth } = useAuth();
  const token = auth?.token || '';

  const [formData, setFormData] = useState({
    drug_name: '',
    price: '',
    dose: '',
    category: '',
    description: '',
    prescription_required: false,
    drone_delivery: false,
    quantity: '',
    drug_image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      drug_image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const response = await axios.post(
        'https://lifelinebackend.onrender.com/api/admin/medications/create',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Medication Created:', response.data);
      alert('Medication added successfully!');
      setOpen(false); // Close modal on success
    } catch (error) {
      console.error('Error creating medication:', error);
      alert('Failed to add medication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Box>
          <Typography
            id="modal-title"
            variant="h5"
            sx={{
              marginBottom: 3,
            }}
          >
            Create Medication
          </Typography>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 18,
              top: 18,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                name="drug_name"
                label="Medication Name"
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="price"
                label="Price"
                type="number"
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField name="dose" label="Dose" onChange={handleChange} fullWidth required />
            </Grid>

            <Grid item xs={8}>
              <TextField
                name="category"
                label="Category"
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="quantity"
                label="Quantity"
                type="number"
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={6}>
  <TextField
    fullWidth
    value={formData.drug_image ? formData.drug_image.name : ""}
    placeholder="Select a file"
    onClick={() => document.getElementById("upload-file").click()}
    InputProps={{ readOnly: true }}
  />
  <input
    type="file"
    id="upload-file"
    onChange={handleFileChange}
    required
    style={{ display: "none" }} // Hide default file input
  />
</Grid>


            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={<AddIcon />}
                color="primary"
                disabled={loading}
                sx={{
                  backgroundColor: '#FABE24',
                  color: 'white',
                  borderRadius: '8px',
                  mt: 3,
                  py: 1.6,
                  '&:hover': {
                    backgroundColor: '#FABE24',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Create Medication'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

AddMedication.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
