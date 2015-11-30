var mongoWrapper = require('./mongo_wrapper.js');
var util = require('util');

var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: 'Goran:Mongo_Wrapper'
});

var quoteGenerator = {};


quoteGenerator.getRandomArbitrary = function(min, max) {
    log.info('In getRandomArbitrary, min is  ' + util.inspect(min));
    log.info('In getRandomArbitrary, max is  ' + util.inspect(max));
    return Math.floor(Math.random() * (max - min)) + min;
};



quoteGenerator.randomizeQuote = function(callback) {
    log.info('In randomize Quote');
    mongoWrapper.count('quotes', {}, function (size) {
        log.info('In randomize Quote callback ' + util.inspect(size));
        var quoteIndex = quoteGenerator.getRandomArbitrary(0, size).toString();
        log.info('callback is  ' + util.inspect(callback));
        callback(quoteIndex);
    });
};

quoteGenerator.randomize = function(callback) {
    log.info('In randomize');
    this.randomizeQuote(function (quoteIndex) {
        log.info('In randomize callback');
        mongoWrapper.findOne('quotes', {index: quoteIndex}, callback);
    });


};

quoteGenerator.getByName = function(name, callback) {
    // var chosenQuote;
    // data.forEach(function(item) {
    //     if (item.short_name === name) {
    //         chosenQuote = item;
    //     }
    // });
    console.log('reached the quoteGenerator');
    var query = mongoWrapper.findOne('quotes', {short_name: name}, callback);
    // return chosenQuote;
};

module.exports = quoteGenerator;