const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {body , validationResult} = require('express-validator');

exports.home_get = (req,res)=>{
    res.render('home', { title: 'Home' })
}

exports.login_get = (req,res,next)=>{
    var errors = req.flash.error||[]
    res.render('log-in' , {errors , title:"Log in Page"})
}