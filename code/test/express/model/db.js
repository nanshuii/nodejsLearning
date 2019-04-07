
// var Db = require('mongodb').Db;
// var Connection = require('mongodb').Connection;
// var Server = require('mongodb').Server;
// module.exports = new Db('ledonblog', new Server('localhost', 27017, {save:true}));

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/ledonblog';
var mongodb = require('mongodb');
var Db = {

}
Db.connect = function (callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        err = err;
        db = client.db('ledonblog');
        callback(err, db, client);
    });
}



module.exports = Db;