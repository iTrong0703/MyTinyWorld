const { Router } = require('express');

const roomController = require('../controllers/roomController');

const router = Router();

router.get('/', roomController.index);



module.exports = router;