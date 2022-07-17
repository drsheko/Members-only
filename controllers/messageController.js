const { body ,validationResult} = require("express-validator")
const Message = require('../models/messageModel')
exports.message_get = (req,res)=>{
    res.render('createMessage' ,{title:'create message'})
}

exports.message_post = [
    body('title').trim().isLength({min:3 ,max:50}).escape().withMessage('Title must be minumum 3 ,maximum 50 charcters'),
    body('message').trim().isLength({min:3 ,max:200}).escape().withMessage('Title must be minumum 3 ,maximum 200 charcters'),

    async(req,res,next)=>{
        console.log(req.user.username)
        console.log(req.body)
        const errors = validationResult(req);
        if(errors>0){
            console.log(errors)
            return res.render('message' ,{title:'create message',errors})
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