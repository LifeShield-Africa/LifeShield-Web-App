import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import ViewDetails from './ViewDetails';

export default function MedicationsTableRow({
  id,
  name,
  category,
  stock,
  price,
  total_sales,
  onDelete,
  medication,
  image,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const [opener, setOpener] = useState(false);
  const handleOpener = () => setOpener(!opener);

  return (
    <TableRow
      hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ position: 'relative', marginBottom: '16px' }}
    >
      <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component="img"
          src={image}
          alt="drug"
          sx={{
            width: 100,
            height: 'auto',
            borderRadius: 1,
          }}
        />
        <Box
          sx={{
            ml: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            {name.length > 20 ? `${name.slice(0, 20)}...` : name}
          </Typography>
          <Typography
            onClick={handleOpener}
            sx={{
              cursor: 'pointer',
              marginTop: 0.5,
              color: '#868686',
              fontSize: '14px',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            View Full Details
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{stock} in stock</TableCell>
      <TableCell
        sx={{
          fontWeight: 'bold',
        }}
      >
        {price}
      </TableCell>
      <TableCell>{total_sales}</TableCell>
      {isHovered && (
        <Box
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <IconButton color="error" onClick={() => onDelete(id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <ViewDetails
        opener={opener}
        setOpener={setOpener}
        handleOpener={handleOpener}
        medication={medication}
      />
    </TableRow>
  );
}

MedicationsTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  stock: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  total_sales: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  medication: PropTypes.any,
  image: PropTypes.any.isRequired,
};
