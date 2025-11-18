import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.getUserById);
router.put('/:user_id', userController.updateUser);
router.delete('/:user_id', userController.deleteUser);
router.get('/:user_id/with-roles', userController.getUserWithRoles);

export default router;