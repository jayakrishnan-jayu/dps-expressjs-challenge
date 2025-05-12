import { projectRepo } from '../repository';
import { Request, Response } from 'express';

export function getAll(req: Request, res: Response) {
	res.json(projectRepo.findAll());
}

export function byID(req: Request, res: Response) {
	const { id } = req.params;
	const { includeReports } = req.query;
	if (isNaN(Number(id))) {
		return res.status(400).json({ error: 'Invalid ID' });
	}
	if (
		includeReports &&
		!(
			includeReports === '' ||
			includeReports === 'true' ||
			includeReports === 'false'
		)
	) {
		return res.status(400).json({
			error: "'includeReports' parameter should be either empty, true or false",
		});
	}
	const inclRprts = includeReports
		? includeReports.toString() === 'true'
		: false;
	const project = projectRepo.findByID(Number(id), inclRprts);
	if (project.error != '') {
		return res.status(400).json({ error: project.error });
	}
	res.json({ project: project.project, reports: project.reports });
}

export function create(req: Request, res: Response) {
	const { name, description } = req.body;
	if (
		name === undefined ||
		name.toString() === '' ||
		description === undefined ||
		description.toString() === ''
	) {
		return res
			.status(400)
			.json({ error: "'name' and 'description' must be provided" });
	}
	const result = projectRepo.create(name, description);
	if (result.error != '') {
		return res.status(400).json({ error: result.error });
	}
	res.json({ updateID: result.updateID });
}

export function update(req: Request, res: Response) {
	const { id } = req.params;
	const { name, description } = req.body;
	if (isNaN(Number(id))) {
		return res.status(400).json({ error: 'Invalid project ID' });
	}
	if (
		name === undefined ||
		name.toString() === '' ||
		description === undefined ||
		description.toString() === ''
	) {
		return res
			.status(400)
			.json({ error: "'name' and 'description' must be provided" });
	}
	const result = projectRepo.update(Number(id), name, description);
	if (result.error != '') {
		return res.status(400).json({ error: result.error });
	}

	return res.json({ success: result.success });
}

export function remove(req: Request, res: Response) {
	const { id } = req.params;
	if (isNaN(Number(id))) {
		return res.status(400).json({ error: 'Invalid project ID' });
	}
	const result = projectRepo.remove(Number(id));

	if (result.error != '') {
		return res.status(400).json({ error: result.error });
	}
	return res.json({ success: result.success });
}
