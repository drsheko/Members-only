const { body, validationResult } = require("express-validator")
const { locals } = require("../app")
const user = require("../models/user")
const Message = require('../models/messageModel')
exports.admin_get = (req,res)=>{
    res.render('admin' ,{title:'Become Admin'})
}


exports.admin_post = [
    body('adminPassword').trim().escape()
    .custom(async(value,{req})=>{ console.log(value)
        console.log(process.env.Admin_Passcode)
        if(value != process.env.Admin_Passcode){
            
            throw new Error ('Password is incorrect')
        }
    }),
    async(req,res,next)=>{ 
        const errors = validationResult(req);
        req.flash('errors',`${errors}`)
        if(!errors.isEmpty()){
            return res.render('admin' ,{errors:errors.errors})
        }
            var userToBeAdmin = await user.findOne({username:req.user.username})
            userToBeAdmin.admin = true ;
            userToBeAdmin.save((err)=>{
                if(err) {return next(err)}
                else{
                    return res.redirect('/')
                }
            })
    }
]

exports.delete_message = async(req,res,next)=>{
    var id = req.params.id;
    Message.findByIdAndDelete(id , (err)=>{
        if(err){
            next(err);
        }
        req.flash('success' ,'Message has been deleted')
        res.redirect('/')
    })
}



