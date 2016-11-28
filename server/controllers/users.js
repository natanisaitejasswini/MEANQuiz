console.log('users controller');
require('../config/mongoose');
var mongoose = require('mongoose');
var user = mongoose.model('users');

module.exports = {
	login: function(request,response){
		user.findOne({name: request.body.name},function(err,result){
			if(err){
				response.json(err);
			}
			else if(!result){ // If no result returned
				var user_Info = request.body;
				var newUser = new user(user_Info); // Making new instance of user
				newUser.save(function(err){
					if(err){
						response.json(err);
					}
					else{
						var logged_user ={};
						logged_user.name = newUser.name; // saving it as new logged_user and making sucess as true
						logged_user.id = newUser._id;
						// console.log('Making a new user', logged_user)
						logged_user.success = true;
					}
				})
			}
			else{
				var logged_user ={}; // If user found than also making it as success as true
				logged_user.name = result.name;
				logged_user.id = result._id;
				logged_user.success = true;
				// console.log('User is already Registered in DB', logged_user)
				response.json(logged_user);
			}
		})
	},

	index: function(request, response){
      user.find({}, function(err,results){
      	console.log('results', results)
        response.json(results)
      })
    },
}