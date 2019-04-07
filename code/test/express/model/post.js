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
    console.log('post = ', post);
    mongodb.connect(function(err, db, client) {
        if (err) {
            client.close();
            return callback(err);
        }
        console.log('post = ', post);
        db.collection('posts', function (err, collection) {
            if (err) {
                client.close();
                return callback(err);
            }
            collection.createIndexes('user');
            console.log('---');
            collection.insertOne(post, {safe: true}, function(err, post) {
                console.log('err = ', err);
                client.close();
                callback(err, post);
            })
        });
    });
};

//             // 添加索引
//             collection.createIndexes('name', {unique: true});
//             // 写入
//             collection.insert(user, {safe: true}, function(err, user) {
//                 client.close();
//                 callback(err, user);
//             });
//         });
//     }
// });

Post.get = function(username, callback) {
    mongodb.connect(function(err, db, client) {
        if (err) {
            return callback(err);
        }
        var posts = [];
        db.collection('posts').find({user: username}).sort({time:-1}).toArray(function(err, docs){
            client.close();
            if (err) {
                callback(err, null);
            }
            console.log('docs = ', docs);
            var posts = [];
            docs.forEach(function(doc, index) {
                var post = new Post(doc.user, doc.post, doc.time);
                posts.push(post);
            });
            callback(null, posts);
        });
    });
};