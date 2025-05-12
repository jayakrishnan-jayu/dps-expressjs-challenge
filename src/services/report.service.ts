import { projectRepo, reportRepo } from '../repository';
import { Request, Response } from 'express';

export function getAll(req: Request, res: Response) {
	res.json(reportRepo.findAll());
}

export function byID(req: Request, res: Response) {
	const { id } = req.params;
	if (isNaN(Number(id))) {
		return res.status(400).json({ error: 'Invalid ID' });
	}
	const report = reportRepo.findByID(Number(id));
	if (report.error != '') {
		return res.status(400).json({ error: report.error });
	}
	res.json({ report: report.report });
}

export function create(req: Request, res: Response) {
	const { text, projectID } = req.body;
	if (
		text === undefined ||
		text.toString() === '' ||
		projectID === undefined ||
		isNaN(Number(projectID))
	) {
		return res
			.status(400)
			.json({ error: "'text' and 'projectID' must be provided" });
	}
	const result = reportRepo.create(text.toString(), Number(projectID));
	if (result.error != '') {
		return res.status(400).json({ error: result.error });
	}
	res.json({ updateID: result.updateID });
}

export function update(req: Request, res: Response) {
	const { id } = req.params;
	const { text, projectid } = req.body;
	if (isNaN(Number(id))) {
		return res.status(400).json({ error: 'Invalid project ID' });
	}
	if (
		text === undefined ||
		text.toString() === '' ||
		projectid === undefined ||
		isNaN(Number(projectid))
	) {
		return res
			.status(400)
			.json({ error: "'text' and 'projectid' must be provided" });
	}
	const project = projectRepo.findByID(projectid);
	if (project.error != '') {
		return res.status(400).json({ error: project.error });
	}
	const result = reportRepo.update(Number(id), text, Number(projectid));
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
	const result = reportRepo.remove(Number(id));

	if (result.error != '') {
		return res.status(400).json({ error: result.error });
	}
	return res.json({ success: result.success });
}
