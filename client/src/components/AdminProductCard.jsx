import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import placeholderImage from '../assets/placeholder.png';


//Representerar ett kort där alla produkter som listas i adminPage ligger i
//Den behöver få information om produkten som ska visas,
//När en befintlig produkt redigerats - Vare sig borttaget eller uppdaterad
function AdminProductCard({ product, onEdit, onDelete }) {
    return (
        <Card sx={{ maxWidth: 300, mb: 2 }}>
          <CardMedia
            component="img"
            height="200"
            image={product.imageUrl || placeholderImage}
            alt={product.title}
          />
          <CardContent>
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body2">{product.price} SEK</Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <Button variant="outlined" onClick={() => onEdit(product)}>Uppdatera</Button>
              <Button variant="outlined" color="error" onClick={() => onDelete(product.id)}>Ta bort</Button>
            </Box>
          </CardContent>
        </Card>
      );
}
export default AdminProductCard;