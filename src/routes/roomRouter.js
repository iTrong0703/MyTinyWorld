const { Router } = require('express');

const roomController = require('../controllers/roomController');

const router = Router();

router.get('/', roomController.index);
router.get('/edit_room', roomController.getEditRoom);
router.get('/edit_invoice', roomController.getEditInvoice);





module.exports = router;