const mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
}

module.exports = User;

User.prototype.save = function save(callback) {
    // 存入Mongodb文档
    var user = {
        name: this.name,
        password: this.password
    };
    mongodb.connect(function (err, db, client) {
        if (err) {
            return callback(err);
        } else {
            db.collection('users', function(err, collection) {
                if (err) {
                    client.close();
                    return callback(err);
                }
                // 添加索引
                collection.createIndexes('name', {unique: true});
                // 写入
                collection.insert(user, {safe: true}, function(err, user) {
                    client.close();
                    callback(err, user);
                });
            });
        }
    });
};

User.get = function get(username, callback) {
    mongodb.connect(function (err, db, client) {
        if (err) {
            return callback(err);
        } else {
            db.collection('users').findOne({name: username}, function(err, doc) {
                if(err) {
                    client.close();
                    callback(err, null);
                }
                if (doc) {
                    client.close();
                    var user = new User(doc);
                    callback(err, user);
                } else {
                    client.close();
                    callback(err, null);
                }
            });
        }
    });
    
};