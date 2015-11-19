var data = require('../data/fake_data.js');
var quoteGenerator = {};

quoteGenerator.getRandomArbitrary = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

quoteGenerator.randomizeQuote = function() {
    var quote = {};
    var length = data.length;

    var index = this.getRandomArbitrary(0, length);
    return data[index];

};

quoteGenerator.randomize = function() {
    var quote = this.randomizeQuote();
    return quote;
};

quoteGenerator.getByName = function(name) {
    var chosenQuote;
    data.forEach(function(item) {
        if (item.short_name === name) {
            chosenQuote = item;
        }
    });
    return chosenQuote;
};

module.exports = quoteGenerator;