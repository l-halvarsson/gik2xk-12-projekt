import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ProductList from "../components/ProductList"; // Importera ProductList

function AllProducts() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">


            <Typography variant="h3" gutterBottom>
                Alla produkter
            </Typography>

            {/* Använd ProductList för att visa produkter */}
            <ProductList />
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
        </Container>
    );
}

export default AllProducts;
