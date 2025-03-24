//Denna komponent kommer visa mer information om produkten
//Om man klickar på en produkt visas all information 

import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import placeholderImage from "../assets/placeholder.png";
import { addProductToCart } from "../services/CartService"; 




function ProductItemLarge({ product, userId }){
  if (!product) return null;


  const handleAddToCart = async () => {

    if (!userId) {
      alert("Du måste vara inloggad för att lägga till produkter i varukorgen.");
      return;
  }

  if (!product?.id) {
      alert("Produkten saknas eller har inget ID.");
      return;
  }
  
    try {
      const amount = 1; // ???
      await addProductToCart(userId, product.id, amount); // Anropa service-funktionen
      alert(`${product.title} har lagts till i din varukorg!`);
    } catch (error) {
      alert("Det gick inte att lägga till produkten i varukorgen.");
    }
  };


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
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Lägg till i varukorg
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductItemLarge;