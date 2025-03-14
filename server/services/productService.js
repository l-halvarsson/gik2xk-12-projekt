const db = require('../models'); 
const validate = require('validate.js');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
  } = require('../helpers/responseHelper');

async function getAllProducts() {
        try {
            //Fetchning och lagring av produkter
            const products = await db.Product.findAll();
            return createResponseSuccess(products);
           
        } catch (error){
            return createResponseError(error.status, error.message);
        }
}
async function getProductById(id) {
        try {
            // Hämta produkten och inkludera alla betyg
            const product = await db.Product.findByPk(id, {
                include: [{ model: db.Rating, require: false }] // Inkluderar betyg från Rating-modellen
            });
    
            if (!product) {
                return createResponseError(404, 'Produkten hittades inte');
            }
            else {
                return createResponseSuccess(product);
            }
        } catch (error) {
            return createResponseError(error.status, error.message);
        }
}

async function createProduct(newProduct) {
    try {
        /*//validera det upphämtade datan - att alla fält är ifyllda
        if (!title || !price || !description ) {
                return res.status(400).json({ error: "Fyll i alla fält" });
            }*/
            const createProduct = await db.Product.create(newProduct);

            return createResponseSuccess(createProduct);
           
        } catch (error){
            return createResponseError(error.status, error.message);
    
        } 
}
async function deleteProduct() {}
async function deleteProductRating() {}
async function updateProduct() {}
async function createProductRating() {}
async function calculateAverageRating() {}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    /*getProductRating,
    deleteProduct,
    deleteProductRating,
    updateProduct,
    createProductRating,
    calculateAverageRating*/
};