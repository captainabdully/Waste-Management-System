const express = require('express');
const router = express.Router();
const droppingPointController = require('../controllers/droppingPointController');
const { isAdmin } = require('../middleware/auth');

router.post('/', isAdmin, droppingPointController.createDroppingPoint);
router.get('/', droppingPointController.getAllDroppingPoints);
router.get('/:id', droppingPointController.getDroppingPointById);
router.put('/:id', isAdmin, droppingPointController.updateDroppingPoint);
router.delete('/:id', isAdmin, droppingPointController.deleteDroppingPoint);

module.exports = router;