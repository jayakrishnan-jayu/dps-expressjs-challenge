import express from 'express';
import { reportSvc } from '../services';

const router = express.Router();

router.route('/').get(reportSvc.getAll).post(reportSvc.create);
router.get('/special-report', reportSvc.specialReport);

router
	.route('/:id')
	.get(reportSvc.byID)
	.put(reportSvc.update)
	.delete(reportSvc.remove);

export default router;
