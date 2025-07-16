import { useState } from 'react';
import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

import ClaimsModal from './claimsModal';

export default function UserTableRow({ index, name, phone, email, status, claims, row }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell component="th" scope="row" sx={{ paddingLeft: 5 }}>
          {index}
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {phone}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {email}
          </Typography>
        </TableCell>

        <TableCell>
          <Label
            color={
              (status === 'active' && 'success') || (status === 'expired' && 'error') || 'warning'
            }
          >
            <Typography
              sx={{
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}
            >
              {status}
            </Typography>
          </Label>
        </TableCell>

        <TableCell align="left" href={claims}>
          <Typography
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
            <Typography onClick={handleOpen} variant="subtitle2" noWrap>
              View
            </Typography>
          </Typography>
        </TableCell>
        <ClaimsModal open={open} setOpen={setOpen} handleOpen={handleOpen} row={row} />
      </TableRow>

      {/* <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}

UserTableRow.propTypes = {
  index: PropTypes.number,
  name: PropTypes.any,
  email: PropTypes.any,
  phone: PropTypes.any,
  status: PropTypes.string,
  claims: PropTypes.any,
  row: PropTypes.any,
};
