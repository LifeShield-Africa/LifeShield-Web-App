import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

import AddMedication from './AddMedications';
import FilterByCategory from './FilterByCategory';

export default function MedicationsTableToolbar({
  filterName,
  onFilterName,
  medications,
  category,
  setCategory,
}) {
  const [open, setOpen] = useState(false); // Fixed: Start with false

  const handleOpen = () => setOpen((prev) => !prev); // Fixed: Proper toggle

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
          Medications
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FilterByCategory medications={medications} category={category} setCategory={setCategory} />
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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            backgroundColor: '#FABE24',
            color: 'white',
            borderRadius: '8px',
            py: 1.6,
            '&:hover': {
              backgroundColor: '#faa924',
            },
          }}
        >
          Add Medication
        </Button>
        <AddMedication open={open} setOpen={setOpen} />
      </Box>
    </Toolbar>
  );
}

MedicationsTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  medications: PropTypes.array,
  category: PropTypes.string,
  setCategory: PropTypes.func,
};
