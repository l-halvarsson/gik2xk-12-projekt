const db = require('../models');
const validate = require('validate.js');    


const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');


//Skapa en användare
async function createUser(newUser) {
    try {
        const createUser = await db.User.create(newUser);

        return createResponseMessage(200, "Användaren har skapats");
        
           
    } catch (error){
            return createResponseError(error.status, error.message);
     } 
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
}


// Radera användare
async function deletedUserById(id) {
    try {
        const user = await db.User.findByPk(id); // Hämta användaren först

        if (!user) {
            return createResponseError(404, "Användaren hittades inte");
        }

        await db.User.destroy({ where: { id: id } }); // Radera användaren

        return createResponseSuccess({
            message: `Användaren med id:et ${id} har tagits bort`
        });
    } catch (error) {
        return createResponseError(500, "Kunde inte radera användaren", error.message);
    }
}

// Hämta alla användare
async function getAllUsers() {
    try {
        //Fetchning och lagring av användare
        const users = await db.User.findAll();
        return createResponseSuccess(users);
       
    } catch (error){
        return createResponseError(error.status, error.message);
    }
}

module.exports = {
  getUserById,
  createUser,  
  deletedUserById,
  getAllUsers

};

