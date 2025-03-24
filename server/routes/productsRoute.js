const router = require('express').Router();
const { where } = require('sequelize');
const db = require('../models');
const productService = require('../services/productService');
//const multer = require('multer'); //Tillagt idag
const path = require("path");

//Eventuella constraints

//pris - får inte vara 0
//titel - får inte vara för kort
//Beskrivning & 
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Spara bilder i 'uploads/'-mappen
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Använd timestamp + rätt filändelse
    }
});

const uploads = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Begränsa till 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error("Endast bilder i formaten JPEG, JPG, PNG och GIF är tillåtna!"));
        }
    }
});

*/
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


//Skapa en produkt 
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
    const { rating } = req.body;
  
    const result = await productService.createProductRating(id, rating);
    res.status(result.status).json(result.data);
  });
 /* TIDIGARE VERSION, testar den nya ovan

router.post('/:id/ratings', async (req, res) => {
    const { id } = req.params;

    const result = await productService.createProductRating(id);
    res.status(result.status).json(result.data);    
});     */













module.exports = router;
//module.exports = uploads;