import express from 'express';
import { projectSvc } from '../services';

const router = express.Router();

router.route('/').get(projectSvc.getAll).post(projectSvc.create);

router
	.route('/:id')
	.get(projectSvc.byID)
	.put(projectSvc.update)
	.delete(projectSvc.remove);

export default router;
