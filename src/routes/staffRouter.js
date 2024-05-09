const { Router } = require('express');

const staffController = require('../controllers/staffController');

const router = Router();

router.get('/', staffController.index);
router.get('/add_staff', staffController.getAddStaff);


module.exports = router;