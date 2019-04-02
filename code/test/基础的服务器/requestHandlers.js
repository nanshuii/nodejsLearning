
var exec = require('child_process').exec;

function start() {
    console.log('Request handler \'start\'');

    function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
    }

    sleep(10000); // 阻塞操作
    return 'Hello start';
}

// 非阻塞操作
function start_exec() {
    console.log('Request handler \'start_exec\'');
    var content = 'empty';
    exec('ls-lah', function (error, stdout, stderr) {
        content = stdout;
    });
    return content;
}


function upload() {
    console.log('Request handler \'upload\'');
    return 'Hello upload';
}


exports.start = start;
exports.start_exec = start_exec;
exports.upload = upload;