const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {body , validationResult} = require('express-validator');
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/../public/images'))
    },
    filename: function (req, file, cb) {
      cb(null, req.body.username+ file.originalname)
    }
  })
  const upload = multer({storage:storage});


exports.signup_get = (req,res,next)=>{
    var errors = req.flash.error||[]
    res.render('sign-up' ,{errors , title:'Sign-up Page'})
}

exports.signup_post = [ 
    //upload image...Should be the First Middleware
    upload.single('avatarURL'),

    body('first_name').isString().trim().isLength({min:1}).escape().withMessage('Should be at least 1 character'),
    body('last_name').isString().trim().isLength({min:1}).escape().withMessage('Should be at least 1 character'),
    body('username').isString().trim().isLength({min:6}).escape().withMessage('Username should be at least 1 character'),
    body('password').trim().isLength({min:6}).escape().withMessage('Password should be at least 6 character'),
    body('confirmPassword').trim().isLength({min:6}).escape().withMessage('Password should be at least 6 character')
    .custom(async(value, { req }) => {console.log(body('first_name'))
        if (value !== req.body.password) {
            
            throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
      
    async(req, res, next) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) { console.log(errors)
          return res.render("sign-up", { title: "Sign Up Page", errors});
        }
        try{ console.log('sh/01')
       
            bcrypt.hash(req.body.password, 10, ( err, hash ) => {
                if (err) { console.log(err+'hash ErRor') ;
                }
                else {console.log('sh/02')
                    var user = new User({
                       first_name:req.body.first_name,
                       last_name:req.body.last_name,
                       username:req.body.username,
                       password:hash,
                       avatarURL: req.file.path,
                       member:false,
                       admin:false
                   }).save( err => {
                       if (err) { 
                        console.log('sh/03')
                           next(err)
                       }
                       res.redirect('/log-in')
                   })
                }
           })
        }catch(err) {
            return next(err);
          }
        }
             
]