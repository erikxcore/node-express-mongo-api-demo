
This is an example of a RESTful web service in a MEAN stack.
Currently features standard POST/PUT/GET/DELETE routes, JSON token authentication, some use of cookies, and a simple demonstration of salt/hashed passwords for users.

TO DO: Unit testing with Jasmine or other alternative, Possible improvements in regards to updating and deleting posts (currently doesn't ensure the author is deleting). Possible enhancements further down the line if the front-end requies it. Create front-end project and implementation. Automatically authenticate user after account creation.

Caveat to note: In order to 'log out' users the token will have to be invalidated - how this occurs is up to the front-end implementor. Either the header could be reset or the variable itself could be lost. Currently this service simply returns JSON, so it will be up to the front-end to provide proper view routing or error messages depending on the usecase.

Technologies used:
Node, MongoDB, Express, NPM (will require Ruby), Postman (easy testing for requests), Nodemon (live updating Node server during development), JavaScript
Mocha and supertest are used for unit testing 
MongoDB hosted by mLab
Web service hosted by Heroku - https://immense-gorge-22729:8351.herokuapp.com/