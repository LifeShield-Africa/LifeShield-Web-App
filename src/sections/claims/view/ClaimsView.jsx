import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { claims } from 'src/_mock/claims';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import ClaimsTableRow from '../claims-table-row';
import ClaimsTableHead from '../claims-table-head';
import ClaimsTableToolbar from '../claims-table-toolbar';
import NewClaimsTableToolbar from '../newClaims-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function ClaimsView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterStatusChange = (status) => {
    setFilterStatus(status);
    // Update the filter status
  };

  const [filterStatus, setFilterStatus] = useState('');

  const [filterDate, setFilterDate] = useState(null);

  const handleFilterByDate = (date) => {
    setFilterDate(date); // Update the date filter
  };

  const dataFiltered = applyFilter({
    inputData: claims.filter((claim) => {
      const matchesStatus = filterStatus === '' || claim.status === filterStatus;
      const matchesDate = !filterDate || claim.date === filterDate;

      return matchesStatus && matchesDate;
    }),
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h3">Claims</Typography>
      </Stack>

      <Card
        sx={{
          mb: 9,
        }}
      >
        <NewClaimsTableToolbar filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ClaimsTableHead
                headLabel={[
                  { id: 'id', label: 'ID' },
                  { id: 'name', label: "Patient's Name" },
                  { id: 'date', label: 'Date' },
                  { id: 'medication', label: 'Medication' },
                  { id: 'cost', label: 'Cost' },
                  { id: 'submit', label: '' },
                ]}
              />
              <TableBody>
                {claims.slice(0, 2).map((row, index) => (
                  <ClaimsTableRow
                    key={row.id}
                    index={page * rowsPerPage + index + 1}
                    name={row.name}
                    date={row.date}
                    medication={row.medication}
                    cost={row.cost}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, claims.length)}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>

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
                  { id: 'name', label: "Patient's Name" },
                  { id: 'date', label: 'Date' },
                  { id: 'medication', label: 'Medication' },
                  { id: 'cost', label: 'Cost' },
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
                      name={row.name}
                      date={row.date}
                      medication={row.medication}
                      cost={row.cost}
                      status={row.status}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, claims.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={claims.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
