const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// GET routes for general  and id params searching
router.get('/', contactsController.getContacts);

//POST
router.post('/', contactsController.createContact);

//PUT - UPDATE
router.put('/:id', contactsController.updateContact);

//DELETE
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
