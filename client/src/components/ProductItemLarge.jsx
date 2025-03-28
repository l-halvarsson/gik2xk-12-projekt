import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import placeholderImage from "../assets/placeholder.png";
import { addProductToCart } from '../services/CartService';
import { getPopulatedCartForUser } from '../services/CartService';



// Visar en större produktvy med bild, beskrivning, pris och knapp för att lägga till produkten i varukorgen.
function ProductItemLarge({ product, userId, setCartCount}){

  const handleAdd = async () => {
    try {
      await addProductToCart(userId, product.id, 1);
      const updatedCart = await getPopulatedCartForUser(userId);
      setCartCount(updatedCart.reduce((sum, item) => sum + item.amount, 0));
    
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
    display: "flex",   
    flexDirection: "row",
    alignItems: "center",
  }}
>
  <CardMedia
    component="img"
    sx={{
      width: 300,
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
   {/* Lägg till i varukorg knappen */}
    <Button
  variant="contained"
  onClick={handleAdd}
  sx={{
    backgroundColor: "#F5F5DC",
    color: "gray",
    "&:hover": {
      backgroundColor: "#e0e0c7"
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