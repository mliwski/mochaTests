var express = require('express')
var bodyParser = require('body-parser')
var app = express();

var testRoutes = require('./moduleTest/moduleTestRoutes');

// parse application/json
app.use(bodyParser.json())

app.use('/tests', testRoutes);

//Error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);

    // respond with 500 "Internal Server Error".
    res.status(500);
    res.setHeader('Error', 'Internal Server Error');
    res.end();
});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});