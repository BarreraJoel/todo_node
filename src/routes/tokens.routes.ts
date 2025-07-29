import { Router } from 'express';
import { container } from "tsyringe";
import { TokenController } from '../controllers/token.controller';
import { unless } from "express-unless";
import { AuthMiddleware } from '../middlewares/auth/auth.middleware';

const router = Router();
const authMiddleware = container.resolve(AuthMiddleware);
const tokenController = container.resolve(TokenController);

router.get('/', tokenController.index);
router.get('/:uuid', tokenController.show);
router.post('/', tokenController.store);
router.put('/:uuid', tokenController.update);
router.delete('/:uuid', tokenController.delete);

router.post('/refresh', tokenController.refresh);

export default router;
