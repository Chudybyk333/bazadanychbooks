const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');

router.post('/', authorsController.addAuthor);

module.exports = router;
