// 模块化服务器
var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('request received: ' + pathname);
        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(8888);
    console.log('server has started');
}

exports.start = start;