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

async function showProductsInCart(userId){
  try{ 
      //Hämta senaste varukorgen för en specific användare
      const cart = await db.Cart.findOne({
        where: {user_id: userId, payed: false},
        include: [
          {
            //Antalet hämtas från cartRow-tabellen
            model: db.Product, 
            through: {
              model: db.CartRow,
              attributes: ['amount']
            }, 
            //resten hämtas fron product-tabellen
            attributes: ['id', 'name', 'price']
          }
        ]
      });

      // Kontrollera om cart finns
      if (!cart || !cart.Products.length) {
        return createResponseError(404, "Ingen varukorg hittades för användaren");
      }
 
      //en array som lagrar alla produkter i en varukorg
      let cartItems = [];
      //en variabel som lagrar total priset
      let totalPrice = 0;
      //en for-loop som itererar alla produkter i varukorgen
      for (let i = 0; i < cart.Products.length; i++) {
        //I varje iteration hämtas en produkt
        let product = cart.Products[i];
        //dess antal
        let amount = product.CartRow.amount;
        //totala priset baserat på antalet
        let total = product.price * amount;

        //uträkning på ALLA produkters totalapris
        totalPrice += total; 

        // Lägg till produkten i cartItems-arrayen
        cartItems.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          amount: amount,
          total: total
        });
      }
      return createResponseSuccess({
        //innehåller alla produkter
        cart: cartItems,
        //innehåller slutsummeringen
        totalPrice: totalPrice
      });
  }catch(error) {
    return createResponseError(500, "Varukorgen gick inte att hämta")
  } 
}

async function completePurchase(userId) {
  try {
    const cart = await db.Cart.findOne({ where: { user_id: userId, payed: false } });
    if (!cart) {
      return createResponseError(404, "Ingen aktiv varukorg hittades.");
    }

    // Töm varukorgen direkt här
    await db.cartRow.destroy({ where: { cart_id: cart.id } });

    return createResponseSuccess({ message: "Köpet har genomförts." });

  } catch (error) {
    console.error('Error during purchase completion:', error);  // Loggar hela felet
    return createResponseError(500, "Ett fel uppstod vid genomförandet av köpet", error.message);
  }
}

  module.exports = {
    addProductToCart,
    showProductsInCart,
    removeProductFromCart,
    completePurchase
  };