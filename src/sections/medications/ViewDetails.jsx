import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 6,
};

export default function ViewDetails({ medication, opener, handleOpener }) {
  return (
    <div>
      <Modal
        open={opener}
        onClose={handleOpener}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              mb: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              {medication.name}
            </Typography>
            <CloseIcon cursor="pointer" onClick={handleOpener} />
          </Box>
          <Box mb={5}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Drug Number
                </Typography>
                <Typography>{medication.drugNo}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Group
                </Typography>
                <Typography>{medication.category}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Left In Stock
                </Typography>
                <Typography>{medication.stock}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box mt={4} mb={5}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              How To Use
            </Typography>
            <Typography>{medication.howToUse}</Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

ViewDetails.propTypes = {
  opener: PropTypes.bool.isRequired,
  handleOpener: PropTypes.func,
  medication: PropTypes.object.isRequired,
};
