require('dotenv').load();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const apiRouter = require('./app_api/routes/route')
const session = require('express-session')
let passport = require('passport');
require('./app_api/models/db')
require('./app_api/config/passport')

let app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret            : process.env.SECRET || 'SOME_SECRET',
  saveUninitialized : false, //force a session to be saved
  resave            : false  //
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  res.status(404).json(err);
});

//unauthorize handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ "message": err.name + ": " + err.message });
  }
});


module.exports = app;
