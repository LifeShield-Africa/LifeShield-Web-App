// import axios from 'axios';
// import { useState, useEffect } from 'react';

// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Table from '@mui/material/Table';
// import Container from '@mui/material/Container';
// import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

// import { useAuth } from 'src/useAuth';
// // import { users } from 'src/_mock/user';

// import Scrollbar from 'src/components/scrollbar';
// import Loader from 'src/components/Loader/Loader';

// import TableNoData from '../table-no-data';
// import TableEmptyRows from '../table-empty-rows';
// import UserTableRow from '../customers-table-row';
// import UserTableHead from '../customers-table-head';
// import UserTableToolbar from '../customers-table-toolbar';
// import DashboardMetrics from '../../dashboard/DashboardMetrics';
// import { emptyRows, applyFilter, getComparator } from '../utils';

// export default function UserPage() {
//   const { auth } = useAuth(); // Get token from context
//   const [customers, setCustomers] = useState([]);
//   const [allCustomers, setAllCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!auth.token) return; // Prevent API call if no token

//     const fetchMedications = async () => {
//       try {
//         const response = await axios.get(
//           'https://lifelinebackend.onrender.com/api/admin/customers/cards',
//           {
//             headers: { Authorization: `Bearer ${auth.token}` },
//           }
//         );
//         const AllCustomer = await axios.get(
//           'https://lifelinebackend.onrender.com/api/admin/customers?page=1',
//           {
//             headers: { Authorization: `Bearer ${auth.token}` },
//           }
//         );

//         setCustomers(response.data.data);
//         setAllCustomers(AllCustomer.data.data.customers);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMedications();
//   }, [auth.token]);

//   console.log(customers)

//   const [page, setPage] = useState(0);

//   const [order, setOrder] = useState('asc');

//   const [selected, setSelected] = useState([]);

//   const [orderBy, setOrderBy] = useState('name');

//   const [filterName, setFilterName] = useState('');

//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleSort = (event, id) => {
//     const isAsc = orderBy === id && order === 'asc';
//     if (id !== '') {
//       setOrder(isAsc ? 'desc' : 'asc');
//       setOrderBy(id);
//     }
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
//   };

//   const [filterStatus, setFilterStatus] = useState('');

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleFilterStatusChange = (status) => {
//     setFilterStatus(status);
//     // Update the filter status
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const handleFilterByName = (event) => {
//     setPage(0);
//     setFilterName(event.target.value);
//   };

//   const dataFiltered = applyFilter({
//     inputData: allCustomers,
//     comparator: getComparator(order, orderBy),
//     filterName,
//   });

//   const notFound = !dataFiltered.length && !!filterName;

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
//     <Container>
//       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
//         <Typography variant="h3">Customers</Typography>
//       </Stack>

//       <Grid container spacing={3} sx={{ mb: 5 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardMetrics
//             title="All Customers"
//             total={customers.totalCustomers.amount}
//             trend="increased"
//             percent_change={customers.totalCustomers.percentageChange}
//             subtext="this month"
//             moneyValue={false}
//             icon={<img alt="icon" src="/assets/icons/customers/customers.svg" />}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardMetrics
//             title="Members"
//             total={customers.members.amount}
//             trend="decreased"
//             percent_change={customers.members.percentageChange}
//             subtext="this month"
//             moneyValue={false}
//             icon={<img alt="icon" src="/assets/icons/customers/members.svg" />}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardMetrics
//             title="Active Now"
//             total={customers.activeNow.amount}
//             trend=""
//             percent_change=""
//             subtext=""
//             moneyValue={false}
//             metricsVariant="avatar"
//             icon={<img alt="icon" src="/assets/icons/customers/active.svg" />}
//           />
//         </Grid>
//       </Grid>

//       <Card>
//         <UserTableToolbar
//           filterName={filterName}
//           onFilterName={handleFilterByName}
//           onFilterStatusChange={handleFilterStatusChange}
//         />

//         <Scrollbar>
//           <TableContainer sx={{ overflow: 'unset' }}>
//             <Table sx={{ minWidth: 800 }}>
//               <UserTableHead
//                 order={order}
//                 orderBy={orderBy}
//                 numSelected={selected.length}
//                 onRequestSort={handleSort}
//                 headLabel={[
//                   { id: 'id', label: 'ID' },
//                   { id: 'name', label: 'Customer Name' },
//                   { id: 'phone', label: 'Phone Number' },
//                   { id: 'email', label: 'Email' },
//                   { id: 'status', label: 'Status' },
//                   { id: 'claims', label: 'Claim History' },
//                 ]}
//               />
//               <TableBody>
//                 {dataFiltered
//                   ?.filter((claim) => filterStatus === '' || claim.status === filterStatus)
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row, index) => (
//                     <UserTableRow
//                       key={row.id}
//                       index={page * rowsPerPage + index + 1}
//                       name={row.name}
//                       phone={row.phoneNumber}
//                       email={row.email}
//                       status={row.status}
//                       avatarUrl={row.avatarUrl}
//                       row={row}
//                       claims={row.claims}
//                       selected={selected.indexOf(row.name) !== -1}
//                       handleClick={(event) => handleClick(event, row.name)}
//                     />
//                   ))}

//                 <TableEmptyRows
//                   height={77}
//                   emptyRows={emptyRows(page, rowsPerPage, allCustomers.length)}
//                 />

//                 {notFound && <TableNoData query={filterName} />}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Scrollbar>

//         <TablePagination
//           page={page}
//           component="div"
//           count={allCustomers.length}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handleChangePage}
//           rowsPerPageOptions={[5, 10, 25]}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Card>
//     </Container>
//   );
// }







import { useState } from "react"

import { Close } from "@mui/icons-material"
import {
  Box,
  Card,
  Grid,
  Table,
  Paper,
  Modal,
  Select,
  Button,
  Divider,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  CardMedia,
  TextField,
  Typography,
  IconButton,
  CardContent,
  FormControl,
  TableContainer,
  TablePagination,
} from "@mui/material"

// Mock data for customers table
const mockCustomers = [
  {
    id: 1,
    customerName: "John Smith",
    phoneNumber: "(225) 555-0118",
    email: "john.smith@email.com",
    status: "Active",
    dateJoined: "2023-09-15",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    address: "123 Main St, New York, NY 10001",
    membershipType: "Premium",
    country: "USA",
    cardHolderName: "John Smith",
    cardNumber: "5261 4523 8584 9541",
    expiryDate: "06/2028",
    paymentMethodImage: "https://i.pinimg.com/564x/2e/1e/1e/2e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e.jpg", // Example Visa icon
    paymentMethodName: "Visa",
    insuredDevices: [
      {
        name: "iPhone 15 Pro",
        image: "https://i.pinimg.com/564x/1a/2b/3c/1a2b3c1a2b3c1a2b3c1a2b3c1a2b3c1a.jpg",
        claimsCount: 0,
      }, // iPhone 15 Pro
      {
        name: "Dell XPS 15",
        image: "https://i.pinimg.com/564x/2a/3b/4c/2a3b4c1a2b3c1a2b3c1a2b3c1a2b3c1a.jpg",
        claimsCount: 2,
      }, // Dell XPS 15
      {
        name: "Apple Watch Series 9",
        image: "https://i.pinimg.com/564x/3a/4b/5c/3a4b5c1a2b3c1a2b3c1a2b3c1a2b3c1a.jpg",
        claimsCount: 1,
      }, // Apple Watch
    ],
    claimsHistory: [
      { id: "C001", device: "Dell XPS 15", price: "$300", incident: "Screen Damage", date: "2024-01-10" },
      { id: "C002", device: "Dell XPS 15", price: "$150", incident: "Battery Issue", date: "2023-11-20" },
      { id: "C003", device: "Apple Watch Series 9", price: "$50", incident: "Strap Broken", date: "2023-10-05" },
    ],
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    phoneNumber: "(225) 555-0119",
    email: "sarah.johnson@email.com",
    status: "Active",
    dateJoined: "2023-02-01",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    membershipType: "Standard",
    country: "USA",
    cardHolderName: "Sarah Johnson",
    cardNumber: "4123 9876 5432 1098",
    expiryDate: "12/2026",
    paymentMethodImage: "https://i.pinimg.com/564x/4e/5f/6g/4e5f6g7h8e9d0e0e0e0e0e0e0e0e0e0e.jpg", // Example Mastercard icon
    paymentMethodName: "Mastercard",
    insuredDevices: [
      {
        name: "Samsung Galaxy S23",
        image: "https://i.pinimg.com/564x/5a/6b/7c/5a6b7c1a2b3c1a2b3c1a2b3c1a2b3c1a.jpg",
        claimsCount: 1,
      },
    ], // Samsung Galaxy
    claimsHistory: [
      { id: "C004", device: "Samsung Galaxy S23", price: "$200", incident: "Water Damage", date: "2024-01-25" },
    ],
  },
  {
    id: 3,
    customerName: "Mike Davis",
    phoneNumber: "(225) 555-0120",
    email: "mike.davis@email.com",
    status: "Inactive",
    dateJoined: "2023-10-04",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    address: "789 Pine St, Chicago, IL 60601",
    membershipType: "Basic",
    country: "Canada",
    cardHolderName: "Mike Davis",
    cardNumber: "6011 1234 5678 9012",
    expiryDate: "09/2025",
    paymentMethodImage: "https://i.pinimg.com/564x/6a/7b/8c/6a7b8c1a2b3c1a2b3c1a2b3c1a2b3c1a.jpg", // Example Discover icon
    paymentMethodName: "Discover",
    insuredDevices: [],
    claimsHistory: [],
  },
  {
    id: 4,
    customerName: "Emily Wilson",
    phoneNumber: "(225) 555-0121",
    email: "emily.wilson@email.com",
    status: "Active",
    dateJoined: "2023-01-09",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    address: "321 Elm Dr, Miami, FL 33101",
    membershipType: "Premium",
    country: "UK",
    cardHolderName: "Emily Wilson",
    cardNumber: "4567 8901 2345 6789",
    expiryDate: "03/2027",
    paymentMethodImage: "https://i.pinimg.com/564x/2e/1e/1e/2e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e.jpg", // Example Visa icon
    paymentMethodName: "Visa",
    insuredDevices: [
      {
        name: "Google Pixel 8",
        image: "https://i.pinimg.com/564x/7a/8b/9d/7a8b9d1a2b3c1a2b3c1a2b3c1a2b3c1a.jpg",
        claimsCount: 0,
      }, // Google Pixel
      {
        name: "MacBook Air",
        image: "https://i.pinimg.com/564x/8a/9b/0c/8a9b0c1a2b3c1a2b3c1a2b3c1a2b3c1a.jpg",
        claimsCount: 3,
      }, // MacBook Air
    ],
    claimsHistory: [
      { id: "C005", device: "MacBook Air", price: "$500", incident: "Liquid Spill", date: "2024-02-01" },
      { id: "C006", device: "MacBook Air", price: "$250", incident: "Keyboard Issue", date: "2023-12-15" },
      { id: "C007", device: "MacBook Air", price: "$100", incident: "Charger Fault", date: "2023-09-01" },
    ],
  },
  {
    id: 5,
    customerName: "David Brown",
    phoneNumber: "(225) 555-0122",
    email: "david.brown@email.com",
    status: "Active",
    dateJoined: "2023-02-26",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    address: "654 Maple Ln, Seattle, WA 98101",
    membershipType: "Standard",
    country: "Australia",
    cardHolderName: "David Brown",
    cardNumber: "5000 1122 3344 5566",
    expiryDate: "11/2029",
    paymentMethodImage: "https://i.pinimg.com/564x/9a/0b/1c/9a0b1c1a2b3c1a2b3c1a2b3c1a2b3c1a.jpg", // Example Maestro icon
    paymentMethodName: "Maestro",
    insuredDevices: [
      {
        name: "Xiaomi 13 Pro",
        image: "https://i.pinimg.com/564x/0a/1b/2c/0a1b2c1a2b3c1a2b3c1a2b3c1a2b3c1a.jpg",
        claimsCount: 0,
      },
    ], // Xiaomi
    claimsHistory: [],
  },
]

// Real profile images for active users
const activeUserImages = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
]

export default function CustomersPage() {
  const [customers, ] = useState(mockCustomers)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [sortBy, setSortBy] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // State for claims table pagination within the modal
  const [claimsPage, setClaimsPage] = useState(0)
  const [claimsRowsPerPage, setClaimsRowsPerPage] = useState(5)

  const handleView = (customer) => {
    setSelectedCustomer(customer)
    setModalOpen(true)
    setClaimsPage(0) // Reset claims table page when modal opens
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedCustomer(null)
  }

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClaimsPageChange = (event, newPage) => {
    setClaimsPage(newPage)
  }

  const handleClaimsRowsPerPageChange = (event) => {
    setClaimsRowsPerPage(Number.parseInt(event.target.value, 10))
    setClaimsPage(0)
  }

  // Filter and sort customers
  const filteredAndSortedCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNumber.includes(searchTerm)

    if (sortBy === "all" || sortBy === "") return matchesSearch
    if (sortBy === "active") return matchesSearch && customer.status === "Active"
    if (sortBy === "inactive") return matchesSearch && customer.status === "Inactive"
    // Assuming 'Locked' status might exist in real data, though not in mockCustomers
    if (sortBy === "locked") return matchesSearch && customer.status === "Locked"

    return matchesSearch
  })

  return (
    <Box>
      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Customers
      </Typography>
      {/* Dashboard Metrics */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor: "#fff",
          marginBottom: 3,
          gap: 2,
        }}
      >
        {/* All Customers */}
        <Box sx={{ flex: 1, width: "100%" }}>
          <Card
            sx={{
              p: 3,
              backgroundColor: "rgba(67, 142, 242, 0.1)",
              border: "1px solid rgba(67, 142, 242, 0.2)",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#438EF2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                <img
                  alt="icon"
                  src="/assets/icons/customers/customers.svg"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: "#438EF2", fontWeight: "medium" }}>
                All Customers
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              5,423
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ color: "#4caf50", mr: 0.5 }}>↗</Box>
              <Typography variant="body2" sx={{ color: "#4caf50", mr: 1 }}>
                16%
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                this month
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* Members */}
        <Box sx={{ flex: 1, width: "100%" }}>
          <Card
            sx={{
              p: 3,
              backgroundColor: "rgba(67, 142, 242, 0.1)",
              border: "1px solid rgba(67, 142, 242, 0.2)",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#438EF2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                <img
                  alt="icon"
                  src="/assets/icons/customers/members.svg"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: "#438EF2", fontWeight: "medium" }}>
                Members
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              75
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ color: "#f44336", mr: 0.5 }}>↘</Box>
              <Typography variant="body2" sx={{ color: "#f44336", mr: 1 }}>
                5%
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                this month
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* Active Now */}
        <Box sx={{ flex: 1, width: "100%" }}>
          <Card
            sx={{
              p: 3,
              backgroundColor: "rgba(67, 142, 242, 0.1)",
              border: "1px solid rgba(67, 142, 242, 0.2)",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#438EF2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                <img
                  alt="icon"
                  src="/assets/icons/customers/active.svg"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: "#438EF2", fontWeight: "medium" }}>
                Active Now
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              50
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {activeUserImages.map((imageUrl, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    marginLeft: index > 0 ? "-8px" : 0,
                    border: "2px solid white",
                    zIndex: 6 - index,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </Box>
          </Card>
        </Box>
      </Box>

      {/* Table Header with Search and Filter */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          All customers
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Search customers..."
            variant="outlined"
            sx={{ minWidth: 200 }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={sortBy} onChange={handleSortChange} displayEmpty>
              <MenuItem value="" disabled>
                <em>Sort by</em>
              </MenuItem>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="locked">Locked</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customers table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => (
              <TableRow key={customer.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {customer.id}
                </TableCell>
                <TableCell>{customer.customerName}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: customer.status === "Active" ? "#e8f5e8" : "#ffeaa7",
                      color: customer.status === "Active" ? "#2d5016" : "#b7950b",
                      fontSize: "0.75rem",
                      fontWeight: "medium",
                      display: "inline-block",
                    }}
                  >
                    {customer.status}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#438EF2",
                      cursor: "pointer",
                      fontWeight: "medium",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    onClick={() => handleView(customer)}
                  >
                    View
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          component="div"
          count={filteredAndSortedCustomers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#fafafa",
          }}
        />
      </TableContainer>

      {/* Customer Details Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 2,
        }}
      >
        <Card
          sx={{
            width: 800, // Increased width for more content
            maxWidth: "90vw",
            maxHeight: "90vh",
            outline: "none",
            position: "relative",
            backgroundColor: "white",
            borderRadius: 2,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {selectedCustomer && (
            <CardContent sx={{ p: 3 }}>
              {/* Customer Name at Top Left */}
              <Typography variant="h5" component="div" sx={{ mb: 3, fontWeight: "bold" }}>
                {selectedCustomer.customerName}
              </Typography>

              {/* General Info Section */}
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                General Info
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <span style={{ fontWeight: "bold" }}>Phone Number: </span>
                    <span style={{ fontWeight: "normal" }}>{selectedCustomer.phoneNumber}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <span style={{ fontWeight: "bold" }}>Email: </span>
                    <span style={{ fontWeight: "normal" }}>{selectedCustomer.email}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <span style={{ fontWeight: "bold" }}>Country: </span>
                    <span style={{ fontWeight: "normal" }}>{selectedCustomer.country}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Passport or ID
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      p: 2,
                      backgroundColor: "#f9f9f9",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#d32f2f",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                        PDF
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      Passport_ID.pdf
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ mb: 3 }} />

              {/* Bank Details Section */}
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Bank Details
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: "medium", mb: 1 }}>
                    Payment Method:
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img
                      src={selectedCustomer.paymentMethodImage || "/placeholder.svg"}
                      alt={selectedCustomer.paymentMethodName}
                      style={{ height: 30, width: 50, objectFit: "contain" }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      {selectedCustomer.paymentMethodName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <span style={{ fontWeight: "bold" }}>Card Holder&apos;s Name: </span>
                    <span style={{ fontWeight: "normal" }}>{selectedCustomer.cardHolderName}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <span style={{ fontWeight: "bold" }}>Card Number: </span>
                    <span style={{ fontWeight: "normal" }}>{selectedCustomer.cardNumber}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <span style={{ fontWeight: "bold" }}>Expiry Date: </span>
                    <span style={{ fontWeight: "normal" }}>{selectedCustomer.expiryDate}</span>
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ mb: 3 }} />

              {/* Insured Devices Section */}
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Insured Devices
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {selectedCustomer.insuredDevices.map((device, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Card
                      sx={{
                        p: 2,
                        boxShadow: 3,
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        height: "100%", // Ensure cards have equal height
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "contain",
                          mb: 1,
                        }}
                        image={device.image}
                        alt={device.name}
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=80&width=80"
                        }}
                      />
                      <Typography variant="subtitle1" sx={{ fontWeight: "medium", mb: 1 }}>
                        {device.name}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          color: "#438EF2",
                          borderColor: "#438EF2",
                          "&:hover": {
                            backgroundColor: "rgba(67, 142, 242, 0.04)",
                            borderColor: "#438EF2",
                          },
                        }}
                      >
                        {device.claimsCount} Claim{device.claimsCount !== 1 ? "s" : ""}
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ mb: 3 }} />

              {/* Claims Table Section */}
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Claim
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="claims table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Device</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Incident</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedCustomer.claimsHistory
                      .slice(claimsPage * claimsRowsPerPage, claimsPage * claimsRowsPerPage + claimsRowsPerPage)
                      .map((claim) => (
                        <TableRow key={claim.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                          <TableCell>{claim.id}</TableCell>
                          <TableCell>{claim.device}</TableCell>
                          <TableCell>{claim.price}</TableCell>
                          <TableCell>{claim.incident}</TableCell>
                          <TableCell>{claim.date}</TableCell>
                        </TableRow>
                      ))}
                    {selectedCustomer.claimsHistory.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} sx={{ textAlign: "center", py: 3 }}>
                          No claims history available.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  page={claimsPage}
                  component="div"
                  count={selectedCustomer.claimsHistory.length}
                  rowsPerPage={claimsRowsPerPage}
                  onPageChange={handleClaimsPageChange}
                  rowsPerPageOptions={[5, 10, 25]}
                  onRowsPerPageChange={handleClaimsRowsPerPageChange}
                  sx={{
                    borderTop: "1px solid #e0e0e0",
                    backgroundColor: "#fafafa",
                  }}
                />
              </TableContainer>
            </CardContent>
          )}
        </Card>
      </Modal>
    </Box>
  )
}
