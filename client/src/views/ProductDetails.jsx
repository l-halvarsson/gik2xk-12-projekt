//import ProductItemLarge from "../components/ProductItemLarge";

/*import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOne } from "../services/ProductService";
import ProductItemLarge from "../components/ProductItemLarge";
import { Container, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getOne(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  return (
    <Container sx={{ mt: 4 }}>
              <Button
        variant="contained"
        startIcon={<ChevronLeftIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 2,
          backgroundColor: "#F5F5DC",
          color: "gray",
          "&:hover": { backgroundColor: "#e0e0e0" },
        }}
      >
        Tillbaka
      </Button>

      {product && <ProductItemLarge product={product} />}
    </Container>
  );
}

export default ProductDetails;*/

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../services/ProductService";
import ProductItemLarge from "../components/ProductItemLarge";
import { CircularProgress, Container, Typography, Button } from "@mui/material";
import axios from 'axios';
import Rating from "../components/Rating"; // Importera din Rating-komponent
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Importera ikonen

function ProductDetails() {
  const { id } = useParams(); // få produkt-ID från URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(null); // För att lagra medelbetyget
  const navigate = useNavigate(); // För att kunna navigera till föregående sida

  useEffect(() => {
    // Hämta produktdetaljer
    getOne(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });

    // Hämta medelbetyget för produkten
    axios.get(`/api/products/${id}/average-rating`)
      .then(response => {
        setAverageRating(response.data.averageRating); // Sätt medelbetyget
      })
      .catch(error => console.error("Fel vid hämtning av medelbetyg:", error));
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography>Laddar produkt...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {/* Tillbakaknappen */}
      <Button
        variant="contained"
        startIcon={<ChevronLeftIcon />}
        onClick={() => navigate(-1)} // Navigerar till föregående sida
        sx={{
          mb: 2,
          backgroundColor: "#F5F5DC",
          color: "gray",
          "&:hover": { backgroundColor: "#e0e0e0" },
        }}
      >
        Tillbaka
      </Button>

      <ProductItemLarge product={product} />
      <Typography variant="h5" sx={{ mt: 4 }}>Medelbetyg: {averageRating || "Ingen betyg ännu"}</Typography>
      <Rating productId={id} onRatingSubmitted={() => {
        // Hämta det nya medelbetyget efter att användaren har satt sitt betyg
        axios.get(`/api/products/${id}/average-rating`)
          .then(response => setAverageRating(response.data.averageRating))
          .catch(error => console.error("Fel vid hämtning av medelbetyg:", error));
      }} />
    </Container>
  );
}

export default ProductDetails;


