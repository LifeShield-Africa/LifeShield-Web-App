"use client"

import { useState } from "react"
import { Box, Card, Grid, Stack, Button, Container, Typography } from "@mui/material"

import TVsPage from "./tvs"
import PhonesPage from "./phones"
import DronesPage from "./drones"
import LaptopsPage from "./laptops"
import WatchesPage from "./watches"
import TabletsPage from "./tablets"
import DashboardMetrics from "../../dashboard/DashboardMetrics"

export default function ProductCategoriesPage() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [metricsData] = useState({
    totalCategories: 6,
    totalBrands: 23,
    totalDevices: 15,
  })

  const productCategories = [
    {
      name: "Phones",
      image: "/assets/images/products/phones.png",
      component: <PhonesPage />,
    },
    {
      name: "Laptops",
      image: "/assets/images/products/laptops.png",
      component: <LaptopsPage />,
    },
    {
      name: "Watches",
      image: "/assets/images/products/watches.png",
      component: <WatchesPage />,
    },
    {
      name: "Drones",
      image: "/assets/images/products/drones.png",
      component: <DronesPage />,
    },
    {
      name: "Tablets",
      image: "/assets/images/products/tablets.png",
      component: <TabletsPage />,
    },
    {
      name: "TVs",
      image: "/assets/images/products/tvs.png",
      component: <TVsPage />,
    },
  ]

  const handleCategoryClick = (category) => {
    setLoading(true)
    // Small delay to show loading state if needed
    setTimeout(() => {
      setActiveCategory(category)
      setLoading(false)
    }, 300)
  }

  const renderCategoryMetrics = () => {
    if (!activeCategory) {
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginBottom: 3,
            backgroundColor: "#fff",
            // gap: 2, // Add spacing between items
            // padding: 2, // Add some padding around the metrics
          }}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            {" "}
            {/* This Box will take 1/3 of the space */}
            <DashboardMetrics
              title="Categories"
              total={metricsData.totalCategories}
              icon={<img alt="icon" src="/assets/icons/customers/categories.svg" />}
              sx={{ height: "100%" }} // Make the metric fill the height
            />
          </Box>

          <Box sx={{ flex: 1, width: "100%" }}>
            {" "}
            {/* This Box will take 1/3 of the space */}
            <DashboardMetrics
              title="Brands"
              total={metricsData.totalBrands}
              icon={<img alt="icon" src="/assets/icons/customers/brands.svg" />}
              sx={{ height: "100%" }} // Make the metric fill the height
            />
          </Box>

          <Box sx={{ flex: 1, width: "100%" }}>
            {" "}
            {/* This Box will take 1/3 of the space */}
            <DashboardMetrics
              title="All Devices"
              total={metricsData.totalDevices}
              icon={<img alt="icon" src="/assets/icons/customers/alldevices.svg" />}
              sx={{ height: "100%" }} // Make the metric fill the height
            />
          </Box>
        </Box>
      )
    }
    return null
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4">{activeCategory ? activeCategory.name : "Product Categories"}</Typography>
        {activeCategory && (
          <Button variant="outlined" onClick={() => setActiveCategory(null)}>
            Back to Categories
          </Button>
        )}
      </Stack>

      <Box sx={{ mb: 3 }}>{renderCategoryMetrics()}</Box>

      <Card sx={{  bgcolor: "transparent", boxShadow: "none" }}>
        {!activeCategory ? (
          <Grid container spacing={3}>
            {productCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                    transition: "transform 0.3s",
                    cursor: "pointer",
                    maxWidth: 300,
                    margin: "0 auto",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                  onClick={() => handleCategoryClick(category)}
                >
                  <Box
                    component="img"
                    src={category.image}
                    alt={category.name}
                    sx={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      right: 8,
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Added background for better text visibility
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        lineHeight: 1.2,
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>{loading ? <Box sx={{ p: 4, textAlign: "center" }}>Loading...</Box> : activeCategory.component}</Box>
        )}
      </Card>
    </Container>
  )
}
