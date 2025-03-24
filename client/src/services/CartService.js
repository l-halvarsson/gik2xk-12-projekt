import axios from './api';

export async function getAllProductsInCart() {
    try {
        const response = await fetch(`/cart/${userId}`);

       

    } catch (e) {
        console.error("Varukorgen gick inte att hämta ut")
    }
    
    
}




//functionen hämtar produkter från backend
export async function getAllProducts() {
    try {
        const response = await axios.get('/products');
        if (response.status === 200) return response.data;
        else {
            console.log(response);
            return[];
        }

    } catch (e) {
        console.error("Produkterna gick inte att hämta ut")
    }
    
}