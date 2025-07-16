
import { useState } from "react"

import { Close, Visibility } from "@mui/icons-material"
import {
  Box,
  Card,
  Grid,
  Table,
  Paper,
  Modal,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
  TableContainer,
} from "@mui/material"

import DashboardMetrics from "../../dashboard/DashboardMetrics"

// Mock data for phones table with single iPhone image
const mockPhones = [
  {
    id: 1,
    customerName: "John Smith",
    brand: "Apple",
    model: "iPhone 15 Pro",
    dateAdded: "2023-09-15",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780378",
    imei: "352099001761481",
    purchaseDate: "13/10/2024",
    purchasePrice: "$1200",
    coverageStartDate: "Feb 10, 2025",
    coverageEndDate: "Feb 10, 2026",
    duration: "12 months",
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    brand: "Samsung",
    model: "Galaxy S23",
    dateAdded: "2023-02-01",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/levant/2302/gallery/levant-galaxy-s23-s911-sm-s911bzadeue-534851043?$650_519_PNG$",
    imei: "352099001761482",
    purchaseDate: "15/01/2024",
    purchasePrice: "$899",
    coverageStartDate: "Jan 15, 2025",
    coverageEndDate: "Jan 15, 2026",
    duration: "12 months",
  },
  {
    id: 3,
    customerName: "Mike Davis",
    brand: "Google",
    model: "Pixel 8",
    dateAdded: "2023-10-04",
    image:
      "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXNjQQGaUh7ra2t4fL502kGXijGvi3t3aXmnFNnzrs3hBxB5=w526-h296-rw",
    imei: "352099001761483",
    purchaseDate: "04/10/2024",
    purchasePrice: "$699",
    coverageStartDate: "Oct 04, 2024",
    coverageEndDate: "Oct 04, 2025",
    duration: "12 months",
  },
  {
    id: 4,
    customerName: "Emily Wilson",
    brand: "OnePlus",
    model: "11 5G",
    dateAdded: "2023-01-09",
    image:
      "https://oasis.opstatics.com/content/dam/oasis/page/2023/global/products/11/specs/marble-odyssey/11-marble-odyssey-back.png",
    imei: "352099001761484",
    purchaseDate: "09/01/2024",
    purchasePrice: "$749",
    coverageStartDate: "Jan 09, 2025",
    coverageEndDate: "Jan 09, 2026",
    duration: "12 months",
  },
  {
    id: 5,
    customerName: "David Brown",
    brand: "Xiaomi",
    model: "13 Pro",
    dateAdded: "2023-02-26",
    image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1676877064.89453762.png",
    imei: "352099001761485",
    purchaseDate: "26/02/2024",
    purchasePrice: "$899",
    coverageStartDate: "Feb 26, 2025",
    coverageEndDate: "Feb 26, 2026",
    duration: "12 months",
  },
]

export default function PhonesPage() {
  const [phones, ] = useState(mockPhones)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPhone, setSelectedPhone] = useState(null)

  const handleView = (phone) => {
    setSelectedPhone(phone)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedPhone(null)
  }

  return (
    <Box>
      {/* Dashboard Metrics */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor: "#fff",
          marginBottom: 3,
        }}
      >
        <Box sx={{ flex: 1, width: "100%" }}>
          <DashboardMetrics
            title="Phone Brands"
            total={8}
            icon={<img alt="icon" src="/assets/icons/customers/categories.svg" />}
            sx={{ height: "100%" }}
          />
        </Box>
        <Box sx={{ flex: 1, width: "100%" }}>
          <DashboardMetrics
            title="Phone Models"
            total={42}
            icon={<img alt="icon" src="/assets/icons/customers/brands.svg" />}
            sx={{ height: "100%" }}
          />
        </Box>
        <Box sx={{ flex: 1, width: "100%" }}>
          <DashboardMetrics
            title="Phone Users"
            total={1250}
            icon={<img alt="icon" src="/assets/icons/customers/users.svg" />}
            sx={{ height: "100%" }}
          />
        </Box>
      </Box>

      {/* Phones Table */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Phone Inventory
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="phones table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phones.map((phone) => (
              <TableRow key={phone.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {phone.id}
                </TableCell>
                <TableCell>{phone.customerName}</TableCell>
                <TableCell>{phone.brand}</TableCell>
                <TableCell>{phone.model}</TableCell>
                <TableCell>{phone.dateAdded}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" aria-label="view" onClick={() => handleView(phone)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Device Details Modal */}
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
            width: 700,
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

          {selectedPhone && (
            <CardContent sx={{ p: 3 }}>
              {/* Customer Name */}
              <Typography variant="h5" component="div" sx={{ mb: 3, fontWeight: "bold" }}>
                {selectedPhone.customerName}
              </Typography>

              {/* Phone Image and Device Information */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Phone Image */}
                <Grid item xs={12} md={5}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      height: "100%",
                      minHeight: "400px",
                      objectFit: "contain",
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                    }}
                    image={selectedPhone.image}
                    alt={`${selectedPhone.brand} ${selectedPhone.model}`}
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=400&width=200"
                    }}
                  />
                </Grid>

                {/* Device Information */}
                <Grid item xs={12} md={7}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Device */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Device
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "300" }}>
                        {selectedPhone.brand} {selectedPhone.model}
                      </Typography>
                    </Box>

                    <Divider />

                    {/* IMEI/Serial Number */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        IMEI/Serial Number
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "300" }}>
                        {selectedPhone.imei}
                      </Typography>
                    </Box>

                    <Divider />

                    {/* Purchase Date */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Purchase Date
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "300" }}>
                        {selectedPhone.purchaseDate}
                      </Typography>
                    </Box>

                    <Divider />

                    {/* Purchase Price */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Purchase Price
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "300" }}>
                        {selectedPhone.purchasePrice}
                      </Typography>
                    </Box>

                    <Divider />

                    {/* Coverage Start Date */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Coverage Start Date
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "300" }}>
                        {selectedPhone.coverageStartDate}
                      </Typography>
                    </Box>

                    <Divider />

                    {/* Coverage End Date */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Coverage End Date
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "300" }}>
                        {selectedPhone.coverageEndDate}
                      </Typography>
                    </Box>

                    <Divider />

                    {/* Duration */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Duration
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "300" }}>
                        {selectedPhone.duration}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Uploaded Documents Section */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Uploaded Documents
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
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      Purchase Receipt
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Uploaded on {selectedPhone.purchaseDate}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          )}
        </Card>
      </Modal>
    </Box>
  )
}
