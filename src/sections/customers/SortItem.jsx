import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

export default function SortItem({ onFilterStatusChange }) {
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
    onFilterStatusChange(selectedStatus);
    // Call the parent callback to filter by status
  };

  return (
    <Box
      sx={{
        border: '1px solid #dddddd',
        borderRadius: 1,
        pl: 2,
        color: 'text.disabled',
        width: 180,
        display: 'flex',
        alignItems: 'center',
        background: '#F8F9FD',
      }}
    >
      <Typography>Sort by:</Typography>
      <FormControl
        sx={{
          '& .MuiOutlinedInput-root': {
            borderColor: '#F8F9FD',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F8F9FD',
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#F8F9FD',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F8F9FD',
            },
          },
        }}
      >
        <Select
          value={status}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            height: 42,
          }}
          InputProps={{
            endAdornment: null, // Removes any adornment
          }}
        >
          <MenuItem value="">
            <em>Status</em>
          </MenuItem>
          <MenuItem value="locked">Locked</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="expired">Expired</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

SortItem.propTypes = {
  onFilterStatusChange: PropTypes.func,
};
