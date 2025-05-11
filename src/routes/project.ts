import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	res.send('all projects');
});

router.get('/:id', (req: Request, res: Response) => {
	res.send(`project with id ${req.params['id']}`);
});

router.post('/', (req: Request, res: Response) => {
	res.send('create project');
});

router.patch('/:id', (req: Request, res: Response) => {
	res.send(`update project with id ${req.params['id']}`);
});

router.delete('/:id', (req: Request, res: Response) => {
	res.send(`delete project with id ${req.params['id']}`);
});

export default router;
