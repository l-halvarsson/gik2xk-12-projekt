
/*import ProductItemSmall from './ProductItemSmall';
import { getAllProducts } from '../services/ProductService';
// useEffect för att hämta produkter när sidan laddas 
//useState för att lagra produkterna i frontend så de kan visas
import { useEffect, useState } from 'react';

function ProductList() {
    // En react Hook - används för att skapa och hantera tillstånd 
    const [products, setProducts] = useState([]);
    useEffect (() => {
        getAllProducts().then((data) => {
            setProducts(data);
        });
    }, []);
    return (
        <ul>
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product.id}>
                <ProductItemSmall product={product} />
              </li>
            ))
          ) : (
            <p>Inga produkter hittades.</p>
          )}
        </ul>
      );
    }
    
    export default ProductList;*/
    import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import ProductItemSmall from './ProductItemSmall';
import { getAllProducts } from '../services/ProductService'; // Se till att importen är rätt

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const data = await getAllProducts();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    return (
        <Grid container spacing={2}>
            {products.length > 0 ? (
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
