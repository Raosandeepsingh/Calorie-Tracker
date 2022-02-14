var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let dotenv = require('dotenv').config();
var {dbconnect} = require('./db/dbconfig');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var activityRouter = require('./routes/activity');
var foodRouter = require('./routes/foods');
var BmrRouter = require('./routes/bmrcalculation');
const { bmrCollection } = require('./db/collections');



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});







app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/food', foodRouter);
app.use('/activity', activityRouter);
app.use('/bmr',BmrRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler

module.exports = app;
