const router = require('express').Router();
const db = require('../models');
const cartService = require('../services/cartService'); 

//Lägger till en produkt i användarens senaste varukorg
router.post('/addProduct', async (req, res) => {
    const { userId, productId, amount } = req.body;

    cartService.addProductToCart(userId, productId, amount).then(result => res.status(result.status).json(result.data))
    .catch(error => {
      res.status(500).json("Det gick inte att lägga tilli varukorgen");
    });
});

//Hämta alla produkter i varukorgen
router.get('/', (req, res) => {
    db.product.findAll().then((result) => {
    res.send(result);
    });
}); 

router.put('/', (req, res) => {
    res.send('Put products');
});

// Ta bort en produkt från varukorgen
router.delete('/removeProduct', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const result = await cartService.removeProductFromCart(userId, productId);
        res.status(result.status).json(result.data);
    } catch (error) {
        res.status(500).json(error.data);
    }                      1
}); 

//Simulera ett köp        
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

//Uppdatera produkt antal
router.put('/updateProduct', async (req, res) => {
    const { userId, productId, resultAmount } = req.body;
    const result = await cartService.updateAmount(userId, productId, resultAmount );
    res.status(result.status).json(result.data);
  });

module.exports = router;