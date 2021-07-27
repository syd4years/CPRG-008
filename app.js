/*
David Grant
2021/07/25
CPRG-008
Assignment 2
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var thank_you = require("./routes/thank-you")

// Mongo sanitize
const mongoSanitize = require('express-mongo-sanitize');

var app = express();

// view engine setup to display pug format
app.set('views', './views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use routes 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/register", registerRouter)
app.use("/thank-you", thank_you)

// to replace prohibited characters with _, use:
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

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

app.listen(3000)

module.exports = app;