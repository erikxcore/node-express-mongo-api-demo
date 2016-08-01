
This is an example of a RESTful web service which could be implemented in a MEAN stack or a LAMP stack.

Currently features standard POST/PUT/GET/DELETE routes, JSON token authentication with token refreshing, some use of cookies within the session variable, a simple extension of promises for Mongoose, usage of a session store, and a simple demonstration of salt/hashed passwords for users.

To re-create the development environment just run 'npm install' to pull in all node modules into /node_modules. spec.js is simply where our tests are defined for the Mocha integration/'unit' tests.

TO DO: 
Possible enhancements further down the line if the front-end requires it. 
Create front-end project and implementation. 

Technologies used:
Node, MongoDB, Express, Redis, Sessions, Cookies, NPM (will require Ruby), Postman (easy testing for requests), Nodemon (live updating Node server during development), JavaScript

Mocha and supertest are used for integration testing. While testing locally, Postman will have issues against localhost cookies.

MongoDB hosted by mLab
Redis hosted by Heroku
Web service hosted by Heroku - https://immense-gorge-22729.herokuapp.com/api
