import { Router } from 'express';

import { JobController } from '../controllers/job.controller';
import { container } from "tsyringe";

const router = Router();
const jobController = container.resolve(JobController);

router.get('/', jobController.index);
router.get('/:uuid', jobController.show);
router.get('/user/:user_uuid', jobController.showByUserUuid);
router.post('/', jobController.store);
router.put('/:uuid', jobController.update);
router.delete('/:uuid', jobController.delete);

export default router;
