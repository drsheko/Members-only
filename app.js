var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy  =require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/log-in')
var signUpRouter = require('./routes/sign-up')
// mongo Database setup
const mongodb  = "mongodb+srv://shady:shady1@users.y1khye5.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongodb,{ useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection;
db.on("error", console.error.bind(console,'Mongo Connection Error'))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({ secret: 'cats', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/log-in',loginRouter);
app.use('/sign-up' , signUpRouter);


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
