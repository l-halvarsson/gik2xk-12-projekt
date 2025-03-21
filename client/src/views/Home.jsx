import React from "react";
import { Box, Button, Typography, Container, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center" sx={{ height: "100vh" }}>
          {/* Vänster sektion med text och knapp */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ fontWeight: 500 }}>
              CHIC <br /> REVIVAL
            </Typography>
            <Button 
              component={Link}
              to="/products"
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#89A2B4", borderRadius: 5, padding: "10px 20px" }}
            >
              Shop Collection
            </Button>
          </Grid>
  
          {/* Höger sektion med bild */}
          <Grid item xs={12} md={6}>

          {/* Förberett för bild
            <Box
            component="img"
            src="https://source.unsplash.com/random/800x600?fashion" // Byt ut mot din egen bild
            alt="Fashion Banner"
            sx={{ width: "100%", borderRadius: 2 }}
          /> */}
          
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  export default Home;

  