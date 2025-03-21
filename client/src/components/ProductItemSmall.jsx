/*Denna funktion kommer visa lite mindre information om produkten*/
import React from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";



function ProductItemSmall({ productId }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
      // Hämta produktdata från API/databas
      fetch(`http://localhost:5000/products/${productId}`) // Uppdaterad URL för lokal backend
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error("Error fetching product:", error));
    }, [productId]);
  
    if (!product) {
      return <Typography>Loading...</Typography>;
    }

    return (
    <Card sx={{ maxWidth: 345, position: "relative", borderRadius: 2 }}>
    
        {/* Produktbild */}
        <CardMedia
        component="img"
        height="500"
        image={product.imageUrl} // Bildlänk från API
        alt={product.title} // Från databas
      />
    
      {/* Produktinformation */}
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {product.title} {/* Från databas */}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          {product.price} SEK
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductItemSmall;