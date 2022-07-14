const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {body , validationResult} = require('express-validator');
const passport = require('passport');

exports.home_get = (req,res)=>{
 
    res.render('home', { title: 'Home' , user:req.user })
}

exports.login_get = (req,res,next)=>{
    var errors = req.flash.error||[]
    res.render('log-in' , {errors , title:"Log in Page"})
}

exports.login_post = 
    passport.authenticate("local", {
        successRedirect: "/",
          failureRedirect: "/log-in",
          failureFlash:true,
        })

exports.log_out =  (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }       


       
