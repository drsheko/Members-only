var express = require('express');
var router  =express.Router();
var flash = require('connect-flash')

router.get('/',(req,res,next)=>{
    var errors = req.flash.error||[]
    res.render('log-in' , {errors})
})


module.exports = router ;
