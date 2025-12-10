import { Router } from 'express';
import * as Controllers from '../controllers/mocks.controller.js';

const router = Router();

router.get('/users', Controllers.getUsers);
router.get('/mockingUsers', Controllers.createUserMock);
router.get('/pets', Controllers.getPets);
router.get('/mockingPets', Controllers.createPetMock);
router.post('/generateData', Controllers.generateData);

export default router;
