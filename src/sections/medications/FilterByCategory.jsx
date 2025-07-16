import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

export default function FilterByCategory({
  onFilterCategoryChange,
  medications,
  category,
  setCategory,
}) {
  const [details, setDetails] = React.useState([]);

  React.useEffect(() => {
    // Extract unique categories
    const uniqueData = [...new Set(medications.map((data) => data.category))];
    setDetails(uniqueData);
  }, [medications]);

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    onFilterCategoryChange(selectedCategory); // Call the parent callback
  };

  return (
    <Box
      sx={{
        border: '1px solid #dddddd',
        borderRadius: 1,
        pl: 2,
        color: 'text.disabled',
        minWidth: 220,
        display: 'flex',
        alignItems: 'center',
        background: '#F8F9FD',
      }}
    >
      <Typography>Filter by:</Typography>
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
          value={category}
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
            <em>Category</em>
          </MenuItem>
          {details.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
          {/* <MenuItem value="denied">Denied</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}

FilterByCategory.propTypes = {
  onFilterCategoryChange: PropTypes.func,
  medications: PropTypes.array,
  category: PropTypes.string,
  setCategory: PropTypes.string,
};
