const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController');

router.get('/', loansController.getAllLoans);
router.post('/', loansController.createLoan);

module.exports = router;
