const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cron = require("node-cron");
const fs = require("fs");
const mongoose = require('mongoose');


const indexPage = require('./routes/index');
const idPage = require('./routes/graph');

//connection to db
mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/player')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var data = require('./schedulled-jobs/ge-data-schedule');
var graphData = require('./schedulled-jobs/ge-graph-data');

cron.schedule("*/1 * * * *", function() {
  data.getMeData();
  graphData.getMeGraphData();
});



app.use('/', indexPage);
app.use('/item', idPage);


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

const listener = app.listen(8888, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
})

module.exports = app;
