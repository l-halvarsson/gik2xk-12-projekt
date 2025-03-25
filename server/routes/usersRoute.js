const router = require('express').Router();
const db = require('../models');
const userService = require('../services/userService');




//Skapa en användare
router.post('/', (req, res) => {

    const newUserData = req.body;
    userService.createUser(newUserData).
    then(result => res.status(result.status).json(result.data))
    .catch(() => res.status(500).json({ error: 'Kunde inte skapa användaren' }));
});
// Hämta alla användare
router.get('/', (req, res) => {
    userService.getAllUsers().
    then(result => res.status(result.status).json(result.data))
    .catch(() => res.status(500).json({ error: 'Kunde inte hämta några användare' }));
});
// Hämta  en specific user baserat på id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  userService.getUserById(id)
      .then(result => {
          res.status(result.status).json(result.data);
      })
});
//Hämta användarens senaste varukorg
router.get('/:id/getCart', (req, res) => {
    const userId = req.params.id;
  
    userService.getUserCart(userId).then(result => res.status(result.status).json(result.data))
      .catch(error => {
        res.status(500).json({ error: 'Den här användarens senaste varukorg går ej att hämta' });
      });
});



module.exports = router;