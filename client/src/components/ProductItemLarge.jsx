//Denna komponent kommer visa mer information om produkten
//Om man klickar på en produkt visas all information 

import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import placeholderImage from "../assets/placeholder.png";
import { addProductToCart } from '../services/CartService';



function ProductItemLarge({ product, userId, /*updateCart*/ }){
  const handleAdd = async () => {
    try {
      await addProductToCart(userId, product.id, 1);
      //if (updateCart) updateCart();
    } catch (err) {
      console.error('Fel vid lägg till i varukorg:', err);
      alert('Kunde inte lägga till i varukorg.');
    }
  };

  return (
<Card
  sx={{
    maxWidth: 700,
    margin: "auto",
    mt: 4,
    display: "flex",         // Gör layouten horisontell
    flexDirection: "row",    // Lägg bild till vänster, innehåll till höger
    alignItems: "center",    // Vertikal centrering (valfritt)
  }}
>
  <CardMedia
    component="img"
    sx={{
      width: 300,            // Bestäm bredd på bilden
      height: "auto",
      objectFit: "cover",
    }}
    image={product.imageUrl || placeholderImage}
    alt={`Bild på ${product.title}`}
  />

  <CardContent sx={{ flex: 1 }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom>
      {product.title}
    </Typography>
    <Typography variant="h6" color="text.secondary" gutterBottom>
      {product.price} SEK
    </Typography>
    <Typography variant="body1" gutterBottom>
      {product.description}
    </Typography>
    <Button
  variant="contained"
  onClick={handleAdd}
  sx={{
    backgroundColor: "#F5F5DC",
    color: "gray",
    "&:hover": {
      backgroundColor: "#e0e0c7" // valfri hover-effekt
    }
  }}
>
  Lägg till i varukorg
</Button>
  </CardContent>
</Card>
  );
}

export default ProductItemLarge;