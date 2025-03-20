const db = require('../models');
const validate = require('validate.js');    

const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
  } = require('../helpers/responseHelper');

  
// Lägg till produkt i varukorg
async function addProductToCart(userId, productId, amount) {
  const [cart, created] = await db.Cart.findOrCreate({
    where: { user_id: userId}, //Ändrat idag
    defaults: { user_id: userId, payed: false} 
  });
  const cartId = cart.id;

  const cartRow = await db.CartRow.findOne({
    where: { cart_id: cartId, product_id: productId}
  });
  if (cartRow) {
    await cartRow.update({ amount: cartRow.amount + amount});
  } else {
    await db.CartRow.create({
      cart_id: cartId,
      product_id: productId,
      amount: amount
    });
  }
  return createResponseSuccess()
}



// Ta bort produkt i varukorg
async function removeProductFromCart(userId, productId) {
  try {
      const cart = await db.Cart.findOne({ where: { user_id: userId } });

      if (!cart) {
          return createResponseError(404, "Varukorgen hittades inte.");
      }
      const deletedRows = await db.CartRow.destroy({
          where: { cart_id: cart.id, product_id: productId }
      });

      if (deletedRows === 0) {
          return createResponseError(404, "Produkten fanns inte i varukorgen.");
      }

      return createResponseSuccess({ message: "Produkten har tagits bort från varukorgen." });
  } catch (error) {
      return createResponseError(500, "Ett fel uppstod vid borttagning av produkt från varukorgen", error.message);
  }
}

async function showProductsInCart(){

  //Hämta varukorgen för en specific användare

  //Hämta alla produkter i varukorgen inklusive deras namn, pris och antal.

  //Beräkna totalsumman för varukorgen.

  //Returnera detta som en respons.
  
  
}

  module.exports = {
    addProductToCart,
    showProductsInCart,
    removeProductFromCart
  };