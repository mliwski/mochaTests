'use strict';

var express = require('express');
var router = express.Router();

var moduleTestServices = require('./moduleTestServices');

router.post('/', function (req, res, next) {
    moduleTestServices.add(req.body).then(function(result) {
        res.json(result);
    }).catch(next);

});

router.get('/', function (req, res) {
    res.json('Hello World!');
});

router.get('/:id', function (req, res) {
    res.json('Hello World!');
});

router.put('/:id', function (req, res) {
    res.json('Hello World!');
});

router.delete('/:id', function (req, res) {
    res.json('Hello World!');
});

module.exports = router;