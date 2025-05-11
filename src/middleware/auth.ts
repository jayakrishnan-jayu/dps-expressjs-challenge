import { Request, Response, NextFunction } from 'express';

export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (!req.headers.authorization) {
		res.statusCode = 401;
		res.send('Missing authorization');
		return;
	}

	if (req.headers.authorization != 'Password123') {
		res.statusCode = 401;
		res.send('Invalid authorization');
		return;
	}
	next();
}
