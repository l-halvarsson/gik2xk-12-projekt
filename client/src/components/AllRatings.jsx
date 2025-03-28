import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";




// Komponent för att visa alla betyg
const AllRatings = ({ productId }) => {
const [ratings, setRatings] = useState([]);



  // Hämta alla betyg när komponenten laddas
  useEffect(() => {
    axios
      .get(`/products/${productId}/ratings`)
      .then((response) => {
        setRatings(response.data); // Sätt betygen i state
      })
      .catch((error) => console.error("Fel vid hämtning av betyg:", error));
  }, [productId]);


  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Alla betyg
      </Typography>

      {ratings.length === 0 ? (
        <Typography color="text.secondary">Det finns inga betyg ännu.</Typography>
      ) : (
        <Grid container spacing={2}>
          {ratings.map((rating, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={2} sx={{ bgcolor: "#fdfaf4" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    ⭐ {rating.rating} / 5
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(rating.createdAt).toLocaleDateString("sv-SE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AllRatings;
