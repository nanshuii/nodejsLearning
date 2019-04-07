var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongodb-session')(session);
var setting = require('./setting');
var flash = require('connect-flash');
var db = require('./model/db');

var indexRouter = require('./routes/index');
var regRouter = require('./routes/reg');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var usersRouter = require('./routes/users');
var listRouter = require('./routes/list');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var store = new MongoStore({
  uri: 'mongodb://localhost:27017/ledonblog',
  collections: 'myCollection'
});
 
// Catch errors
store.on('error', function(error) {
  console.log('store error = ', error);
});
app.use(session({//session持久化配置
	secret: setting.secret,
	key: setting.key,
  cookie: {maxAge: setting.maxAge},//超时时间
  store: store,
	resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.use(function(req,res,next){
  res.locals.user=req.session.user;

  var err = req.flash('error');
  var success = req.flash('success');
  res.locals.error = err.length ? err : null;
  res.locals.success = success.length ? success : null;
   
  next();
});

app.use('/', indexRouter);
app.use('/reg', regRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/users', usersRouter);
app.use('/list', listRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
