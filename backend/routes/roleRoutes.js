import express from 'express';
import roleController from '../controllers/roleController.js';

const router = express.Router();

router.post('/', roleController.createUserRole);
router.get('/', roleController.getAllRoles);
router.put('/:user_id', roleController.updateUserRole);
router.delete('/:user_id', roleController.deleteUserRole);

export default router;