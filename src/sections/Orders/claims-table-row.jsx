import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

export default function UserTableRow({
  index,
  name,
  date,
  pharmacy,
  medication,
  paymentMethod,
  status = 'None',
}) {
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
          {pharmacy.length > 12 ? `${pharmacy.substring(0, 12)}...` : pharmacy}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {medication}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {date}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {paymentMethod}
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
            sx={{
              backgroundColor:
                (status === 'success' && '#E6FFE6') || // Background for "success"
                (status === 'rejected' && '#F7DDD8') || // Background for "rejected"
                (status === 'pending' && '#FFF4E6') || // Background for "pending"
                '#FFF',
              color:
                (status === 'success' && '#008000') || // Text color for "success"
                (status === 'rejected' && '#FF0000') || // Text color for "rejected"
                (status === 'pending' && '#FF8C00') || // Text color for "pending"
                '#000',
              border:
                (status === 'success' && '1px solid #008000') || // Border for "success"
                (status === 'rejected' && '1px solid #FF0000') || // Border for "rejected"
                (status === 'pending' && '1px solid #FF8C00') || // Border for "pending"
                'none',
              padding: '4px 12px',
              borderRadius: '4px',
              display: 'inline-block',
            }}
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
  paymentMethod: PropTypes.any,
  pharmacy: PropTypes.any,
  status: PropTypes.string,
};
