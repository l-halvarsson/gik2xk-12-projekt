const db = require('../models'); 
const validate = require('validate.js');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
  } = require('../helpers/responseHelper');

  /*----- Klart ----- */

  const constraints = {
    title: {
        presence: { allowEmpty: false, message: "^Titeln får inte vara tom." },
        length: {
            minimum: 2,
            maximum: 50,
            tooShort: "^Titeln måste vara minst %{count} tecken lång.",
            tooLong: "^Titeln får inte vara längre än %{count} tecken lång."
        }
    },
    description: {
        presence: { allowEmpty: false, message: "^Beskrivningen får inte vara tom." },
        length: {
            minimum: 5,
            maximum: 100,
            tooShort: "^Beskrivningen måste vara minst %{count} tecken lång.",
            tooLong: "^Beskrivningen får inte vara längre än %{count} tecken lång."
        }
    },
    price: {
        presence: { allowEmpty: false, message: "^Pris måste anges." },
        numericality: {
            greaterThan: 0,
            message: "^Priset måste vara en positiv siffra."
        }
    }/*,
    imageUrl: {
        presence: { allowEmpty: false, message: "^En bild-URL måste anges." },
        format: {
            pattern: /\.(jpeg|jpg|png|gif)$/i,
            message: "^Endast bilder i formaten JPEG, JPG, PNG och GIF är tillåtna."
        }
    }*/
};

// Hämtar alla produkter
async function getAllProducts() {
        try {
            //Fetchning och lagring av produkter
            const products = await db.Product.findAll();
            return createResponseSuccess(products);
           
        } catch (error){
            return createResponseError(error.status, error.message);
        }
}

// Hämta produkten och inkludera alla betyg
async function getProductById(id) {
        try {
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

//Skapa produkt
async function createProduct(newProduct) {
    const invalidData = validate(newProduct, constraints);
    if (invalidData) {
        return createResponseError(422, invalidData);
    }
    try {
        //Validera att alla fält är ifyllda
        const createProduct = await db.Product.create(newProduct);

        return createResponseSuccess(createProduct);
           
        } catch (error){
            return createResponseError(error.status, error.message);
    
        } 
}

// Redo att testas
async function deleteProduct(id) {
    try {
        // Ta bort den valda produkten från databasen
        const deletedProduct = await db.Product.destroy({ where: { id: id } });

         // Kontrollera om någon produkt togs bort
        if (deletedProduct === 0) {
            return createResponseError(404, "Produkten hittades inte");
        }

        //Returnerar svaret
        return createResponseSuccess('Produkten har tagits bort'); 
    } catch (error) {
        return createResponseError(error.status, error.message);
        
    }

}

 //Uppdatera produkt
async function updateProduct(id, updatedData) {
    try {
        // Hämta produkten
        const productToUpdate = await db.Product.findByPk(id);

        if (!productToUpdate) {
            return createResponseError(404, "Produkten hittades inte");
        }

        // Uppdatera produkten
        await productToUpdate.update(updatedData);

        return createResponseSuccess("Produkten uppdaterades"); 
    } catch (error) {
        return createResponseError(500, "Produkten gick inte att uppdatera.");
    }
}

// Skapa rating för en produkt 
async function createProductRating(productId, ratingValue) {
    if (!productId) {
        return createResponseError(422, 'Id är obligatoriskt');
    }
    // Göra en kontroll om rating har ett giltigt värde
    if (!ratingValue || ratingValue < 1 || ratingValue > 5){
        return createResponseError (422, 'Betyget måste vara mellan 1 och 5');
    } 
    try {
        // kopplar den nya ratingen till produkt
        const newRating = await db.Rating.create({
            product_id: productId,
            rating: ratingValue                     

        });

        return createResponseSuccess(newRating);

    } catch (error) {
        return createResponseError("Kunde inte skapa betyg");
    }
}

// Berälnar snittbetyg för en produkt
async function calculateAverageRating(productId) {
    try {
        console.log("Hämtar betyg för produkt:", productId);

        // Hämta alla betyg för produkten
        const ratings = await db.Rating.findAll({
            where: { product_id: productId },
            attributes: ['rating'] // Hämta endast betygsfältet
        });

        // Om inga betyg finns, returnera ett meddelande utan averageRating
        if (ratings.length === 0) {
            return createResponseMessage(200, "Denna produkt har inga betyg ännu.");
        }

        // Beräkna genomsnittet
        const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
        const average = total / ratings.length;

        // Returnerar snittbetyget
        return createResponseSuccess({ averageRating: average.toFixed(1) });
    } catch (error) {
        return createResponseError(500, "Ett fel uppstod vid beräkning av snittbetyget", error.message);
    }
} 
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    createProductRating,
    calculateAverageRating
};