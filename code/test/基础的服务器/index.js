var server = require('./serverModule');
var route = require('./route');
var requestHandlers = require('./requestHandlers');

var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/start_exec'] = requestHandlers.start_exec;
handle['/start_post'] = requestHandlers.start_post;
handle['/upload'] = requestHandlers.upload;

server.start(route.route, handle);