import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SalesMade from '../SalesMade';
import MonthlyEarning from '../../dashboard/MonthlyEarning';
import ActiveCustomers from '../../dashboard/ActiveCustomers';
import DashboardMetrics from '../../dashboard/DashboardMetrics';

export default function ReportsView() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h3">Reports</Typography>

        <Button
          variant="contained"
          endIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: '#FABE24',
            color: '#fff',
            fontWeight: '400',
            p: 1.2,

            '&:hover': {
              backgroundColor: '#FABE24',
            },
          }}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Download Report
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{
            mt: 1,
            ml: 5,
          }}
        >
          <MenuItem
            onClick={handleClose}
            sx={{
              gap: 1,
            }}
          >
            <img alt="icon" src="/assets/icons/reports/excel.svg" />
            <Typography>Excel</Typography>
          </MenuItem>

          <MenuItem
            onClick={handleClose}
            sx={{
              gap: 1,
            }}
          >
            <img alt="icon" src="/assets/icons/reports/pdf.svg" />
            <Typography>PDF</Typography>
          </MenuItem>
        </Menu>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Earning"
            total={198000}
            trend="increased"
            percent_change="37.8"
            subtext="this month"
            icon={<img alt="icon" src="/assets/icons/dashboard/earning.svg" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Balance"
            total={2400}
            trend="decreased"
            percent_change="2"
            subtext="this month"
            icon={<img alt="icon" src="/assets/icons/dashboard/balance.svg" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Total Sales"
            total={89000}
            trend="increased"
            percent_change="11"
            subtext="this week"
            icon={<img alt="icon" src="/assets/icons/dashboard/sales.svg" />}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <MonthlyEarning
            title="Overview"
            subheader="Monthly Earning"
            chart={{
              labels: [
                '01/01/2024',
                '02/01/2024',
                '03/01/2024',
                '04/01/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024',
                '08/01/2024',
                '09/01/2024',
                '10/01/2024',
                '11/01/2024',
              ],
              series: [
                {
                  name: 'Earnings',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                // {
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                // {
                //   name: 'Team C',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <ActiveCustomers
            title="Customers"
            subheader="Customers that buys products"
            chart={{
              series: [
                { label: 'Active', value: 4344 },
                { label: 'Not Active', value: 5435 },
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <SalesMade
            title="Sales Made"
            subheader=""
            chart={{
              labels: [
                '01/01/2024',
                '02/01/2024',
                '03/01/2024',
                '04/01/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024',
                '08/01/2024',
              ],
              series: [
                {
                  name: 'Sales Made',
                  type: 'area',
                  fill: 'gradient',
                  data: [50, 70, 90, 140, 160, 140, 100, 70],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
