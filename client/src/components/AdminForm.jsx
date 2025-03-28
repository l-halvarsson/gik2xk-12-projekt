import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

// Formulär för att skapa eller uppdatera en produkt med validering av titel, beskrivning, pris och valfri bild-URL.
function AdminForm({ product, onCreate, onUpdate, onClear }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        imageUrl: product.imageUrl || ''
      });
      setErrors({});
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        imageUrl: ''
      });
      setErrors({});
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }; 

  const validate = () => {
    let newErrors = {};

    // Validering för titel
    if (!formData.title.trim()) {
      newErrors.title = "Titeln får inte vara tom.";
    } else if (formData.title.length < 2) {
      newErrors.title = "Titeln måste vara minst 2 tecken lång.";
    } else if (formData.title.length > 50) {
      newErrors.title = "Titeln får inte vara längre än 100 tecken lång.";
    }

    // Validering för beskrivning
    if (!formData.description.trim()) {
      newErrors.description = "Beskrivningen får inte vara tom.";
    } else if (formData.description.length < 5) {
      newErrors.description = "Beskrivningen måste vara minst 10 tecken lång.";
    } else if (formData.description.length > 100) {
      newErrors.description = "Beskrivningen får inte vara längre än 1000 tecken lång.";
    }

    // Validering för pris
    if (!formData.price.trim()) {
      newErrors.price = "Pris är obligatoriskt";
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Pris måste vara ett positivt tal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const parsedData = { 
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
    };

    if (formData.imageUrl.trim()) {
      parsedData.imageUrl = formData.imageUrl;
    }

    if (product?.id) {
      onUpdate(product.id, parsedData);
    } else {
      onCreate(parsedData);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        {product?.id ? "Uppdatera produkt" : "Skapa ny produkt"}
      </Typography>

      <TextField
        label="Titel"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={!!errors.title}
        helperText={errors.title}
      />

      <TextField
        label="Beskrivning"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={!!errors.description}
        helperText={errors.description}
      />

      <TextField
        label="Pris"
        name="price"
        value={formData.price}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        error={!!errors.price}
        helperText={errors.price}
      />

      <TextField
        label="Bild-URL (valfritt)"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Vänligen rätta till felen ovan innan du skickar in formuläret.
        </Alert>
      )}

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






