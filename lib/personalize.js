var mongoWrapper = require('./mongo_wrapper.js');
var util = require('util');
var path = require('path');

var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: 'Goran:Personalize'
});

var personalizeQuote = {};

var getOne = function(query, callback) {
    // log.info('INSIDE callback ::: query is ' + util.inspect(query));
    var query = mongoWrapper.findOne('personalize', query, callback);
}
var validateQuote = function(quote) {
    var error = false;
    if (typeof quote === 'undefined' || typeof quote._id === 'undefined') {
        error = new Error('The quote does not have an id');
    }
    return error;
}

personalizeQuote.startReplace = function(quote, callback) {

    var error = validateQuote(quote);
    // log.info('INSIDE callback ::: quote is ' + util.inspect(quote));
    if (error !== false) {
        log.error('INSIDE START REPLACE ::: error called ' + util.inspect(error));
        callback({}, error);
    }
    // log.info('INSIDE START REPLACE ::: quote is ' + util.inspect(quote));
    getOne({quote_id: quote._id.toString()}, callback);
};

module.exports = personalizeQuote;