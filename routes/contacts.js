const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// GET routes for general  and id params searching
router.get('/', contactsController.getContacts);

module.exports = router;
