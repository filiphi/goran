var expect = require("chai").expect;
var sinon  = require('sinon');
var rewire = require('rewire');

var personalize = rewire("../lib/personalize.js");

describe('personalize', function() {
    describe('.validateQuote()', function() {
        var validateQuote;

        before(function () {
            validateQuote = personalize.__get__('validateQuote');
        });

        it('is a function', function() {
            expect(validateQuote).to.be.a.function;
        });

        it('to throw an error if the quote is missing', function() {
            var error = validateQuote();
            expect(error).to.be.an.Error;
        });

        it('to throw an error if the quote lacks an ID', function() {
            var quote = {'asdf':'asdf'};
            var error = validateQuote(quote);
            expect(error).to.be.an.Error;
        });

        it('to throw not throw an error if the quote has an ID', function() {
            var quote = {'id':'asdf'};
            var error = validateQuote(quote);
            expect(error).to.be.false;
        });

    });

    describe('.startReplace()', function() {

        var getOne;
        var getOneSpy;
        var callback;
        before(function () {

          getOne = personalize.__get__('getOne');
          getOneSpy = sinon.spy();

          callback = function() {};

          personalize.__set__('getOne', getOneSpy);
        });

        it('is a function', function() {
            expect(personalize.startReplace).to.be.a.function;
        });

        it('should throw an error if no quote is passed', function() {
            expect(personalize.startReplace).to.throw(Error);
        });

        it('should throw an error if the quote lacks an id', function() {
            var quote = {
                'asdf': 'asdf'
            };
            expect(function() { personalize.startReplace(quote); }).to.throw(Error);
        });


        it('should call getOne', function() {
            var quote = {
                'id': 'asdf'
            };
            personalize.startReplace(quote, callback);

            expect(getOneSpy.calledOnce).to.be.true;
        });

        after(function() {
            // restore someFunc manually
            personalize.__set__('getOne', getOne);
        });
    });
});