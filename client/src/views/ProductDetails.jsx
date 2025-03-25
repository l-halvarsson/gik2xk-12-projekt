import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../services/ProductService";
import ProductItemLarge from "../components/ProductItemLarge";
import { CircularProgress, Container, Typography, Button } from "@mui/material";
import axios from 'axios';
import RatingForm from "../components/RatingForm"; // Importera din Rating-komponent
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Importera ikonen
import Rating from "../components/Rating"; // Importera Rating-komponenten
import { useOutletContext } from "react-router-dom"; //Tillagt precis

//const userId = Number(localStorage.getItem("userId"));


function ProductDetails() {
  const { id } = useParams(); // få produkt-ID från URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(null); // För att lagra medelbetyget
  const navigate = useNavigate(); // För att kunna navigera till föregående sida
  const { userId } = useOutletContext(); // Hämtar userID från app.jsx

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
      {/* Visa produkt + all info */}
      <ProductItemLarge 
        product={product}
        userId={userId} // Ändrade till detta och det 
        //updateCart={updateCart}
      />

      {/* Visa medelbetyget genom Rating-komponenten */}
      <Rating productId={id} />

      { /* Visar där en sätter betyg på produkt*/}
      <RatingForm productId={id} />
    </Container>
  );
}

export default ProductDetails;