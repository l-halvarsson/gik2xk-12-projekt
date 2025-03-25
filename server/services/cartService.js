const db = require('../models');
const validate = require('validate.js');    

const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
  } = require('../helpers/responseHelper');

  
//Lägger till valfritt antal av en produkt i användarens senaste varukorg
async function addProductToCart(userId, productId, amount){
  if (!userId || !productId || !amount || amount <= 0) {
    return createResponseError(400, 'Ange rätt datat');
  }

  try {
    // Steg 1: Hämta eller skapa en varukorg där payed = false
    const [cart] = await db.Cart.findOrCreate({
      where: { user_id: userId, payed: false }
    });

    // Steg 2: Kontrollera om produkten redan finns i varukorgen
    const productExistisInRow = await db.CartRow.findOne({
      where: {
        cart_id: cart.id,
        product_id: productId
      }
    });

    if (productExistisInRow) {
      // Produkten finns redan – uppdatera antalet
      const updatedRow = await productExistisInRow.update({
        amount: productExistisInRow.amount + amount
      });
      return createResponseSuccess(updatedRow);
    } else {
      // Produkten finns inte – skapa en ny rad
      const newProductRow = await db.CartRow.create({
        cart_id: cart.id,
        product_id: productId,
        amount: amount
      });
      return createResponseSuccess(newProductRow);
    }
  } catch (error) {
    return createResponseError(500, 'Produkten kunde inte läggas in i varukorgen');
  }

}

//Hämta en användares senaste varukorg ink alla tillhörande produkter och deras antal
async function getLatestCartForUser(userId) {
  console.log(" Hämtar varukorg för user:", userId);

  try {
    const latestCart = await db.Cart.findOne({
      where: {
        user_id: userId,
        payed: false
      },
      order: [['created_at', 'DESC']],
      include: [
        {
          model: db.Product,
          through: {
            attributes: ['amount']
          }
        }
      ]
    });

    console.log("🛒 Hittad varukorg:", latestCart);


    if (!latestCart) {
      return createResponseSuccess([]); // tom varukorg
    }

    // Städa up data. inkludera title, pris, amount
    const cartItems = latestCart.Products.map(product => ({
      title: product.title,
      price: product.price,
      amount: product.CartRow.amount
    }));

    return createResponseSuccess(cartItems);
  } catch (error) {
    return createResponseError(500, 'Det gick inte att hämta upp varukorgen');
  }
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
//?
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
  removeProductFromCart,
  completePurchase,
  getLatestCartForUser
};