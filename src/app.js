var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var testRoutes = require('./moduleTest/moduleTestRoutes');

var errors = require('./commons/errors');

// parse application/json
app.use(bodyParser.json());

//Custom middelware to accept only application/json content types
app.use(function(req, res, next) {
    if (req.headers['content-type'] !== 'application/json') {
		res.status(406);
		res.setHeader('Error', 'Only accept application/json content types');
		res.end();
	} else {
		next();
	}
});

app.use('/tests', testRoutes);



//TODO: The error treatment could by first application treatment then default treatment in separated middleware
/*jshint unused: vars*/
//Error handler
app.use(function(error, req, res, next) {
    if(error.stack){
        console.error(error.stack);
    }

    var status, message;

    //Special treatment
    if(error instanceof errors.NotFoundError) {
        status = 404;
        message = error.message;
    }

    // Default 500 "Internal Server Error".
    res.status(status || 500);
    res.setHeader('Error', message || 'Internal Server Error');
    res.end();
});

app.set('x-powered-by', false);
var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});