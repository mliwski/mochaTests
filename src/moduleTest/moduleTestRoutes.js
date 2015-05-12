'use strict';

var express = require('express');
var router = express.Router();

var moduleTestServices = require('./moduleTestServices');

router.post('/', function (req, res, next) {
    console.log(JSON.stringify(req.body));
    moduleTestServices.add(req.body).then(function(result) {
        res.json(result);
    }).catch(next);
});

router.get('/', function (req, res, next) {
    moduleTestServices.list().then(function(result) {
        res.json(result);
    }).catch(next);
});

router.get('/:id', function (req, res, next) {
    moduleTestServices.get(req.params.id).then(function(result) {
        res.json(result);
    }).catch(next);
});

router.put('/:id', function (req, res, next) {
    moduleTestServices.update(req.params.id, req.body).then(function(result) {
        res.json(result);
    }).catch(next);
});

router.delete('/:id', function (req, res, next) {
    moduleTestServices.remove(req.params.id).then(function(result) {
        res.json(result);
    }).catch(next);
});

module.exports = router;