import axios from 'axios';
import {useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TablePagination from '@mui/material/TablePagination';

import { useAuth } from 'src/useAuth';

import Scrollbar from 'src/components/scrollbar';
import Loader from 'src/components/Loader/Loader';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import ClaimsTableRow from '../claims-table-row';
import ClaimsTableHead from '../claims-table-head';
import ClaimsTableToolbar from '../claims-table-toolbar';
// import NewClaimsTableToolbar from '../newClaims-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function OrdersView() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filterStatus, setFilterStatus] = useState('');

  const [filterDate, setFilterDate] = useState(null);

  const handleFilterByDate = (date) => {
    setFilterDate(date); // Update the date filter
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleFilterStatusChange = (status) => {
    setFilterStatus(status);
    // Update the filter status
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
 

  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

   const { auth } = useAuth(); // Get token from context
 


   const [error, setError] = useState(null);


  useEffect(() => {

    if (!auth.token) return; // Prevent API call if no token

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "https://lifelinebackend.onrender.com/api/admin/orders?page=1",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setOrdersData(data.data.orders || []); // Adjust based on API response
      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [auth.token]);

  const dataFiltered = applyFilter({
    inputData: ordersData.filter((claim) => {
      const matchesStatus = filterStatus === '' || claim.status === filterStatus;
      const matchesDate = !filterDate || claim.date === filterDate;

      return matchesStatus && matchesDate;
    }),
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-");
  };

 
  if (loading) return <Container
  sx={{
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Loader />
</Container>;

if (error) return(
<Container
  sx={{
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
Error: {error}
</Container>

);



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
        <Typography variant="h3">Orders</Typography>

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

      <Card>
        <ClaimsTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          onFilterStatusChange={handleFilterStatusChange}
          onDateFilterChange={handleFilterByDate}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ClaimsTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'id', label: 'ID' },
                  { id: 'name', label: "Customer's Name" },
                  { id: 'pharmacy', label: 'Pharmacy' },
                  { id: 'medication', label: 'Medication' },
                  { id: 'date', label: 'Date' },
                  { id: 'paymentMethod', label: 'Payment Method' },
                  { id: 'status', label: 'Status' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <ClaimsTableRow
                      key={row.id}
                      index={page * rowsPerPage + index + 1}
                      name={row.customerName}
                      date={formatDate(row.date)}
                      medication={row.medications}
                      pharmacy={row.pharmacy}
                      paymentMethod={row.paymentMethod}
                      status={row.status}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, ordersData.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={ordersData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
