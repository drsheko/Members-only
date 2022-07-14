var express = require('express');
var router =express.Router();
var User = require('../models/user')
var bcrypt = require('bcryptjs');
var flash = require('connect-flash')

router.get('/' , (req,res,next)=>{
    var errors = req.flash.error||[]
    res.render('sign-up' ,{errors})
})

router.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, ( err, hash ) => {
        if (err) { console.log(err) ;
         }
         if (req.body.password !== req.body.confirmPassword){
             
            req.flash('error' , 'Your Password is not matching!!!');
            res.redirect('/sign-up')
            
         } else {
             var user = new User({
                username:req.body.username,
                password:hash
            }).save( err => {
                if (err) { 
                    next(err)
                }
                res.redirect('/log-in')
            })
         }

    })

})


module.exports = router ;