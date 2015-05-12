'use strict';

var BluePromise = require('bluebird');

var add = function(object) {
    var randomId = Math.random() * (1000 - 50) + 50;

    if(randomId >= 500 && randomId <600){
        return BluePromise.reject(new Error('random en 600'));
    } else {
        return BluePromise.resolve({id:randomId});
    }
}

var list = function(){

}

var get = function(id) {

}

var update = function(id, object) {

}

var remove = function(id) {

}

module.exports = {
    add : add,
    list : list,
    get : get,
    update : update,
    remove : remove
};