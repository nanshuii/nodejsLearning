
function route(handle, pathname) {
    console.log('route request pathname = ' + pathname);
    if (typeof handle[pathname] == 'function') {
        handle[pathname]();
    } else {
        console.log('没有找到适合pathname的方法');
    }
}

exports.route = route;