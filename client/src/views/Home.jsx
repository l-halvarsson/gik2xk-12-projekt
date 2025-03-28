import React from "react";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import bannerImage from "../assets/homepage.png";

// Första sidan
function Home() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Vänster sektion med text och knapp */}
      <Grid 
        item
        xs={12}
        md={5}
        sx={{
          bgcolor: "#F6F5F0",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: "4rem",

        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 500 }}>
          CHIC <br /> REVIVAL
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#F5F5DC",
            borderRadius: 5,
            padding: "10px 20px",
            color: "gray",
          }}
        >
          Shop Collection
        </Button>
      </Grid>

      {/* Höger sektion med bild */}
      <Grid item xs={12} md={7} sx={{ height: "100%" }}>
        <Box
          component="img"
          src={bannerImage}
          alt="Fashion Banner"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
        
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Home;