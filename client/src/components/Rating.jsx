import React from "react";
import { Typography, Box } from "@mui/material";

const Rating = ({ averageRating }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">
        Medelbetyg: {averageRating ? averageRating : "Inga betyg ännu"}
      </Typography>
    </Box>
  );
};

export default Rating;
