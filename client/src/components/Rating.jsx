import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { Typography, Box } from "@mui/material";

const Rating = ({ productId }) => {
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/products/${productId}/average-rating`)
      .then((response) => {
        setAverageRating(response.data.averageRating);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Kunde inte hämta betyg:", error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <Typography>Laddar betyg...</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">
        Medelbetyg: {averageRating ? averageRating : "Inga betyg ännu"}
      </Typography>
    </Box>
  );
};

export default Rating;

