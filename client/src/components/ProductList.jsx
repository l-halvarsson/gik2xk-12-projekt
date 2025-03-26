import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import ProductItemSmall from './ProductItemSmall';
import { getAllProducts } from '../services/ProductService';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const data = await getAllProducts();
            console.log("Produkter från backend:", data);
            setProducts(data);
        }
        fetchProducts();
    }, []);

    return (      
    
        <Grid container spacing={2}>
            {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductItemSmall product={product} />
                    </Grid>
                ))
            ) : (
                <p>Inga produkter hittades.</p>
            )}
        </Grid>           
    );
}

export default ProductList;
