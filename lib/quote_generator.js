var data = require('../data/fake_data.js');
var mongoWrapper = require('./mongo_wrapper.js');
var util = require('util');
var quoteGenerator = {};

quoteGenerator.getRandomArbitrary = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

quoteGenerator.randomizeQuote = function() {
    var quote = {};
    var length = data.length;

    return this.getRandomArbitrary(0, length).toString();
};

quoteGenerator.randomize = function(callback) {
    var quoteIndex = this.randomizeQuote();
    // console.log('quoteGenerator ::: quoteIndex [%s]', util.inspect(quoteIndex));

    // console.log('quoteGenerator ::: callback [%s]', util.inspect(callback));
    var query = mongoWrapper.findOne('quotes', {index: quoteIndex}, callback);

};

quoteGenerator.getByName = function(name, callback) {
    // var chosenQuote;
    // data.forEach(function(item) {
    //     if (item.short_name === name) {
    //         chosenQuote = item;
    //     }
    // });

    var query = mongoWrapper.findOne('quotes', {short_name: name}, callback);
    // return chosenQuote;
};

module.exports = quoteGenerator;