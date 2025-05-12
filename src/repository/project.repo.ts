import db from '../services/db.service';

export function findAll() {
	return db.query('SELECT id, name, description from projects');
}

export function findByID(ID: number, includeReports: boolean = false) {
	const project = db.query(
		'SELECT id, name, description FROM projects WHERE id = @id',
		{ id: ID.toString() },
	);

	if (project.length == 0) {
		return { project: [], reports: [], error: 'project not found' };
	}

	let reports: unknown[] = [];
	if (includeReports) {
		reports = db.query(
			'SELECT id, text FROM reports WHERE projectid = @projectid',
			{ projectid: ID.toString() },
		);
	}

	return {
		project: project[0],
		reports: reports,
		error: '',
	};
}

export function create(name: string, description: string) {
	const result = db.run(
		'INSERT INTO projects (name, description) VALUES(@name, @description)',
		{
			name: name,
			description: description,
		},
	);

	if (result.changes == 0) {
		return {
			updateID: result.lastInsertRowid,
			error: 'Could not insert project',
		};
	}
	return {
		updateID: result.lastInsertRowid,
		error: '',
	};
}

export function update(ID: number, name: string, description: string) {
	const result = db.run(
		'UPDATE projects SET name = @name, description = @description WHERE id = @id',
		{ id: ID.toString(), name: name, description: description },
	);

	if (result.changes == 0) {
		return {
			success: false,
			error: 'Error updating project',
		};
	}
	return {
		success: true,
		error: '',
	};
}

export function remove(ID: number) {
	const result = db.run('DELETE FROM projects WHERE id = @id', {
		id: ID.toString(),
	});

	if (result.changes == 0) {
		return {
			success: false,
			error: 'Error deleting project',
		};
	}
	return {
		success: true,
		error: '',
	};
}
