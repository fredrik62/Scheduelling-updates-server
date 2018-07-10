
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cron = require("node-cron");
const fs = require("fs");

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

cron.schedule("* * * * *", function() {
var data = require('./schedulled-jobs/ge-data-schedule');
 });

// app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler

app.use((req, res, next) => {
  res.status(404).json({code: 'not-found'});
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({code: 'unexpected'});
  }
});

module.exports = app;