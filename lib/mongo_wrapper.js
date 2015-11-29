var mongodb = require('mongodb');
var util = require('util');

var uri = process.env.MONGOLAB_URI;

var debuglog = util.debuglog('mongoWrapper');

module.exports = {
  connect: function(callback) {
    mongodb.MongoClient.connect(uri, callback);
  },

  findOne: function(collection, query, callback) {
    var collection = collection;
    var query = query;

    mongodb.MongoClient.connect(uri, function(err, db) {
      if (err) throw err;

      var quotes = db.collection(collection);

      var result = quotes.find(query).next( function(err, doc) {
        // console.log('MongoWrapper ::: DOC [%s]', util.inspect(doc));
        callback(doc);
        db.close();
      });
    });
  }
}