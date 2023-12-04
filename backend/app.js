var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var crimeRouter = require('./routes/crime');
var premiseRouter = require('./routes/premise');
var weaponRouter = require('./routes/weapon');
var recordRouter = require('./routes/record');
var graph1Router = require('./routes/graph1');
var graph2and3Router = require('./routes/graph2&3');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const cors = require("cors");
const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
};

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use('/', indexRouter);
app.use('/crime', crimeRouter);
app.use('/premise', premiseRouter);
app.use('/weapon', weaponRouter);
app.use('/record', recordRouter);
app.use('/graph1', graph1Router);
app.use('/graph2&3', graph2and3Router);

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
