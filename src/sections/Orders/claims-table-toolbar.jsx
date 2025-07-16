import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { DatePicker } from '@mui/x-date-pickers';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Iconify from 'src/components/iconify';

import DropFilter from './DropFilter';

export default function ClaimsTableToolbar({
  filterName,
  onFilterName,
  onFilterStatusChange,
  onDateFilterChange,
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  // const [filterDate, setFilterDate] = useState('');
  // Function to format date
  const formatSelectedDate = (date) => {
    if (date) {
      const day = date.date(); // Use getDate() for the day
      const month = date.month() + 1; // Use getMonth() for the month
      const year = date.year(); // Use getFullYear() for the year
      return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
    }
    return '';
  };

  // Handle date change
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    const formattedDate = formatSelectedDate(newValue); // Pass the newValue directly
    console.log('this is the calendar', formattedDate); // Log the formatted date as '09-01-2025'
    onDateFilterChange(formattedDate); // Notify parent component
  };

  // const handleDateFilterChange = (date) => {
  //   setFilterDate(date);
  // };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 3, 0, 3),
      }}
    >
      <Box>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          All Orders
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
          sx={{
            backgroundColor: '#f8f9fd',
            borderRadius: '8px',
            pr: 2,
            minWidth: 220,
            '& .MuiOutlinedInput-input': {
              padding: '10px 14px',
            },
          }}
        />

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={selectedDate}
            onChange={handleDateChange} // Call the handler function
            sx={{
              backgroundColor: '#f8f9fd',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                fontSize: '14px',
                height: '42px',
                width: '150px',
              },
              '& .MuiInputLabel-shrink': {
                color: 'red',
              },
              '& .MuiInputBase-input': {
                color: 'black',
                fontWeight: 'bold',
              },
              '& .MuiFormLabel-root': {
                color: 'gray',
                marginTop: '-6px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ccc',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
            }}
          />
        </LocalizationProvider>

        <DropFilter onFilterStatusChange={onFilterStatusChange} />
      </Box>
    </Toolbar>
  );
}

ClaimsTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterStatusChange: PropTypes.func,
  onDateFilterChange: PropTypes.func,
};
