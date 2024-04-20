const { Router } = require('express');

const invoiceController = require('../controllers/invoiceController');

const router = Router();

router.get('/generate_invoice', invoiceController.generate_invoice);



module.exports = router;