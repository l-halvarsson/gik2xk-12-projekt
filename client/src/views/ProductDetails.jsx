import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../services/ProductService";
import ProductItemLarge from "../components/ProductItemLarge";
import { CircularProgress, Container, Typography, Button } from "@mui/material";
import axios from 'axios';
import RatingForm from "../components/RatingForm"; 
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; 
import Rating from "../components/Rating"; 
import AllRatings from "../components/AllRatings"; // Importera AllRatings-komponenten
import { useOutletContext } from "react-router-dom"; 
import BreadcrumbsNav from "../components/BreadcrumbsNav";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(null);
  const navigate = useNavigate();
  const { userId, setCartCount } = useOutletContext();



  const fetchAverageRating = () => {
    axios.get(`/products/${id}/average-rating`)
      .then(response => {
        setAverageRating(response.data.averageRating);
      })
      .catch(error => console.error("Fel vid hämtning av medelbetyg:", error));
  };

  useEffect(() => {
    getOne(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
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
      <BreadcrumbsNav lastProductTitle={product?.title} />
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

      <ProductItemLarge 
        product={product}
        userId={userId}  
        setCartCount={setCartCount}
      />

      <Rating averageRating={averageRating} />
      <RatingForm productId={id} onRatingSubmitted={fetchAverageRating} />
      <AllRatings productId={id} /> {/* Visa alla betyg */}
    </Container>
  );
}

export default ProductDetails;
