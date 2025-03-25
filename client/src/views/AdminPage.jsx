import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Snackbar } from '@mui/material';
import axios from 'axios';

function AdminPage() {
  const [product, setProduct] = useState({ title: '', description: '', price: '' });
  const [image, setImage] = useState(null); // För att hålla koll på vald bild
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Hantera ändringar i produktinformation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Hantera bilduppladdning
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Skapa produkt (inklusive bild)
  const handleCreateProduct = async () => {
    setIsLoading(true);

    // Skapa en FormData för att skicka både produktdata och bild
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);

    // Lägg till bilden om den finns
    if (image) {
      formData.append('image', image);
    }

    try {
      // Skicka POST-förfrågan till backend för att skapa produkten
      const response = await axios.post('http://localhost:4000/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSnackbarMessage('Produkten har skapats!');
      setSnackbarOpen(true);
      setProduct({ title: '', description: '', price: '' }); // Rensa formuläret
      setImage(null); // Rensa vald bild
    } catch (error) {
      setSnackbarMessage('Det gick inte att skapa produkten.');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Stäng snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Skapa Produkt</Typography>

      {/* Formulär för att skapa en produkt */}
      <TextField
        label="Produktnamn"
        name="title"
        value={product.title}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Beskrivning"
        name="description"
        value={product.description}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Pris"
        name="price"
        value={product.price}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      {/* Filinmatning för att ladda upp en bild */}
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        style={{ marginBottom: '16px' }}
      />

      {/* Knapp för att skapa produkten */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateProduct}
        disabled={isLoading}
        sx={{ marginBottom: 2 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Skapa Produkt'}
      </Button>

      {/* Snackbar för att visa resultatmeddelanden */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
}

export default AdminPage;
