
function route(handle, pathname) {
    console.log('route request pathname = ' + pathname);
    if (handle[pathname] != undefined) {
        return handle[pathname]();
    } else {
        console.log('没有找到适合pathname的方法');
        return '404 Not Found';
    }
}

exports.route = route;