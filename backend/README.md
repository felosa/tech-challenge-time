INSTALL API.

1. Clone the repository.
2. Install dependencies.
   $ npm install
3. Create new database called time-tracker.
4. Create .env with your environment variables:
Example:
   DB_PASS=password
   DB_HOST=127.0.0.1
   DB_USER=user
5. Run migrations.
   $ knex migrate:latest
6. Run the app with nodemon.
   $ npm run dev

END POINTS

List all the sessions:

GET: http://localhost:8000/api/sessions

Start a new session:

POST: http://localhost:8000/api/sessions

    The body should contain the object with this properties:
    description - String
    startTime - Date
    userID - ID

STOP a session

POST: http://localhost:8000/api/sessions/:ID

    The body should contain the object with this properties:
    endTime - String
    type - Date

Delete a session

DELETE: http://localhost:8000/api/sessions/:ID
