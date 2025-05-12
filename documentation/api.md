# API Documentation

### Project Routes

`GET /project`

Description: Retrieve all projects.

`POST /project`

Description: Create a new project.

Request Body:
```
{
  "name": "string",
  "description": "string"
}
```
- Both `name` and `description` are required to create a project

Response Body:
```
{
    "updateID": number
}
```
- `updateID` gives the id of the created project.
- 400 Bad Request: If the input is invalid.

`GET /project/:id`

Description: Retrieve project by id.

URL Parameters: 
- id: The unique identifier for the project.

Query Parameters: 
- includeReports: true | false (optional)
    *  include reports associated with the project 



`PUT /project/:id`

Description: Update an existing project by its id.

URL Parameters: 
- id: The unique identifier for the project.

Request Body:
```
{
  "name": "string",
  "description": "string"
}
```
- Both `name` and `description` are required to update a project

Response Body:
```
{
  "success": true
}
```
- 400 Bad Request: If the input is invalid.

`DELETE /project/:id`

Description: Delete a project by its id.

URL Parameters: 
- id: The unique identifier for the project.

Response:
```
{
  "success": true
}
```
- 200 OK: Returns a success message.
- 404 Not Found: If the project with the given id does not exist.


### Report Routes
`GET /report`

Description: Retrieve all reports.

`POST /report`

Description: Create a new report.

Request Body:
```
{
  "text": "string",
  "projectid": "number"
}
```
- Both `text` and `projectid` are required to create a project

Response Body:
```
{
    "updateID": number
}
```
- `updateID` gives the id of the created report.
- 400 Bad Request: If the input is invalid.
- 
`GET /report/special-report`

Description: Retrieve list of reports where the occurences of the word passed is equal to greater than 3 in a report.

Request Body:
```
{
  "word": "string"
}
```

`GET /report/:id`

Description: Retrieve project by id.

URL Parameters: 
- id: The unique identifier for the project.

`PUT /report/:id`

Description: Update an existing report by its id.

URL Parameters: 
- id: The unique identifier for the project.

Request Body:
```
{
  "text": "string",
  "projectid": "number"
}
```
- Both `text` and `projectid` are required to update a project

Response Body:
```
{
  "success": true
}
```
- 400 Bad Request: If the input is invalid.

`DELETE /report/:id`

Description: Delete a report by its id.

URL Parameters: 
- id: The unique identifier for the report.

Response:
```
{
  "success": true
}
```
- 200 OK: Returns a success message.
- 404 Not Found: If the project with the given id does not exist.

