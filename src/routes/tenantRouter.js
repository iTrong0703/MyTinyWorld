const { Router } = require('express');

const tenantController = require('../controllers/tenantController');

const router = Router();

router.get('/', tenantController.index);



module.exports = router;