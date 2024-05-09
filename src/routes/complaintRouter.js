const { Router } = require('express');

const complaintController = require('../controllers/complaintController');

const router = Router();

router.get('/', complaintController.index);
router.get('/add_complaint', complaintController.getAddComplaint);


module.exports = router;