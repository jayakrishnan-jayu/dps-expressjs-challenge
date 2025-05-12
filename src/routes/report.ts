import express, { Request, Response } from 'express';
import { reportSvc } from '../services';

const router = express.Router();

router.route('/').get(reportSvc.getAll).post(reportSvc.create);

router
	.route('/:id')
	.get(reportSvc.byID)
	.put(reportSvc.update)
	.delete(reportSvc.remove);

router.get('/special-report', (req: Request, res: Response) => {
	res.send('speical report');
});

router.get('/:project-id', (req: Request, res: Response) => {
	res.send(`reports with id ${req.params['project-id']}`);
});

export default router;
