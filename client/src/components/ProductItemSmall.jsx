/*Denna komponent kommer visa lite mindre information om produkten*/
import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import placeholderImage from "../assets/placeholder.png";


function ProductItemSmall({ product }) {
  return (
    <Card sx={{ maxWidth: 345, position: "relative", borderRadius: 2 }}>
    
      {/* Produktbild */}
      <CardMedia
        component="img"
        height="300"
        image={product.image || placeholderImage}
        alt={`Bild på ${product.title}`}

      />
    
     {/* Pris */}
     <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {product.price} SEK
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductItemSmall;