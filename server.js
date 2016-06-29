//Framework and modules
var express     = require('express');
var app         = express();
var cookieParser = require('cookie-parser');
var Promise = require("bluebird");
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
Promise.promisifyAll(mongoose);
//Application specific
var config = require('./config'); 

var port = process.env.PORT || 8351; //Port Node will listen on  
mongoose.connect(config.database); //Initiate DB connection through config file

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//use cookie parser
app.use(cookieParser());

//allows mongose and all it's models to be available as functions that return a promise
mongoose.Promise = require('bluebird');
Promise.promisifyAll(mongoose);


var routes = require('./app/routes/routes');
app.use('/api', routes); //if we wanted to serve the api seperately we could use app.use('/api',apiroutes);


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
