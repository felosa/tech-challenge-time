INSTALL API.

1. Clone the repository.
2. Install dependencies.
   $ npm install
3. Create new database called time-tracker.
4. Create .env with your environment variables in the backend folder:.

   Example:
      DB_PASS=password

      DB_HOST=127.0.0.1

      DB_USER=user

5. Run migrations.
   $ knex migrate:latest
6. Run the app with nodemon.
   $ npm run dev

END POINTS

List all the completed sessions:

GET: http://localhost:8000/api/sessions

    Params:
    userID - id
    criteria - String["day", "week" or "month"]

List all the current sessions:

GET: http://localhost:8000/api/sessions

    Params:
    userID - id


Start a new session:

POST: http://localhost:8000/api/sessions

    The body should contain the object with this properties:
    description - String
    startTime - Date
    userID - ID

STOP and SAVE a session

POST: http://localhost:8000/api/sessions/:ID

    The body should contain the object with this properties:
    endTime - String
    type - Date

Delete a session

DELETE: http://localhost:8000/api/sessions/:ID

Create an user

POST: http://localhost:8000/api/users

Login 

POST: http://localhost:8000/api/users/login

Return user from token

GET: http://localhost:8000/api/isLogged/:token






