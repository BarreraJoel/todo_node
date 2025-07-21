import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth/auth.middleware';
import { container } from "tsyringe";

const router = Router();
const authController = container.resolve(AuthController);
const authMiddleware = container.resolve(AuthMiddleware);

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/user', authMiddleware.handle, authController.user);
router.get('/logout', authMiddleware.handle, authController.logout);

export default router;
