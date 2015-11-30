var mongodb = require('mongodb');
var util = require('util');

var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: 'Goran:Mongo_Wrapper'
});

var uri = process.env.MONGOLAB_URI;


module.exports = {
  connect: function(callback) {
    mongodb.MongoClient.connect(uri, callback);
  },

  count: function(collection, query, callback) {
    var collection = collection;
    var query = query;

    log.info('In count');
    mongodb.MongoClient.connect(uri, function(err, db) {
      if (err) throw err;

      db.collection(collection).find(query).count(function (err, count) {
        log.info('Count is! ' + util.inspect(count));
        callback(count);
      });




    });
  },

  findOne: function(collection, query, callback) {
    var collection = collection;
    var query = query;
    // log.info('inside mongodb :: query is ' + util.inspect(query));
    // log.info('inside mongodb :: collection is ' + util.inspect(collection));

    mongodb.MongoClient.connect(uri, function(err, db) {
      if (err) throw err;

      var collectionObject = db.collection(collection);

      var result = collectionObject.find(query).next( function(err, doc) {
        log.info('MongoWrapper ::: DOC [%s]', util.inspect(doc));
        log.info('MongoWrapper ::: DOC [%s]', util.inspect(callback));
        db.close();
        callback(doc, err);
      });
    });
  }
}