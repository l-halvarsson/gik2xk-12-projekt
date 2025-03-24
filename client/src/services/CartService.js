import axios from './api';


//Lägger till en produkt i varukorgen
export async function addProductToCart(userId, productId, amount) {
    try {
        const response = await axios.post('/cart/addProduct', {
            userId,
            productId,
            amount
        });
        return response.data; 
    } catch (error) {
        console.error("Ett fel uppstod vid tillägg av produkt i varukorgen:");
    }
}

//hämtar varukorgens innehåll för en specifik användare
export async function getAllProductsInCart(userId) {
    try {
        //: framfrö?
        const response = await axios.get(`/cart/${userId}`);
        return response.data; 
    } catch (error) {
        console.error("Varukorgen gick inte att hämta:");
    }
}
