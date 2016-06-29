
This is an example of a RESTful web service in a MEAN stack.
Currently features standard POST/PUT/GET/DELETE routes, JSON token authentication, some use of cookies, a simple extension of promises for Mongoose, and a simple demonstration of salt/hashed passwords for users.

To re-create the development environment just run 'npm install' to pull in all node modules into /node_modules.

TO DO: 
Unit testing with Jasmine or other alternative
Possible enhancements further down the line if the front-end requies it. 
Create front-end project and implementation. 
Automatically authenticate user after account creation.

Caveat to note: In order to 'log out' users the token will have to be invalidated - how this occurs is up to the front-end implementor. Either the header could be reset or the variable itself could be lost. Currently this service simply returns JSON, so it will be up to the front-end to provide proper view routing or error messages depending on the usecase. A route could be provided to terminate the cookie and token for a production application.

Technologies used:
Node, MongoDB, Express, NPM (will require Ruby), Postman (easy testing for requests), Nodemon (live updating Node server during development), JavaScript
Mocha and supertest are used for unit testing. While testing locally, Postman will have issues against localhost cookies.

MongoDB hosted by mLab

Web service hosted by Heroku - https://immense-gorge-22729:8351.herokuapp.com/

Note - the node_modules folder is redundant and should be ignored via a .gitignore file.