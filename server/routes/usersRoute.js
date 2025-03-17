const router = require('express').Router();
const db = require('../models');
const userService = require('../services/userService');




//Skapa en user
router.post('/', (req, res) => {
    //Hämta data från "body" - hämta bild
    const newUserData = req.body;
    userService.createUser(newUserData).then((result) => {
        res.status(result.status).json(result.data);
      });
});


// Hämta  en specific user baserat på id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    userService.getUserById(id)
        .then(result => {
            res.status(result.status).json(result.data);
        })
});


//Ta bort en användare - baserad på id
router.delete('/:id', (req, res) => {
    userService.deletedUserById(req.params.id)
        .then(result => {
            res.status(result.status).json(result.data);
        });
});

// Hämta alla användare
router.get('/', (req, res) => {
    userService.getAllUsers().then((result) => {
        res.status(result.status).json(result.data);
        });
    });

module.exports = router;