'use strict';

var BluePromise = require('bluebird');

var moduleTestCollection = require('./moduleTestCollection');

var add = function(object) {
    return moduleTestCollection.add(object);
}

var list = function(){
    return moduleTestCollection.list();
}

var get = function(id) {
    return moduleTestCollection.get(id);
}

var update = function(id, object) {
    return moduleTestCollection.update(id, object);
}

var remove = function(id) {
    return moduleTestCollection.remove(id);
}

module.exports = {
    add : add,
    list : list,
    get : get,
    update : update,
    remove : remove
};