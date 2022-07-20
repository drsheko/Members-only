var moment = require('moment'); // require
 
const { body ,validationResult} = require("express-validator")
const { locals } = require("../app")
const Message = require('../models/messageModel')
const { findById } = require("../models/user")

exports.message_create_get = (req,res)=>{
    res.render('createMessage' ,{title:'create message',user:req.user})
}

exports.message_create_post = [
    body('title').trim().isLength({min:3 ,max:50}).escape().withMessage('Title must be minumum 3 ,maximum 50 charcters'),
    body('message').trim().isLength({min:3 ,max:200}).escape().withMessage('Title must be minumum 3 ,maximum 200 charcters'),

    async(req,res,next)=>{
        //console.log(res.locals)
        console.log(res.locals.currentUser)
        const errors = validationResult(req);
        var messageData = {
            title:req.body.title,
            message:req.body.message
        }
        if(!errors.isEmpty()){
            req.flash('errors',`${errors}`)
            
            return res.render('createMessage' ,{title:'create message',errors:errors.errors ,messageData})
        }
        try{ 
            var message = new Message({
                title : req.body.title,
                message:req.body.message,
                author : req.user._id ,
                timestamp:new Date()

            }).save((err)=>{
                if (err){ next(err)}
                
                
                res.redirect('/')
            }
            )
        }
        catch(err){
              return next(err)  
        }
    }

]

exports.message_edit_get = async(req,res)=>{
    var id = req.params.id;
    var messageToEdit = await Message.findById(id);
    console.log( "working...." + messageToEdit )
    res.render('editMessage' , {title:'Edit Message',message:messageToEdit , user:req.user})
}

exports.message_edit_post = async(req,res,next)=>{
    var id = req.params.id;
     Message.findByIdAndUpdate(id,{
        $set:{
            title:req.body.title,
            message:req.body.message
        }
    },(err=>{
        if(err){
            return next(err)
        }
        req.flash('success' , 'Message has edited');
        res.redirect('/')
    }));
}