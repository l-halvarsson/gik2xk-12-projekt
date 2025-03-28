const router = require('express').Router();
const { where } = require('sequelize');
const db = require('../models');
const productService = require('../services/productService');
const path = require("path");



//Hämta alla produkter
router.get('/', (req, res) => {
productService.getAllProducts().then((result) => {
    res.status(result.status).json(result.data);
    });
});

// Hämta en specifik produkt inklusive alla betyg 
router.get('/:id/', (req, res) => {
    const id = req.params.id;

    productService.getProductById(id).then((result) => {
        res.status(result.status).json(result.data);
        }); 
});

//Skapa en produkt 
 router.post('/', (req, res) => {
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

    const result = await productService.calculateAverageRating(id);
    res.status(result.status).json(result.data);
});
    
// Lägg till betyg på produkt
router.post('/:id/ratings', async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
  
    const result = await productService.createProductRating(id, rating);
    res.status(result.status).json(result.data);
  });





module.exports = router;
