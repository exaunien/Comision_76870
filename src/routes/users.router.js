import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import { authToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', usersController.getAllUsers);
router.post('/register', usersController.createUser);
router.post('/login', usersController.login);
router.get('/profile', authToken, usersController.profile);
router.put('/restore-password', usersController.restorePassword);
router.get('/:uid', usersController.getUser);
router.put('/:uid', usersController.updateUser);
router.delete('/:uid', usersController.deleteUser);

export default router;
