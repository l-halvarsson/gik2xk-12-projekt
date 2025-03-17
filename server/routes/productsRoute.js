const router = require('express').Router();
const { where } = require('sequelize');
const db = require('../models');
const productService = require('../services/productService');


//Eventuella constraints

//pris - får inte vara 0
//titel - får inte vara för kort
//Beskrivning & 



/*----- Klart ----- */

//Hämta alla produkter
router.get('/', (req, res) => {
productService.getAllProducts().then((result) => {
    res.status(result.status).json(result.data);
    });
});

// Hämta en specifik produkt inklusive alla betyg - Testa när betygen är inlags
router.get('/:id/', (req, res) => {
    const id = req.params.id;

    productService.getProductById(id).then((result) => {
        res.status(result.status).json(result.data);
        }); 
});

//Skapa en produkt - OBS bilden kvar
router.post('/', (req, res) => {
            //Hämta data från "body" - hämta bild
            const newProductData = req.body;
            productService.createProduct(newProductData).then((result) => {
                res.status(result.status).json(result.data);
              });
});

//Ta bort en produkt - baserad på id
router.delete('/:id', (req, res) => {
    productService.deleteProduct(req.params.id)
        .then(result => {
            res.status(result.status).json(result.data);
        });
});

//Uppdater en produkt - baserat på id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await productService.updateProduct(id, updatedData);
    res.status(result.status).json(result.data);
});
    
// Hämta medelbetyget för en specifik produkt
router.get('/:id/average-rating', async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    const result = await productService.calculateAverageRating(id, rating);
    res.status(result.status).json(result.data);
});
    
// Lägg till betyg på produkt
router.post('/:id/ratings', async (req, res) => {
    const { id } = req.params;

    const result = await productService.createProductRating(id);
    res.status(result.status).json(result.data);    
});     













module.exports = router;