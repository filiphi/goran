var express = require('express');
var path    = require('path');
var util    = require('util');

var app = express();
var quoteGenerator = require('../quote_generator.js');
var personalizeQuote = require('../personalize.js');

var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: 'Goran:Mongo_Wrapper'
});

exports.setup = function() {
  app.set('port', (process.env.PORT || 5000));

  app.use(express.static(path.join(__dirname, '/../../', '/public')));

  app.set('views', path.join(__dirname, '/../../', '/views'));
  app.set('view engine', 'jade');

  app.get('/', function(request, response) {
    var quote = quoteGenerator.randomize(function (quote) {
      response.render('pages/single', quote);
    });
  });

  app.get('/random', function(request, response) {
    var quote = quoteGenerator.randomize(function (quote) {
      console.log('index ::: insideCallback - what is quote? [%s]', util.inspect(quote));
      response.render('pages/single', quote);
    });

  });

  app.get('/:name', function(request, response) {
    var victimName = request.params.name;
    var quote = quoteGenerator.getByName(victimName, function (quote) {

      if (quote !== null) {

        response.render('pages/single', quote);
      } else {

        response.render('pages/none_found', {name: victimName});
      }
    });
  });

  app.get('/:name/personalize/', function(request, response) {
    var victimName = request.params.name;

    console.log('reached the route');

    var quote = quoteGenerator.getByName(victimName, function (quote, err) {

      // log.info('we now have a quote ::: ' + util.inspect(quote));

      if (quote !== null) {
        personalizeQuote.startReplace(quote, function(personalize, err) {

          log.info('INSIDE callback ::: personalize is ' + util.inspect(personalize));
          if (err) {
            response.render('pages/error');
          } else {
            log.info('INSIDE callback ::: personalize is ' + util.inspect(personalize.replace));
            response.render('pages/replace', {personalize: personalize, quote: quote});
          }
        });
      } else {

        response.render('pages/none_found', {name: victimName});
      }
    });
  });

  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });

}