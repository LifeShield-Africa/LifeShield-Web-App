// import axios from 'axios';
// import { useState, useEffect } from 'react';

// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Menu from '@mui/material/Menu';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import { useAuth } from 'src/useAuth';

// import Loader from 'src/components/Loader/Loader';

// import SalesMade from '../SalesMade';
// import MonthlyEarning from '../MonthlyEarning';
// import ActiveCustomers from '../ActiveCustomers';
// import DashboardMetrics from '../DashboardMetrics';

// export default function DashboardView() {
//   const { auth } = useAuth(); // Get token from context
//   const [dashboardCard, setDashboardCard] = useState([]);
//   // const [pharmacy, setPharmacy] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!auth.token) return; // Prevent API call if no token

//     const fetchMedications = async () => {
//       try {
//         const response = await axios.get(
//           'https://lifelinebackend.onrender.com/api/admin/dashboard',
//           {
//             headers: { Authorization: `Bearer ${auth.token}` },
//           }
//         );
//         // const pharmaciesResponse = await axios.get(
//         //   "https://lifelinebackend.onrender.com/api/admin/pharmacies",
//         //   {
//         //     headers: { Authorization: `Bearer ${auth.token}` },
//         //   }
//         // );
//         setDashboardCard(response.data.data.subscriptions);
//         // setPharmacy(pharmaciesResponse.data.data.pharmacies);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMedications();
//   }, [auth.token]);

//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   if (loading) return <Container
//   sx={{
//     flex: '1',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }}
// >
//   <Loader />
// </Container>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <Container maxWidth="xl">
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mb: 4,
//         }}
//       >
//         <Typography variant="h3" sx={{ mb: 4 }}>
//           Hi, John 👋
//         </Typography>

//         <Button
//           variant="contained"
//           endIcon={<ExpandMoreIcon />}
//           sx={{
//             backgroundColor: '#FABE24',
//             color: '#fff',
//             fontWeight: '400',
//             p: 1.2,

//             '&:hover': {
//               backgroundColor: '#FABE24',
//             },
//           }}
//           aria-controls={open ? 'basic-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? 'true' : undefined}
//           onClick={handleClick}
//         >
//           Download Report
//         </Button>

//         <Menu
//           id="basic-menu"
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           MenuListProps={{
//             'aria-labelledby': 'basic-button',
//           }}
//           sx={{
//             mt: 1,
//             ml: 5,
//           }}
//         >
//           <MenuItem
//             onClick={handleClose}
//             sx={{
//               gap: 1,
//             }}
//           >
//             <img alt="icon" src="/assets/icons/reports/excel.svg" />
//             <Typography>Excel</Typography>
//           </MenuItem>

//           <MenuItem
//             onClick={handleClose}
//             sx={{
//               gap: 1,
//             }}
//           >
//             <img alt="icon" src="/assets/icons/reports/pdf.svg" />
//             <Typography>PDF</Typography>
//           </MenuItem>
//         </Menu>
//       </Box>

//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardMetrics
//             title="Basic"
//             color="#00AC4F"
//             total={dashboardCard.Basic}
//             trend="increased"
//             percent_change={37.8}
//             subtext="this month"
//             icon={<img alt="icon" src="/assets/icons/dashboard/basic.svg" />}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardMetrics
//             title="Standard"
//             color="#FABE24"
//             total={dashboardCard.Standard || '0'}
//             trend="decreased"
//             percent_change={2}
//             subtext="this month"
//             icon={<img alt="icon" src="/assets/icons/dashboard/standard.svg" />}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardMetrics
//             title="Premium"
//             color="#D0004B"
//             total={dashboardCard.Premium}
//             trend="increased"
//             percent_change={11}
//             subtext="this week"
//             icon={<img alt="icon" src="/assets/icons/dashboard/premium.svg" />}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <MonthlyEarning
//             title="Overview"
//             subheader="Monthly Earning"
//             chart={{
//               labels: [
//                 '01/01/2024',
//                 '02/01/2024',
//                 '03/01/2024',
//                 '04/01/2024',
//                 '05/01/2024',
//                 '06/01/2024',
//                 '07/01/2024',
//                 '08/01/2024',
//                 '09/01/2024',
//                 '10/01/2024',
//                 '11/01/2024',
//               ],
//               series: [
//                 {
//                   name: 'Earnings',
//                   type: 'column',
//                   fill: 'solid',
//                   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//                 },
//                 // {
//                 //   name: 'Team B',
//                 //   type: 'area',
//                 //   fill: 'gradient',
//                 //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//                 // },
//                 // {
//                 //   name: 'Team C',
//                 //   type: 'line',
//                 //   fill: 'solid',
//                 //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//                 // },
//               ],
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} md={6} lg={8}>
//           <SalesMade
//             title="Sales Made"
//             subheader=""
//             chart={{
//               labels: [
//                 '01/01/2024',
//                 '02/01/2024',
//                 '03/01/2024',
//                 '04/01/2024',
//                 '05/01/2024',
//                 '06/01/2024',
//                 '07/01/2024',
//                 '08/01/2024',
//               ],
//               series: [
//                 {
//                   name: 'Sales Made',
//                   type: 'area',
//                   fill: 'gradient',
//                   data: [50, 70, 90, 140, 160, 140, 100, 70],
//                 },
//               ],
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} md={6} lg={4}>
//           <ActiveCustomers
//             title="Customers"
//             subheader="Customers that buys products"
//             chart={{
//               series: [
//                 { label: 'Active', value: 4344 },
//                 { label: 'Not Active', value: 5435 },
//               ],
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }


import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Iconify from 'src/components/iconify';

import SalesMade from '../SalesMade';
import MonthlyEarning from '../MonthlyEarning';
import ActiveCustomers from '../ActiveCustomers';
import DashboardMetrics from '../DashboardMetrics';

export default function DashboardView() {
  // Static data for dashboard cards
  const dashboardCard = {
    Basic: 1250,
    Standard: 750,
    Premium: 350
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="xl" >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 10,
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          Hello, Admin 👋
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: -3,
          }}
        >
          <Button
            variant="contained"
            endIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#438EF2',
              color: '#fff',
              fontWeight: '400',
              p: 1.2,

              '&:hover': {
                backgroundColor: '#438EF2',
              },
            }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Download Report
          </Button>

          <OutlinedInput
                    // value={filterName}
                    // onChange={onFilterName}
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
                      marginLeft: 2,
                      minWidth: 220,
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                      },
                    }}
                  />
        </Box>

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
        <Box
          sx={{
            display: "flex",
            width: "100%",
            backgroundColor: "#fff",
            marginBottom: 3,
          }}
        >
        <Grid item xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Devices"
            color="#438EF2"
            total={dashboardCard.Basic}
            trend="increased"
            percent_change={37.8}
            subtext="this month"
            icon={<img alt="icon" src="/assets/icons/dashboard/devises.svg" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Customers"
            color="#438EF2"
            total={dashboardCard.Standard}
            trend="decreased"
            percent_change={2}
            subtext="this month"
            icon={<img alt="icon" src="/assets/icons/dashboard/customers.svg" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <DashboardMetrics
            title="Earning"
            color="#438EF2"
            total={dashboardCard.Premium}
            trend="increased"
            percent_change={11}
            subtext="this week"
            icon={<img alt="icon" src="/assets/icons/dashboard/earning.svg" />}
          />
        </Grid>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 3
          }}
        >
          <Box
            sx={{
              width: "63%"
            }}
          >
            <Grid item xs={12}>
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
                  ],
                }}
              />
            </Grid>
          </Box>

          {/* <Box
            sx={{
              width: "100%"
            }}
          > */}
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
          {/* </Box> */}
        </Box>

        <Box
          sx={{
            width: "94%",
          }}
        >
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
        </Box>

        
      </Grid>
    </Container>
  );
}