var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:{type:String , minLength:6 , maxLength:15 , required:true},
    password:{type:String , minLength:6 , maxLength:15 , required:true}

})

module.exports = mongoose.Model("user"  , userSchema  , "users")