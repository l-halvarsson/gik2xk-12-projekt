//Denna komponent kommer visa mer information om produkten
//Om man klickar på en produkt visas all information 

import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import placeholderImage from "../assets/placeholder.png";

function ProductItemLarge({ product }) {
  if (!product) return null;

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <CardMedia
        component="img"
        height="400"
        image={product.imageUrl || placeholderImage}
        alt={`Bild på ${product.title}`}
      />
      <CardContent>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {product.price} SEK
        </Typography>
        <Typography variant="body1">{product.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default ProductItemLarge;