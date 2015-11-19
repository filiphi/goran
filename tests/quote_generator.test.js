var expect = require("chai").expect;
var sinon  = require('sinon');

var quoteGenerator = require("../lib/quote_generator.js");

describe('quoteGenerator', function() {
    describe('.randomizeQuote()', function() {
        it('is a function', function() {
            expect(quoteGenerator.randomizeQuote).to.be.a.function;
        });

        it('should return an object', function() {
            var quote = quoteGenerator.randomize();
            expect(quote).to.be.an.object;
        });
    });

    describe('.randomize()', function() {
        it('is a function', function() {
            expect(quoteGenerator.randomize).to.be.a.function;
        });

        it('should call randomizeQuote', function() {
            var spy = sinon.spy(quoteGenerator, "randomizeQuote");
            quoteGenerator.randomize();
            expect(spy.calledOnce).to.be.true;
        });

        it('should return an object', function() {
            var quote = quoteGenerator.randomize();
            expect(quote).to.be.an.object;
        });
    });
});