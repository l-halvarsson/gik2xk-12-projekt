
import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function AdminForm({ product, onCreate, onUpdate, onClear }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        imageUrl: product.imageUrl || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        imageUrl: ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const parsed = { ...formData, price: parseFloat(formData.price) };
    if (product && product.id) {
      onUpdate(product.id, parsed);
    } else {
      onCreate(parsed);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        {product?.id ? "Uppdatera produkt" : "Skapa ny produkt"}
      </Typography>

      <TextField label="Titel" name="title" value={formData.title} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
      <TextField label="Beskrivning" name="description" value={formData.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
      <TextField label="Pris" name="price" value={formData.price} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
      <TextField label="Bild-URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} fullWidth sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          {product?.id ? "Uppdatera" : "Skapa"}
        </Button>
        {product && (
          <Button variant="outlined" color="secondary" onClick={onClear}>
            Avbryt
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default AdminForm;





