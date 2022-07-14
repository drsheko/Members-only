var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name : {type:String , minLength:6 , maxLength:15 , required:true},
    last_name : {type:String , minLength:6 , maxLength:15 , required:true},
    username:{type:String , minLength:6 , maxLength:15 , required:true},
    password:{type:String , minLength:6 , maxLength:15 , required:true},
    avatarURL : { type: String},
    member : {type:Boolean , default: false},
    admin : { type:Boolean , default:false },
})

userSchema.virtual('full_name').get(()=>{
    return this.first_name + ' '+ this.last_name
})

module.exports = mongoose.model("user"  , userSchema  , "users")