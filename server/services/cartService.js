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
      imageUrl: product.imageUrl,
      amount: product.CartRow.amount,
      product_id: product.id
    }));
    return createResponseSuccess(cartItems);
  } catch (error) {
    return createResponseError(500, 'Det gick inte att hämta upp varukorgen');
  }
} 



async function removeProductFromCart(userId, productId) {
  const cart = await db.Cart.findOne({ where: { user_id: userId, payed: false } });
  if (!cart) return createResponseError(404, "Ingen aktiv varukorg");

  const cartItem = await db.CartRow.findOne({
    where: { cart_id: cart.id, product_id: productId }
  });

  if (!cartItem) {
    return createResponseError(404, "Produkten finns inte i varukorgen");
  }

  if (cartItem.amount > 1) {
    await cartItem.update({ amount: cartItem.amount - 1 });
  } else {
    await cartItem.destroy();
  }

  return createResponseSuccess({ message: "Produkten uppdaterad i varukorgen" });
}

//?
// Simulera ett köp
async function completePurchase(userId) {
  try {
    const cart = await db.Cart.findOne({ where: { user_id: userId, payed: false } });
    
    if (!cart) {
      return createResponseError(404, "Ingen aktiv varukorg hittades.");
    }

    // Simulera köp - här kan du lägga till mer logik, exempelvis för att registrera transaktionen.
    // Töm varukorgen efter köp
    await db.CartRow.destroy({ where: { cart_id: cart.id } });

    // Markera varukorgen som betald
    await cart.update({ payed: true });

    return createResponseSuccess({ message: "Köpet har genomförts och varukorgen är tömd." });

  } catch (error) {
    console.error('Error during purchase completion:', error);
    return createResponseError(500, "Ett fel uppstod vid genomförandet av köpet", error.message);
  }
}

// Uppdatera TILLAGT
async function updateAmount(userId, productId , resultAmount) {
  try {
    const cart = await db.Cart.findOne({ where: { user_id: userId, payed: false } });
    if (!cart) return createResponseError(404, "Varukorg saknas");

    const row = await db.CartRow.findOne({
      where: { cart_id: cart.id, product_id: productId }
    });

    if (!row) return createResponseError(404, "Produkt saknas i varukorgen");

    //osäker om db. ???
    const newAmount = row.amount + resultAmount; 

    if (newAmount < 1) {
      await row.destroy(); // ta bort raden helt om mängden är < 1
      return createResponseSuccess({ message: "Produkten togs bort från varukorgen" });
    }else {
      
     await row.update({ amount: newAmount });
    }

    return createResponseSuccess({ message: "Antal uppdaterat" });

  } catch (err) {
    return createResponseError(500, "Fel vid uppdatering av antal", err.message);
  }
}



module.exports = {
  addProductToCart,
  removeProductFromCart,
  completePurchase,
  getLatestCartForUser,
  updateAmount
};