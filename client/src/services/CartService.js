import axios from './api';


//Lägger till en produkt i varukorgen från backend
export async function addProductToCart(userId, productId, amount) {
   
    if (!userId || !productId || !amount) {
        throw new Error("Saknar nödvändig data");
    }


    const body = { userId, productId, amount };
    console.log('Skickar till backend:', { userId, productId, amount });
    const response = await axios.post('/cart/addProduct', body);
    return response.data;
}


//hämtar en användares senaste varukorge OCH dess innehåll från backend
export async function getPopulatedCartForUser(userId) {
    const response = await axios.get(`/users/${userId}/getCart`); 
    return response.data; 
} 

//Genomför köp för användare från backend
export const completePurchaseForUser = async (userId) => {
    const response = await axios.post(`/cart/checkout`, { userId });
    return response.data;
  };

  

  // Ökar produktantal från backend
export async function increaseProductAmount(userId, productId) {

  const userAmount = {userId,productId, resultAmount: 1};
  return  axios.put('/cart/updateProduct', userAmount)
}

// minska produktantal från backend
export async function decreaseProductAmount(userId, productId) {
  const userAmount = {userId,productId, resultAmount: -1};
  return  axios.put('/cart/updateProduct', userAmount)
}


//Ta bort produkt från varukorg från backend
export async function removeProductFromCart(userId, productId) {
  const response = await axios.delete('/cart/removeProduct', { data: { userId, productId } });
  return response.data;
}

