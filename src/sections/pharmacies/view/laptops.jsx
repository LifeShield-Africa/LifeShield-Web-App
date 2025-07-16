"use client"

import { useState } from "react"

import { Close, Visibility, ChevronLeft, ChevronRight } from "@mui/icons-material"
import {
  Box,
  Card,
  Table,
  Paper,
  Modal,
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

// Mock data for phones table with iPhone images
const mockPhones = [
  {
    id: 1,
    customerName: "John Smith",
    brand: "Apple",
    model: "iPhone 15",
    dateAdded: "2023-09-15",
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780378",
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780378",
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-green?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780378",
    ],
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    brand: "Samsung",
    model: "Galaxy S23",
    dateAdded: "2023-02-01",
    images: [
      "https://images.samsung.com/is/image/samsung/p6pim/levant/2302/gallery/levant-galaxy-s23-s911-sm-s911bzadeue-534851043?$650_519_PNG$",
      "https://images.samsung.com/is/image/samsung/p6pim/levant/2302/gallery/levant-galaxy-s23-s911-sm-s911bzwdeue-534851056?$650_519_PNG$",
    ],
  },
  {
    id: 3,
    customerName: "Mike Davis",
    brand: "Google",
    model: "Pixel 8",
    dateAdded: "2023-10-04",
    images: [
      "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXNjQQGaUh7ra2t4fL502kGXijGvi3t3aXmnFNnzrs3hBxB5=w526-h296-rw",
    ],
  },
  {
    id: 4,
    customerName: "Emily Wilson",
    brand: "OnePlus",
    model: "11 5G",
    dateAdded: "2023-01-09",
    images: [
      "https://oasis.opstatics.com/content/dam/oasis/page/2023/global/products/11/specs/marble-odyssey/11-marble-odyssey-back.png",
      "https://oasis.opstatics.com/content/dam/oasis/page/2023/global/products/11/specs/titan-black/11-titan-black-back.png",
      "https://oasis.opstatics.com/content/dam/oasis/page/2023/global/products/11/specs/eternal-green/11-eternal-green-back.png",
      "https://oasis.opstatics.com/content/dam/oasis/page/2023/global/products/11/specs/marble-odyssey/11-marble-odyssey-front.png",
    ],
  },
  {
    id: 5,
    customerName: "David Brown",
    brand: "Xiaomi",
    model: "13 Pro",
    dateAdded: "2023-02-26",
    images: [
      "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1676877064.89453762.png",
      "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1676877065.12304688.png",
    ],
  },
]

export default function LaptopsPage() {
  const [phones, ] = useState(mockPhones)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPhone, setSelectedPhone] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleView = (phone) => {
    setSelectedPhone(phone)
    setCurrentImageIndex(0)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedPhone(null)
    setCurrentImageIndex(0)
  }

  const handlePreviousImage = () => {
    if (selectedPhone && selectedPhone.images.length > 1) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedPhone.images.length - 1 : prev - 1))
    }
  }

  const handleNextImage = () => {
    if (selectedPhone && selectedPhone.images.length > 1) {
      setCurrentImageIndex((prev) => (prev === selectedPhone.images.length - 1 ? 0 : prev + 1))
    }
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

      {/* Image Modal */}
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
            width: 600,
            maxWidth: "90vw",
            maxHeight: "80vh",
            outline: "none",
            position: "relative",
            backgroundColor: "white",
            borderRadius: 2,
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
            <>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "400px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    maxHeight: "380px",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                  image={selectedPhone.images[currentImageIndex]}
                  alt={`${selectedPhone.brand} ${selectedPhone.model}`}
                  onError={(e) => {
                    console.log("Image failed to load:", selectedPhone.images[currentImageIndex])
                    e.target.src = "/placeholder.svg?height=400&width=300"
                  }}
                />

                {/* Navigation arrows - only show if more than one image */}
                {selectedPhone.images.length > 1 && (
                  <>
                    <IconButton
                      onClick={handlePreviousImage}
                      sx={{
                        position: "absolute",
                        left: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                        },
                        zIndex: 2,
                      }}
                    >
                      <ChevronLeft />
                    </IconButton>
                    <IconButton
                      onClick={handleNextImage}
                      sx={{
                        position: "absolute",
                        right: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                        },
                        zIndex: 2,
                      }}
                    >
                      <ChevronRight />
                    </IconButton>
                  </>
                )}
              </Box>

              <CardContent sx={{ textAlign: "center", backgroundColor: "white" }}>
                <Typography variant="h6" component="div" sx={{ color: "black" }}>
                  {selectedPhone.brand} {selectedPhone.model}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Date Added: {selectedPhone.dateAdded}
                </Typography>
                {selectedPhone.images.length > 1 && (
                  <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                    Image {currentImageIndex + 1} of {selectedPhone.images.length}
                  </Typography>
                )}
              </CardContent>
            </>
          )}
        </Card>
      </Modal>
    </Box>
  )
}
