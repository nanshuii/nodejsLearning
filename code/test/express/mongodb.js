var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/ledonblog';
// var server = new mongodb.Server("localhost",27017,{safe:true});
var mongodb = require('mongodb');
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbase = db.db("ledonblog");
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        db.close();
    });
});