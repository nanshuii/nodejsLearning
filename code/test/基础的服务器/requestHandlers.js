
var exec = require('child_process').exec;

function start(response) {
    console.log('Request handler \'start\'');

    function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
    }

    sleep(10000); // 阻塞操作
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Start...');
    response.end();
}

// 非阻塞操作
function start_exec(response) {
    console.log('Request handler \'start_exec\'');
    var content = 'empty';
    exec('ls-lah', function (error, stdout, stderr) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(stdout);
        response.end();
    });
}


function upload(response) {
    console.log('Request handler \'upload\'');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Upload...');
    response.end();
}


exports.start = start;
exports.start_exec = start_exec;
exports.upload = upload;