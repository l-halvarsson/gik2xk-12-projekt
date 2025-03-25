import axios from './api';


//Lägger till en produkt i varukorgen
export async function addProductToCart(userId, productId, amount) {
   
    if (!userId || !productId || !amount) {
        throw new Error("Saknar nödvändig data");
    }

    const body = { userId, productId, amount };
    console.log('Skickar till backend:', { userId, productId, amount });
    const response = await axios.post('/cart/addProduct', body);
    return response.data;
}


//hämtar en användares senaste varukorge OCH dess innehåll 
export async function getPopulatedCartForUser(userId) {
    const response = await axios.get(`/users/${userId}/getCart`);
    return response.data; 
}

