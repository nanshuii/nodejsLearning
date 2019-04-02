
function route(handle, pathname, response, postData) {
    console.log('route request pathname = ' + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, postData);
    } else {
        console.log('没有找到适合pathname的方法');
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found');
        response.end();
    }
}

exports.route = route;