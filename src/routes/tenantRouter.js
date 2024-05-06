const { Router } = require('express');

const tenantController = require('../controllers/tenantController');

const router = Router();


router.get('/', tenantController.index);
router.get('/add_tenants', tenantController.getAddTenants);


module.exports = router;