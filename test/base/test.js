'use strict';

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var BluePromise = require('bluebird');

var beverages_a = { tea: [ 'chai', 'matcha', 'oolong' ] };
var beverages_b = { tea: [ 'chai', 'matcha', 'oolong' ] };

before(function(){
	console.log('Inicio de los test (o por ejemplo levantar la conexion a la db)');
});

describe('Testing ', function(){
  describe('Sync behavior', function(){
    it('should berages be deeply equal', function(){
		return expect(beverages_a).to.be.deep.equal(beverages_b);
    });
  });
  
  describe('Async behavior', function(){
    it('should beverages be deeply equal after timeout using done', function(done){
		setTimeout(function(){
			expect(beverages_a).to.be.deep.equal(beverages_b);
			done();
		},120);
    });
	
	it('should resolve beverages be deeply equal using promises', function(){
		//expect(BluePromise.resolve({ foo: "bar" })).to.eventually.have.property("foo");
		return expect(BluePromise.resolve(beverages_a)).to.be.eventually.deep.equal(beverages_b);
    });

      it('should reject beverages be deeply equal using promises', function(){
          //expect(BluePromise.resolve({ foo: "bar" })).to.eventually.have.property("foo");
          return expect(BluePromise.reject(new Error("TEst reject"))).to.be.rejected;
      });
  });
});

after(function(){
	console.log('Cierre de los test (o por ejemplo borrar los ejemplos de db y cerrar la conexion)');
});