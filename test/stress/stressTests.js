'use strict';
var loadtest = require('loadtest');
var getOptions = {
    url: 'http://localhost:3000/tests',
    concurrency:45,
    maxSeconds: 10,
    headers:{
        'Content-Type': 'application/json'
    },
    method:'GET'
};

var getOptions2 = {
    url: 'http://localhost:3000/tests',
    concurrency:4,
    maxSeconds: 5,
    headers:{
        'Content-Type': 'application/json'
    },
    method:'GET'
};

loadtest.loadTest(getOptions, function(error, result)
{
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Tests run successfully');
    console.log(JSON.stringify(result));
    console.log("Mean Latency : " + result.meanLatencyMs + " ms");
});

loadtest.loadTest(getOptions2, function(error, result)
{
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Tests run successfully');
    console.log(JSON.stringify(result));
    console.log("Mean Latency : " + result.meanLatencyMs + " ms");
});