import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

export default function UserTableRow({ index, name, date, medication, cost, status = 'None' }) {
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

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {date}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {medication}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          ${cost}
        </Typography>
      </TableCell>

      {status === 'None' ? (
        <TableCell>
          <Button
            variant="outlined"
            sx={{
              border: '2px solid #0066CC',
              backgroundColor: '#E6F0FF',
              color: '#0066CC',
              padding: '4px 20px',
              fontSize: '16px',
              fontWeight: '500',
              '&:hover': {
                backgroundColor: '#CCE0FF',
                border: '2px solid #005BB5',
              },
            }}
          >
            Submit
          </Button>
        </TableCell>
      ) : (
        <TableCell>
          <Label
            color={
              (status === 'approved' && 'success') || (status === 'denied' && 'error') || 'warning'
            }
          >
            <Typography
              sx={{
                textTransform: 'capitalize',
                fontWeight: '500',
              }}
            >
              {status}
            </Typography>
          </Label>
        </TableCell>
      )}
    </TableRow>
  );
}

UserTableRow.propTypes = {
  index: PropTypes.number,
  name: PropTypes.any,
  date: PropTypes.any,
  medication: PropTypes.any,
  cost: PropTypes.any,
  status: PropTypes.string,
};
