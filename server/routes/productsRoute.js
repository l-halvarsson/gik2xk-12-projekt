const router = require('express').Router();
const db = require('../models');


//Eventuella constrints

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











/*----- Kvar ----- */
//Hämta en specifik produkt (skicka med betyg)
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id; 
        
        const product = await db.Product.findByPk(productId);
        
        if (!product) {
            return res.status(404).json({ message: "Produkt hittades inte" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Serverfel", error: error.message });

    }
});

//Uppdater en produkt - baserat på id
router.put('/', (req, res) => {
    res.send('Put products');
});





module.exports = router;