const router = require('express').Router();
const db = require('../models');
const cartService = require('../services/cartService'); //Tillagd idag

router.get('/', (req, res) => {
    db.product.findAll().then((result) => {
    res.send(result);
    });
});

router.put('/', (req, res) => {
    res.send('Put products');
});

// Lägg till produkt i varokorg
router.post('/addProduct', (req, res) => {
    const { userId, productId, amount } = req.body;

    cartService.addProductToCart(userId, productId, amount)
        .then(result => {
            res.status(result.status).json(result.data);
        })
        .catch(error => {
            res.status(500).json({ error: "Ett fel uppstod vid tillägg av produkt i varukorgen", details: error.message });
        });
});


// Ta bort en produkt från varukorgen
router.delete('/removeProduct', (req, res) => {
    const { userId, productId } = req.body;

    cartService.removeProductFromCart(userId, productId)
        .then(result => {
            res.status(result.status).json(result.data);
        })
        .catch(error => {
            res.status(500).json({ error: "Ett fel uppstod vid borttagning av produkt från varukorgen", details: error.message });
        });
});  

//Simulera ett köp        Skapad idag
router.post('/checkout', (req, res) => {
    const {userId} = req.body;

    cartService.completePurchase(userId)
    .then(result => {
        res.status(result.status).json(result.data);
    })
    .catch(error => {
        res.status(500).json({error: "Ett fel uppstod vid genomförandet av köpet", details: error.message});
    });
});

// Vi en användares varukorg 
router.get('/:userId', (req, res) => {
    //hämta upp userId
    const userId = req.params.userId;
    cartService.showProductsInCart(userId)
    .then(result => {
        res.status(result.status).json(result.data);
    })
    .catch(error => {
        res.status(500).json({error: "Något gick fel vid hämtning av varukorgen"})
    })
});
module.exports = router;