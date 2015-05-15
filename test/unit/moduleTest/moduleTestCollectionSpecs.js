'use strict';

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var BluePromise = require('bluebird');
var _ = require('underscore');

var moduleTestCollection = require('../../../src/moduleTest/moduleTestCollection');

var somebaseObject = {testing:true, files: Math.random()};

describe('Module Test Collection ', function(){
  describe('Add operations', function(){
    it('Should resolve add an object and get the id and lastUpdate', function(){
		var someObject = _.clone(somebaseObject);
        var addPromise = moduleTestCollection.add(someObject);
        return BluePromise.all([
            expect(addPromise).to.eventually.contain.all.keys(['id', 'testing', 'files', 'lastUpdate']),
            expect(addPromise).to.eventually.have.property('id').not.null,
            expect(addPromise).to.eventually.have.property('testing').equal(someObject.testing),
            expect(addPromise).to.eventually.have.property('files').equal(someObject.files),
            expect(addPromise).to.eventually.have.property('lastUpdate').not.null

        ]);
    });
  });
});