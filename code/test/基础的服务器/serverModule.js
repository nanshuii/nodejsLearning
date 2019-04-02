// 模块化服务器
var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var postData = '';
        var pathname = url.parse(request.url).pathname;
        console.log('request received: ' + pathname);
        request.setEncoding('utf8');
        request.addListener('data', function(postDataChuck) {
            postData += postDataChuck;
            console.log('Received Post Data Chuck: ' + postDataChuck);
        });
        request.addListener('end', function() {
            console.log('OnRequest lisened end');
            route(handle, pathname, response, postData);
        });
    }

    http.createServer(onRequest).listen(8888);
    console.log('server has started');
}

exports.start = start;