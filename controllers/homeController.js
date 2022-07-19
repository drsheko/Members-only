
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {body , validationResult} = require('express-validator');
const passport = require('passport');
const Message= require('../models/messageModel')
const User = require('../models/user');

exports.home_get = async(req,res)=>{
  var messages = await Message.find().sort([['timestamp','descending']]).populate('author')
  
    res.render('home', { title: 'Home' , user:req.user , messages })
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


       
