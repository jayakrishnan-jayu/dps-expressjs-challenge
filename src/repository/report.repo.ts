import db from '../services/db.service';

export function findAll() {
	return db.query('SELECT id, text, projectid from reports');
}

export function findByID(ID: number) {
	const report = db.query(
		'SELECT id, text, projectid FROM reports WHERE id = @id',
		{ id: ID.toString() },
	);

	if (report.length == 0) {
		return { project: [], reports: [], error: 'report not found' };
	}

	return {
		report: report,
		error: '',
	};
}

export function create(text: string, projectID: number) {
	const project = db.query('SELECT id FROM projects WHERE id = @id', {
		id: projectID.toString(),
	});

	if (project.length == 0) {
		return { project: [], reports: [], error: 'project not found' };
	}
	const result = db.run(
		'INSERT INTO reports (text, projectid) VALUES(@text, @projectid)',
		{
			text: text,
			projectid: projectID.toString(),
		},
	);

	if (result.changes == 0) {
		return {
			updateID: result.lastInsertRowid,
			error: 'Could not insert report',
		};
	}
	return {
		updateID: result.lastInsertRowid,
		error: '',
	};
}

export function update(ID: number, text: string, projectID: number) {
	const result = db.run(
		'UPDATE reports SET text = @text, projectid = @projectid WHERE id = @id',
		{ id: ID.toString(), text: text, projectid: projectID.toString() },
	);

	if (result.changes == 0) {
		return {
			success: false,
			error: 'Error updating report',
		};
	}
	return {
		success: true,
		error: '',
	};
}

export function remove(ID: number) {
	const result = db.run('DELETE FROM reports WHERE id = @id', {
		id: ID.toString(),
	});

	if (result.changes == 0) {
		return {
			success: false,
			error: 'Error deleting report',
		};
	}
	return {
		success: true,
		error: '',
	};
}

export function specialReport(word: string) {
	return db.query(
		"select id, text, projectid from reports where (length(text) - length(replace(lower(text), @word, '' ))) / length(@word) >= 3;",
		{
			word: word,
		},
	);
}
