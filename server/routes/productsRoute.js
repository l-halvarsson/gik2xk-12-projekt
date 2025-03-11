const router = require('express').Router();
const { where } = require('sequelize');
const db = require('../models');


//Eventuella constraints

//pris - får inte vara 0
//titel - får inte vara för kort
//Beskrivning & 




/*----- Klart ----- */
//Hämta alla produkter
router.get('/', async(req, res) => {
    try {
        //Fetchning och lagring av produkter
        const products = await db.Product.findAll();
        res.json(products);//svaret 
       
    } catch (error){
        res.status(500).json({error: 'Det gick inte att hämta alla produkter'}) 

    }
});
//Skapa en produkt - bilden kvar
router.post('/', async(req, res) => {
    try {
        //Hämta data från "body" - hämta bild
        const {title, description, price} = req.body;

        //validera det upphämtade datan - att alla fält är ifyllda
        if (!title || !price || !description ) {
            return res.status(400).json({ error: "Fyll i alla fält" });
        }

        // lagra data i en gemensam variabel
        const newProductData = { title, description, price };
        

        //Skapa en produkt med de nya värdena och lagra det i databasen
        const newProduct = await db.Product.create(newProductData);

        res.status(200).json(newProduct);
       
    } catch (error){
        res.status(500).json({ error: "Kunde inte skapa produkten"});

    } 
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
router.get('/:id/', async (req, res) => {
    try {
        // Hämta produkten och inkludera alla betyg
        const product = await db.Product.findByPk(req.params.id, {
            include: [{ model: db.Rating, require: false }] // Inkluderar betyg från Rating-modellen
        });

        if (!product) {
            return res.status(404).json({ message: "Produkt hittades inte" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Serverfel", error: error.message });
    }
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