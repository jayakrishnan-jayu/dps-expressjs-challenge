ALTER TABLE projects RENAME TO projects_old;
ALTER TABLE reports RENAME TO reports_old;

CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
);

CREATE TABLE reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    projectid INTEGER
);

INSERT INTO projects (id, name, description)
SELECT CAST(id AS INTEGER), name, description FROM projects_old;

INSERT INTO reports (id, text, projectid)
SELECT CAST(id AS INTEGER), text, CAST(projectid AS INTEGER) FROM reports_old;

DROP TABLE projects_old;
DROP TABLE reports_old;

