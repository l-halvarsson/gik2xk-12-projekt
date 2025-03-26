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

// services/CartService.js

export const completePurchaseForUser = async (userId) => {
    const response = await axios.post(`/cart/checkout`, { userId });
    return response.data;
  };

  
 // Ta bort produkt från varukorgen
/*export async function removeProductFromCart(userId, productId) {
    try {
      const response = await axios.delete('/cart/removeProduct', {
        data: { userId, productId }
      });
      return response.data; 
    } catch (error) {
      console.error("Fel vid borttagning av produkt:", error);
      throw new Error("Kunde inte ta bort produkten från varukorgen.");
    }
  }*/

  // TILLAGT - öka
export async function increaseProductAmount(userId, productId) {

  //hämta in den önksade amount från användaren
  const userAmount = {userId,productId, resultAmount: 1};
  //Skicka request till backend
  return  axios.put('/cart/updateProduct', userAmount)
}

// minska 
export async function decreaseProductAmount(userId, productId) {
  //hämta in den önksade amount från användaren
  const userAmount = {userId,productId, resultAmount: -1};
  //Skicka request till backend
  return  axios.put('/cart/updateProduct', userAmount)
}


//TILLAGT - Kanske överflödigt??? testa!!!!
export async function removeProductFromCart(userId, productId) {
  const response = await axios.delete('/cart/removeProduct', { data: { userId, productId } });
  return response.data;
}

