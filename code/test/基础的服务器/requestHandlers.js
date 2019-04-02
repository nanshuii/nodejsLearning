
var exec = require('child_process').exec;

function start(response, postData) {
    console.log('Request handler \'start\'');

    function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
    }

    sleep(2000); // 阻塞操作
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Start...');
    response.end();
}

// 非阻塞操作
function start_exec(response, postData) {
    console.log('Request handler \'start_exec\'');
    var content = 'empty';
    exec('ls-lah', function (error, stdout, stderr) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(stdout);
        response.end();
    });
}

// 处理post请求
function start_post(response, postData) {
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
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}


function upload(response, postData) {
    console.log('Request handler \'upload\'');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('收到了: ' + postData);
    response.end();
}


exports.start = start;
exports.start_exec = start_exec;
exports.start_post = start_post;
exports.upload = upload;