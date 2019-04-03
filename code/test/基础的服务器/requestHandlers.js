
var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');

function start(res) {
    console.log('Request handler \'start\'');

    function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
    }

    sleep(2000); // 阻塞操作
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Start...');
    res.end();
}

// 非阻塞操作
function start_exec(res) {
    console.log('Request handler \'start_exec\'');
    var content = 'empty';
    exec('ls-lah', function (error, stdout, stderr) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(stdout);
        res.end();
    });
}

// 处理post请求
function start_post(res) {
    console.log('Request handler \'start_post\'');
    var body = '<html>' + 
               '<head>' + 
               '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">' +
               '</head>' +
               '<form action = "/upload" method="post">' + // 调用了upload方法
               '<textarea name="text" rows="20" cols="60"></textarea>' + 
               '<input type="submit" value="Submit text" />' +
               '</form>' +
               '</body>' + 
               '</html>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(body);
    res.end();
}

// 处理上传文件
function start_upload(res) {
    console.log('Request handler \'start_upload\'');
    var body = '<html>' + 
               '<head>' + 
               '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">' +
               '</head>' +
               '<form action = "/upload_file" enctype="multipart/form-data" method="post">' + // 调用了upload方法
               '<input type="file" name="upload" multiple="multiple">' +
               '<input type="submit" value="Upload File" />' +
               '</form>' +
               '</body>' + 
               '</html>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(body);
    res.end();
}

function upload(res, req) {
    console.log('Request handler \'upload\'');
    var data = '';
    req.on('data', function (chuck) {
        data += chuck;
    });
    req.on('end', function () {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Received: \n' + querystring.parse(data)['text']);
        res.end();
    })
}

// 收到图片
function upload_file(res, req) {
    console.log('Request handler \'upload_file\'');
    var form = new formidable.IncomingForm();
    console.log('parse...');
    form.parse(req, function(error, fields, files) {
        console.log('parse done path = ', files.upload.path);
        fs.renameSync(files.upload.path, "/tmp/test.png");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('received image: <br/>');
        res.write('<img src=\'show\'>'); // 调用show
        res.end();
    })
}

// 显示图片
function show(res) {
    console.log('Request handler \'show\'');
    fs.readFile('/tmp/test.png', 'binary', function(error, file) {
        if (error) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write(error + '\n');
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.write(file, 'binary');
            res.end();
        }
    })
}


exports.start = start;
exports.start_exec = start_exec;
exports.start_post = start_post;
exports.start_upload = start_upload;
exports.upload = upload;
exports.upload_file = upload_file;
exports.show = show;