var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {type: String},
	},{timestamps: true});
mongoose.model('users', UserSchema); 

var questionSchema = mongoose.Schema({
  text:{type:String, required:true, minlength:10},
  description:{type:String, minlength:2},
  answers:[
    {name:{type:String, required:true, minlength:2},answer:{type:String, required:true, minlength:5},details:{type:String, minlength:1}, likes:Number}
  ]
},{timestamps:true})
var question = mongoose.model('Question', questionSchema)

