import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ProductList from "../components/ProductList";
import BreadcrumbsNav from "../components/BreadcrumbsNav";

function AllProducts() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <BreadcrumbsNav />

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
