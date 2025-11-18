const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.post('/', roleController.createUserRole);
router.get('/', roleController.getAllRoles);
router.put('/:user_id', roleController.updateUserRole);
router.delete('/:user_id', roleController.deleteUserRole);

module.exports = router;