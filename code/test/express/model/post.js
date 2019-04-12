var mongodb = require('./db');

function Post(username, post, time) {
    this.user = username;
    this.post = post;
    if (time) {
        this.time = time;
    } else {
        this.time = new Date();
    }
}

module.exports = Post;

Post.prototype.save = function save(callback) {
    var post = {
        user: this.user,
        post: this.post,
        time: this.time
    };
    mongodb.connect(function(err, db, client) {
        if (err) {
            client.close();
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                client.close();
                return callback(err);
            }
            collection.createIndexes('user');
            collection.insertOne(post, {safe: true}, function(err, post) {
                client.close();
                callback(err, post);
            })
        });
    });
};

Post.get = function(username, callback) {
    mongodb.connect(function(err, db, client) {
        if (err) {
            return callback(err);
        }
        var posts = [];
        var query = {};
        if (username) {
            query = {user: username}
        };
        db.collection('posts').find(query).sort({time:-1}).toArray(function(err, docs){
            client.close();
            if (err) {
                callback(err, null);
            }
            var posts = [];
            docs.forEach(function(doc, index) {
                var post = new Post(doc.user, doc.post, doc.time);
                posts.push(post);
            });
            callback(null, posts);
        });
    });
};