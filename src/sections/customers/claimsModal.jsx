import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ClaimsModal({ open, setOpen, handleOpen, row }) {
  const handleClose = () => setOpen(false);

  const testArray = [
    { id: 1, pharmacyName: 'Afia Pharma', date: '31-07-2024', drug: 'Ibuprofen', price: '$5' },
    { id: 1, pharmacyName: 'Afia Pharma', date: '31-07-2024', drug: 'Ibuprofen', price: '$5' },
  ];

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardContent>
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h3" sx={{ mb: 5 }} gutterBottom>
                Claims History
              </Typography>
              <IconButton onClick={handleOpen}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {row.name}
            </Typography>

            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <img src="/assets/icons/customers/logo.svg" alt="logo" />
              </Grid>
              <Grid item>
                <Typography variant="body1" fontWeight="bold">
                  LifeLine Subscription
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We are your LifeLine
                </Typography>
              </Grid>
            </Grid>

            {/* Progress and Balance */}
            <LinearProgress
              variant="determinate"
              value={50}
              sx={{
                my: 1,
                marginTop: 3,
                backgroundColor: '#e0e0e0', // Background track
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#FBAE24', // Progress color
                },
              }}
            />
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="body2">Privilege: 68,000RWF</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="#FBAE24">
                  Balance: 34,000RWF
                </Typography>
              </Grid>
            </Grid>

            {/* Table */}
            <TableContainer sx={{ marginTop: 5 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Pharmacy Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Medication</TableCell>
                    <TableCell>Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testArray.map((index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>Afia Pharma</TableCell>
                      <TableCell>31-07-2024</TableCell>
                      <TableCell>Ibuprofen</TableCell>
                      <TableCell>5$</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Pagination count={32} color="primary" />
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}

ClaimsModal.propTypes = {
  open: PropTypes.func,
  setOpen: PropTypes.func,
  row: PropTypes.any,
  handleOpen: PropTypes.func,
};
