var express = require('express');
var path    = require('path');
var util    = require('util');
var app = express();
var quoteGenerator = require('../quote_generator.js');


exports.setup = function() {
  app.set('port', (process.env.PORT || 5000));

  app.use(express.static(path.join(__dirname, '/../../', '/public')));

  app.set('views', path.join(__dirname, '/../../', '/views'));
  app.set('view engine', 'jade');

  app.get('/', function(request, response) {
    var quote = quoteGenerator.randomize(function (quote) {
      console.log('index ::: insideCallback - what is quote? [%s]', util.inspect(quote));
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
      // console.log('index ::: insideCallback - what is quote? [%s]', util.inspect(quote));

      if (quote !== null) {

        response.render('pages/single', quote);
      } else {

        response.render('pages/none_found', {name: victimName});
      }
    });
  });

  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });

}