
function start() {
    console.log('Request handler \'start\'');

    function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
    }

    sleep(10000);
    return 'Hello start';
}

function upload() {
    console.log('Request handler \'upload\'');
    return 'Hello upload';
}


exports.start = start;
exports.upload = upload;