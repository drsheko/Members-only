var express = require('express');
var router =express.Router();
var User = require('../models/user')
var bcrypt = require('bcryptjs');


router.get('/' , (req,res,next)=>{
    res.render('sign-up')
})

router.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, ( err, hash ) => {
        if (err) { console.log(err) ;
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