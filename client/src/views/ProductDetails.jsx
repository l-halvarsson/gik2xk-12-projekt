import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../services/ProductService";
import ProductItemLarge from "../components/ProductItemLarge";
import { CircularProgress, Container, Typography, Button } from "@mui/material";
import axios from 'axios';
import RatingForm from "../components/RatingForm"; 
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; 
import Rating from "../components/Rating"; 
import { useOutletContext } from "react-router-dom"; 
import BreadcrumbsNav from "../components/BreadcrumbsNav";



//Funktion för produktdetaljer
function ProductDetails() {
  const { id } = useParams(); // få produkt-ID från URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(null); // För att lagra medelbetyget
  const navigate = useNavigate(); // För att kunna navigera till föregående sida
  const { userId, setCartCount } = useOutletContext(); // Hämtar userID från app.jsx

  //Inkludera medelbetyg
  const fetchAverageRating = () => {
    axios.get(`/products/${id}/average-rating`) // 
      .then(response => {
        setAverageRating(response.data.averageRating);
      })
      .catch(error => console.error("Fel vid hämtning av medelbetyg:", error));
  };

  useEffect(() => {
    // Hämta produktdetaljer
    getOne(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  
    // Hämta medelbetyg
    fetchAverageRating(); 
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
    <Container sx={{ mt: 0 }}>
      {/* Använd BredcrumbsNav komponeten */}
      <BreadcrumbsNav lastProductTitle={product?.title}/>
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
        userId={userId}  
        setCartCount={setCartCount}
      />

      {/* Visa medelbetyget genom Rating-komponenten */}
      <Rating averageRating={averageRating} />

      { /* Visar där en sätter betyg på produkt*/}
      <RatingForm productId={id} onRatingSubmitted={fetchAverageRating} />
    </Container>
  );
}

export default ProductDetails;