import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, IconButton, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import placeholderImage from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";


// Visar en klickbar produktkort med bild, titel och pris. Navigerar till produktens detaljsida vid klick.
function ProductItemSmall({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigera till detaljsidan för produkten
    navigate(`/products/${product.id}`);
  };


  return (
    <Card sx={{ maxWidth: 345, position: "relative", borderRadius: 2 }} onClick={handleClick}>
      <CardMedia
        component="img"
        height="300"
        image={product.imageUrl || placeholderImage}
        alt={`Bild på ${product.title}`}
      />

      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {product.title}
        </Typography>
        <Typography variant="body1">{product.price} SEK</Typography>
      </CardContent>
    </Card>
  );
}

export default ProductItemSmall;