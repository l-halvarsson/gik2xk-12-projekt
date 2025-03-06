const router = require('express').Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.product.findAll().then((result) => {
    res.send(result);
    });
});

router.get('/:id/', async (req, res) => {
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


router.post('/', (req, res) => {
    res.send(req.body);
});

router.put('/', (req, res) => {
    res.send('Put products');
});

router.delete('/', (req, res) => {
    res.send('Delete products');
});

module.export = router;