import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

export default function ClaimsHistory({ handleClose, open, data }) {
  const [month, setMonth] = useState('December');
  const [year, setYear] = useState('2024');
  const [page, setPage] = useState(1);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Sample data
  const rows = [
    { id: 1, customer: 'Jane Cooper', date: '31-07-2024', medication: 'Ibuprofen', cost: '5$' },
    { id: 2, customer: 'Jane Cooper', date: '31-07-2024', medication: 'Ibuprofen', cost: '5$' },
    { id: 3, customer: 'Jane Cooper', date: '31-07-2024', medication: 'Ibuprofen', cost: '5$' },
    { id: 4, customer: 'Jane Cooper', date: '31-07-2024', medication: 'Ibuprofen', cost: '5$' },
    { id: 5, customer: 'Jane Cooper', date: '31-07-2024', medication: 'Ibuprofen', cost: '5$' },
  ];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width: '70%',
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper elevation={3} sx={style}>
        <Box
          mb={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Claims History
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="body1" color="#ACACAC">
              Pharmacy
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {data.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="#ACACAC">
              Money Owed
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="primary">
              $2.4k
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Select value={month} onChange={handleMonthChange} size="small" sx={{ minWidth: 100 }}>
              <MenuItem value="December">December</MenuItem>
              <MenuItem value="November">November</MenuItem>
              <MenuItem value="October">October</MenuItem>
            </Select>
            <Select value={year} onChange={handleYearChange} size="small" sx={{ minWidth: 100 }}>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Table Section */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Medication</TableCell>
                <TableCell>Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.medication}</TableCell>
                  <TableCell>{row.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Pagination
            count={32}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            siblingCount={1}
          />
        </Box>
      </Paper>
    </Modal>
  );
}

ClaimsHistory.propTypes = {
  handleClose: PropTypes.any,
  open: PropTypes.any,
  data: PropTypes.any,
};
