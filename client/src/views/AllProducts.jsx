import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Grid } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ProductItemSmall from "../components/ProductItemSmall";

function AllProducts() {
    const navigate = useNavigate();

    const products = [
        { id: 1, title: "Produkt 1", price: 199, image: "https://via.placeholder.com/300" },
        { id: 2, title: "Produkt 2", price: 299, image: "https://via.placeholder.com/300" },
        { id: 3, title: "Produkt 3", price: 399, image: "https://via.placeholder.com/300" },
        { id: 4, title: "Produkt 4", price: 499, image: "https://via.placeholder.com/300" },
    ];

    return (
        <Container maxWidth="md">
            <Button
                variant="contained"
                startIcon={<ChevronLeftIcon />}
                onClick={() => navigate(-1)}
                sx={{ 
                    mt: 4, 
                    mb: 2, 
                    backgroundColor: "#F5F5DC",
                    color: "gray",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                }}
            >
                Tillbaka
            </Button>

            <Typography variant="h3" gutterBottom>
                Alla produkter
            </Typography>

            {/* Rendera produkterna i ett Grid */}
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductItemSmall product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default AllProducts;