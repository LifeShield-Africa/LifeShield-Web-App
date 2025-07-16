// import axios from 'axios';
// import { useState, useEffect } from 'react';

// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Table from '@mui/material/Table';
// import Container from '@mui/material/Container';
// import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

// import { useAuth } from 'src/useAuth';

// import Scrollbar from 'src/components/scrollbar';
// import Loader from 'src/components/Loader/Loader';

// import TableNoData from '../table-no-data';
// import TableEmptyRows from '../table-empty-rows';
// import MedicationsTableRow from '../medications-table-row';
// import MedicationsTableHead from '../medications-table-head';
// import { emptyRows, applyFilter, getComparator } from '../utils';
// import MedicationsTableToolbar from '../medications-table-toolbar';

// export default function MedicationsView() {
//   const { auth } = useAuth(); // Get token from context
//   const [medicationsData, setMedicationsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!auth.token) return; // Prevent API call if no token

//     const fetchMedications = async () => {
//       try {
//         const response = await axios.get(
//           'https://lifelinebackend.onrender.com/api/admin/medications?page=1',
//           {
//             headers: { Authorization: `Bearer ${auth.token}` },
//           }
//         );
//         setMedicationsData(response.data.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMedications();
//   }, [auth.token]);

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

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const handleFilterByName = (event) => {
//     setPage(0);
//     setFilterName(event.target.value);
//   };

//   const handleDeleteRow = (id) => {
//     setMedicationsData((prevList) => prevList.filter((item) => item.id !== id));
//   };

//   const [category, setCategory] = useState('');

//   const dataFiltered = applyFilter({
//     inputData: medicationsData,
//     comparator: getComparator(order, orderBy),
//     filterName,
//   }).filter((item) => (category ? item.category === category : true));

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
//         <Typography variant="h3">Medications</Typography>
//       </Stack>

//       <Card>
//         <MedicationsTableToolbar
//           medications={medicationsData}
//           filterName={filterName}
//           onFilterName={handleFilterByName}
//           category={category}
//           setCategory={setCategory}
//         />

//         <Scrollbar>
//           <TableContainer sx={{ overflow: 'unset' }}>
//             <Table sx={{ minWidth: 800 }}>
//               <MedicationsTableHead
//                 order={order}
//                 orderBy={orderBy}
//                 numSelected={selected.length}
//                 onRequestSort={handleSort}
//                 headLabel={[
//                   { id: 'name', label: 'Medication Name' },
//                   { id: 'category', label: 'Category' },
//                   { id: 'stock', label: 'Stock' },
//                   { id: 'price', label: 'Price' },
//                   { id: 'total_sales', label: 'Total Sales' },
//                 ]}
//               />
//               <TableBody>
//                 {dataFiltered
//                   ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row, index) => (
//                     <MedicationsTableRow
//                       key={row.id}
//                       id={row.id}
//                       medication={row}
//                       name={row.name}
//                       category={row.category}
//                       stock={row.stock}
//                       price={row.price}
//                       image={row.img}
//                       total_sales={row.totalSales}
//                       onDelete={handleDeleteRow}
//                       selected={selected.indexOf(row.name) !== -1}
//                       handleClick={(event) => handleClick(event, row.name)}
//                     />
//                   ))}

//                 <TableEmptyRows
//                   height={77}
//                   emptyRows={emptyRows(page, rowsPerPage, medicationsData.length)}
//                 />

//                 {notFound && <TableNoData query={filterName} />}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Scrollbar>

//         <TablePagination
//           page={page}
//           component="div"
//           count={medicationsData.length}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handleChangePage}
//           rowsPerPageOptions={[5, 10, 25]}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Card>
//     </Container>
//   );
// }


import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import MedicationsTableRow from '../medications-table-row';
import MedicationsTableHead from '../medications-table-head';
import { emptyRows, applyFilter, getComparator } from '../utils';
import MedicationsTableToolbar from '../medications-table-toolbar';

export default function MedicationsView() {
  // Initial static medications data
  const initialMedicationsData = [
    {
      id: 1,
      name: 'Paracetamol',
      category: 'Pain Relief',
      stock: 150,
      price: 5.99,
      totalSales: 1200,
      img: '/assets/images/products/product-1.jpg'
    },
    {
      id: 2,
      name: 'Ibuprofen',
      category: 'Pain Relief',
      stock: 200,
      price: 7.50,
      totalSales: 950,
      img: '/assets/images/products/product-2.jpg'
    },
    {
      id: 3,
      name: 'Amoxicillin',
      category: 'Antibiotic',
      stock: 75,
      price: 12.99,
      totalSales: 600,
      img: '/assets/images/products/product-3.jpg'
    },
    {
      id: 4,
      name: 'Loratadine',
      category: 'Antihistamine',
      stock: 180,
      price: 8.25,
      totalSales: 850,
      img: '/assets/images/products/product-4.jpg'
    },
    {
      id: 5,
      name: 'Omeprazole',
      category: 'Antacid',
      stock: 90,
      price: 10.75,
      totalSales: 700,
      img: '/assets/images/products/product-5.jpg'
    },
    {
      id: 6,
      name: 'Cetirizine',
      category: 'Antihistamine',
      stock: 120,
      price: 6.99,
      totalSales: 1100,
      img: '/assets/images/products/product-6.jpg'
    },
    {
      id: 7,
      name: 'Aspirin',
      category: 'Pain Relief',
      stock: 250,
      price: 4.50,
      totalSales: 1500,
      img: '/assets/images/products/product-7.jpg'
    },
    {
      id: 8,
      name: 'Vitamin C',
      category: 'Supplement',
      stock: 300,
      price: 9.99,
      totalSales: 2000,
      img: '/assets/images/products/product-8.jpg'
    }
  ];

  // State for medications data that can be modified
  const [medicationsData, setMedicationsData] = useState(initialMedicationsData);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [category, setCategory] = useState('');

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

  const handleDeleteRow = (id) => {
    setMedicationsData((prevList) => prevList.filter((item) => item.id !== id));
  };

  const dataFiltered = applyFilter({
    inputData: medicationsData,
    comparator: getComparator(order, orderBy),
    filterName,
  }).filter((item) => (category ? item.category === category : true));

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h3">Medications</Typography>
      </Stack>

      <Card>
        <MedicationsTableToolbar
          medications={medicationsData}
          filterName={filterName}
          onFilterName={handleFilterByName}
          category={category}
          setCategory={setCategory}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <MedicationsTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: 'Medication Name' },
                  { id: 'category', label: 'Category' },
                  { id: 'stock', label: 'Stock' },
                  { id: 'price', label: 'Price' },
                  { id: 'total_sales', label: 'Total Sales' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <MedicationsTableRow
                      key={row.id}
                      id={row.id}
                      medication={row}
                      name={row.name}
                      category={row.category}
                      stock={row.stock}
                      price={row.price}
                      image={row.img}
                      total_sales={row.totalSales}
                      onDelete={handleDeleteRow}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, medicationsData.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={medicationsData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}