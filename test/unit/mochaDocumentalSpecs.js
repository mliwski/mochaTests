'use strict';

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var BluePromise = require('bluebird');

var beverages_a = { tea: [ 'chai', 'matcha', 'oolong' ] };
var beverages_b = { tea: [ 'chai', 'matcha', 'oolong' ] };

before(function(){
    console.log('');
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
            return expect(BluePromise.resolve(beverages_a)).to.be.eventually.deep.equal(beverages_b);
        });

        it('should resolve several expect using promises', function(){
            var aPromise = BluePromise.resolve(beverages_a);
            return BluePromise.all([
                expect(aPromise).to.eventually.have.property('tea').not.to.be.empty,
                expect(aPromise).to.eventually.have.property('tea').to.be.instanceof(Array)
            ]);
        });


        it('should reject beverages be deeply equal using promises', function(){
            return expect(BluePromise.reject(new Error("Test reject"))).to.be.rejected;
        });
    });
});

after(function(){
    console.log('');
    console.log('Cierre de los test (o por ejemplo borrar los ejemplos de db y cerrar la conexion)');
});