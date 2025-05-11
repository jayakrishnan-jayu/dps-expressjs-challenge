import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	res.send('all reports');
});

router.get('/special-report', (req: Request, res: Response) => {
	res.send('speical report');
});

router.get('/:id', (req: Request, res: Response) => {
	res.send(`report with id ${req.params['id']}`);
});

router.get('/:project-id', (req: Request, res: Response) => {
	res.send(`reports with id ${req.params['project-id']}`);
});

router.post('/', (req: Request, res: Response) => {
	res.send('create report');
});

router.put('/:id', (req: Request, res: Response) => {
	res.send(`update report ${req.params['id']}`);
});

router.delete('/:id', (req: Request, res: Response) => {
	res.send(`delete report with id ${req.params['id']}`);
});

export default router;
