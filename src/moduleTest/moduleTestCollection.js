'use strict';

var loki = require('lokijs');
var _ = require('underscore');

var db = new loki('loki.json');
var testCollection = db.addCollection('test')

var errors = require('../commons/errors');

var BluePromise = require('bluebird');

var add = function(object) {
    try{
        var insertedObject = testCollection.insert(object);
        var adaptedResponse = adaptResponseToStandardFields(insertedObject);
        return BluePromise.resolve(adaptedResponse);
    } catch (error){
        return BluePromise.reject(error);
    }
}

var list = function(){
    try{
        var list = testCollection.find({});
        var adaptedResponse = list.map(function(object){
            return adaptResponseToStandardFields(object);
        });
        return BluePromise.resolve(adaptedResponse);
    } catch (error){
        console.log(JSON.stringify(error));
        return BluePromise.reject(error);
    }
}

var get = function(id) {
    try{
        var foundObject = testCollection.get(id);
        var adaptedResponse = adaptResponseToStandardFields(foundObject);
        return BluePromise.resolve(adaptedResponse);
    } catch (error){
        return BluePromise.reject(error);
    }
}

var update = function(id, updateObject) {
    try{
        var foundObject = testCollection.get(id);
        if(isValidObject(foundObject) == false) {
            throw new errors.NotFoundError("Can't update object with id : " + id + ", object not found");
        }

        var updatedObject = firstLevelPropertiesUpdate(updateObject, foundObject);
        testCollection.update(updatedObject);
        var adaptedResponse = adaptResponseToStandardFields(updatedObject);
        return BluePromise.resolve(adaptedResponse);
    } catch (error){
        console.log(JSON.stringify(error));
        return BluePromise.reject(error);
    }
}
function firstLevelPropertiesUpdate(object, foundObject) {
    _.keys(object).forEach(function (key) {
        foundObject[key] = object[key];
    });
    return foundObject;
}

var remove = function(id) {
    try{
        var foundObject = testCollection.get(id);
        if(isValidObject(foundObject) == false) {
            throw new errors.NotFoundError("Can't remove object with id : " + id + ", object not found");
        }

        var removedObject = testCollection.remove(foundObject);
        return BluePromise.resolve(removedObject);
    } catch (error){
        return BluePromise.reject(error);
    }
}

function adaptResponseToStandardFields(object) {
    if(isValidObject(object)) {
        var adaptedResponse = _.clone(object);
        var id = adaptedResponse.$loki;
        var lastUpdate = adaptedResponse.meta.updated ? adaptedResponse.meta.updated : adaptedResponse.meta.created;

        delete adaptedResponse.$loki;
        delete adaptedResponse.meta;

        adaptedResponse.id = id;
        adaptedResponse.lastUpdate = lastUpdate;
        return adaptedResponse;
    } else {
        return {};
    }
}
function isValidObject(object) {
    return _.isNull(object) == false && _.isUndefined(object) == false && _.isEmpty(object) == false;
}

module.exports = {
    add : add,
    list : list,
    get : get,
    update : update,
    remove : remove
};