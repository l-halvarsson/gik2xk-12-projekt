const db = require('../models');
const validate = require('validate.js');    
const cartService = require('./cartService');


const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');


//Skapa en användare
async function createUser(newUserData) {
    try {
        const createdUser = await db.User.create(newUserData);
        return createResponseSuccess(createdUser);
    } catch (error){
        return createResponseError(500, "Användaren gick inte att skapa");
    } 
}
// Hämta alla användare
async function getAllUsers() {
    try {
        const users = await db.User.findAll();
        return createResponseSuccess(users);
       
    } catch (error){
        return createResponseError(500, 'Kunde inte hämta några användare');
    }
}

//Hämta användarens senaste varukorg via getLatestCartForUser() i cartService
function getUserCart(userId) {
    return cartService.getLatestCartForUser(userId);
}

// Hämta  en specific user baserat på id
async function getUserById(id) {
    try {
        const user = await db.User.findByPk(id);

        if (!user) {
            return createResponseError(404, 'Användare hittades inte');
        }
        return createResponseSuccess(user);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
        return createResponseError(500, "Användaren gick inte att skapa");
} 

 

module.exports = {
  createUser,  
  getAllUsers,
  getUserCart,
  getUserById
};

