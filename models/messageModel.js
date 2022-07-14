var mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title:{type:String ,minLength:3 , maxLength:50 , required:true },
    message:{type:String, minLength:3 , maxLength:300 , required:true},
    timestamp :{type:Date , required:true  , default:Date.now()}
})

module.exports = mongoose.model('message' , messageSchema , 'messages')