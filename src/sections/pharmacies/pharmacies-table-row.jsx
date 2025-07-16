import { useState } from 'react';
import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import ClaimsHistory from './claim-history';

// import Label from 'src/components/label';

export default function PharmacyTableRow({ index, name, phone, email, location, claims, row }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell component="th" scope="row" sx={{ paddingLeft: 5 }}>
        {index}
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell>{phone}</TableCell>

      <TableCell>{email}</TableCell>

      <TableCell>{location}</TableCell>

      <TableCell align="left" href={claims}>
        <Typography
          onClick={handleOpen}
          sx={{
            cursor: 'pointer',
            position: 'relative',
            fontSize: '15px',
            width: '38px',
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '0%',
              height: '.8px',
              backgroundColor: 'currentColor',
              transition: 'width 0.3s ease-in-out',
            },
            '&:hover::after': {
              width: '100%',
            },
          }}
        >
          View
        </Typography>
      </TableCell>
      <ClaimsHistory handleOpen={handleOpen} handleClose={handleClose} open={open} data={row} />
    </TableRow>
  );
}

PharmacyTableRow.propTypes = {
  index: PropTypes.number,
  name: PropTypes.any,
  email: PropTypes.any,
  phone: PropTypes.any,
  location: PropTypes.string,
  claims: PropTypes.any,
  row: PropTypes.any,
};
