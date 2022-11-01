# notesAppAPI
APIS CRUD Operation For User module
1- Sign Up (Send email to user) (Apply Joi validation)( token expired in 1 minute )
2- Sign in (send token) (user must be confirmed)(Apply Joi validation)
3- Refresh token 
4- forget password 
5- change password (user must be logged in)
6- DELETE USER (account owner only)(user must be logged in and confirmed)(Apply Joi validation)

7- Get all users (user must be logged in and confirmed)

8- get specific user by id with his notes (user must be logged in and confirmed)(Apply Joi validation)


APIS CRUD Operation For notes module 
GET USER ID FROM TOKEN
1- CREATE note  (user must be logged in and confirmed)(Apply Joi validation)

2- UPDATE note  (user must be logged in and confirmed)(Apply Joi validation)

3- DELETE note  (user must be logged in and confirmed)(Apply Joi validation)

5- get specific note by id (user must be logged in and confirmed)(Apply Joi validation)

6- search about note by (title or content) (user must be logged in and confirmed)(Apply Joi validation)

4- get all notes(user must be logged in)(user must be logged in and confirmed)

7- get notes that created by specific user (Apply Joi validation)
