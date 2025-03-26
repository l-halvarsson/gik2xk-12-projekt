import axios from './api';


//Lägger till en produkt i varukorgen
export async function addProductToCart(userId, productId, amount) {
    if (!userId || !productId || !amount) {
        throw new Error("Saknar nödvändig data");
    }

    const body = { userId, productId, amount };
    console.log('Skickar till backend:', { userId, productId, amount });

    try {
        // Steg 1: Lägg till produkt i varukorgen
        const response = await axios.post('/cart/addProduct', body);

        // Steg 2: Hämta den uppdaterade varukorgen för att få det totala antalet varor
        const cartData = await getPopulatedCartForUser(userId); // Hämta varukorgen
        const count = cartData.reduce((acc, item) => acc + item.amount, 0); // Beräkna total mängd produkter i varukorgen

        // Returnera både svar från backend och det nya antalet
        return { response: response.data, count };

    } catch (error) {
        console.error('Kunde inte lägga till produkt i varukorgen:', error);
        throw new Error("Kunde inte lägga till produkten i varukorgen");
    }
}
/*export async function addProductToCart(userId, productId, amount) {
   
    if (!userId || !productId || !amount) {
        throw new Error("Saknar nödvändig data");
    }


    const body = { userId, productId, amount };
    console.log('Skickar till backend:', { userId, productId, amount });
    const response = await axios.post('/cart/addProduct', body);
    return response.data;
}

*/
//hämtar en användares senaste varukorge OCH dess innehåll 
export async function getPopulatedCartForUser(userId) {
    const response = await axios.get(`/users/${userId}/getCart`); 
    return response.data; 
} 

// services/CartService.js

export const completePurchaseForUser = async (userId) => {
    const response = await axios.post(`/cart/checkout`, { userId });
    return response.data;
  };

  
  