var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy  =require('passport-local').Strategy;
var flash = require('connect-flash');
var User = require('./models/user');
var bcrypt = require('bcryptjs');
var Routers = require('./routes/routes');


// mongo Database setup
const mongodb  = "mongodb+srv://shady:shady1@users.y1khye5.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongodb,{ useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection;
db.on("error", console.error.bind(console,'Mongo Connection Error'))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// passport setup
passport.use(
  new LocalStrategy({passReqToCallback:true},(req,username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(console.log(err));
      }
      if (!user) {
        return done(null, false, req.flash('error',"user is not found :("));
      }
     
      bcrypt.compare(password, user.password,(err, res) => {
        if(err){return done(console.log(err))}
        if (!res) {
            return done(null, false,req.flash('error','Incorrect password...try again'))
        } 
        else{
          return done(null, user);
        }
      })
    });
  })
);




passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.use(flash())
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// local user setup
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});


// Routers setup
app.use('/', Routers);


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
