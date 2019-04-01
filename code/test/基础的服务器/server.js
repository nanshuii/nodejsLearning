// 一个基础的Http服务器
var http = require('http');

function handle(request, response) {
    console.log('request received');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('hello world');
    response.end();
}

http.createServer(handle).listen(8888);

console.log('server has started');