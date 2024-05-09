const { Router } = require('express');

const buildingController = require('../controllers/buildingController');

const router = Router();

router.get('/', buildingController.index);
router.get('/add_building', buildingController.getAddBuilding);
router.get('/getbuilding', buildingController.getBuilding);

module.exports = router;
