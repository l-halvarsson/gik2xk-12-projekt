const router = require('express').Router();
const db = require('../models');
const cartService = require('../services/cartService'); //Tillagd idag

//Lägger till en produkt i användarens senaste varukorg
router.post('/addProduct', async (req, res) => {
    const { userId, productId, amount } = req.body;

    cartService.addProductToCart(userId, productId, amount).then(result => res.status(result.status).json(result.data))
    .catch(error => {
      res.status(500).json("Det gick inte att lägga tilli varukorgen");
    });
});




router.get('/', (req, res) => {
    db.product.findAll().then((result) => {
    res.send(result);
    });
}); 

router.put('/', (req, res) => {
    res.send('Put products');
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

module.exports = router;