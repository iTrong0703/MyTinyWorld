
const { Router } = require('express');

const { requireAuth } = require('../middlewares/authMiddleware');
const homeController = require('../controllers/homeController');

const router = Router();

router.get('/', requireAuth, homeController.index);



module.exports = router;
