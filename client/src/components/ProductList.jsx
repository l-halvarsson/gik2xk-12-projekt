
import ProductItemSmall from './ProductItemSmall';
import { getAllP } from '../services/ProductService';
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
    
    export default ProductList;