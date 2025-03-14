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

//Skapa en produkt - bilden kvar
router.post('/', (req, res) => {
            //Hämta data från "body" - hämta bild
            const newProductData = req.body;
            productService.createProduct(newProductData).then((result) => {
                res.status(result.status).json(result.data);
              });
});
//Ta bort en produkt - baserad på id
router.delete('/:id', async(req, res) => {
    try {
        //hämtar up det inmatade id:et
        const { id } = req.params;

        //Tar bort den valda produkten från databasen
        const deletedProduct = await db.Product.destroy({ where: { id: id } });

        //Returnerar svaret
        res.json(`Produkten raderades`);   
    } catch (error) {
        res.json({error: " Produkten gick inte att ta bort."});
        
    }
});

// Hämta en specifik produkt inklusive alla betyg - Testa när betygen är inlags
router.get('/:id/', (req, res) => {
    const id = req.params.id;

    productService.getProductById(id).then((result) => {
        res.status(result.status).json(result.data);
        });
});




/*----- Kvar ----- */


//Uppdater en produkt - baserat på id
router.put('/:id', async (req, res) => {

    try{
        //hämta produkt
        const { id } = req.params;
        const { title, description, price } = req.body;

        //
        
        //hämta och updatera produkt
        const productToUpdate = await db.Product.findByPk(id);

    
        await productToUpdate.update({ title, description, price });

        res.json(`Produkten updaterades`); 
        //res.status(200).json("Produkten har updaterats")

    } catch(error){
        res.json({error: " Produkten gick inte att updatera."});

        //res.status(5000).json({error: " Produkten gick inte att updatera."});
    }
    
    







});





module.exports = router;