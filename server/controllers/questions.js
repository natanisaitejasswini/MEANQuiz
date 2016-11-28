console.log('.......questions controller......');
require('../config/mongoose');
var mongoose = require('mongoose');
var Question = mongoose.model('Question');

module.exports = (function(){
	return{
		index: function(request,response){
			Question.find({}, function(err,results){
				response.json(results)
			})
		},

		// Creating New Question
		create: function(request,response){
			var question = new Question(request.body)
			question.save(function(err){
				if(err) response.json(err)
				else{
					console.log('DB Push')
					response.json({'status': true})
				} 		
			})
		},

		show: function(request,response){
			Question.findOne({_id: request.params.id}, function(err, results){
				// console.log('Show Question Found')
				response.json(results)
			})
		},

		// Create the answers array for each question
		answer_question: function(request, response){
	      // console.log('.........Answer to be added.....', request.body);
	      Question.findOne({_id:request.body.question}, function(err,results){
	        // console.log('results will be only the question object i.e before pushing', results);
	        results.answers.push(request.body)
	        results.save()
	        // console.log('Finall results will be with answers', results)
	        response.json(results)
	      })
    	},

    	// Destroy the question
    	destroy: function(request, response){
	      Question.remove({_id:request.params.id}, function(err,question){
	      	//Whatever id we are passing through routes it deletes that question
	        if(err) request.json(err)
	        else response.json({'status':true})
	      })
    	},

    	// Likes
    	like: function(request,response){
	    	Question.findOne({_id:request.params.question_id}, function(err,results){
		        console.log('Give the question that matches question_id', results);
		        for (var i = 0; i < results.answers.length; i++) {
		          // console.log('taking answers array in results one by by one and matching with answer_id', results.answers[i]);
		          if (results.answers[i]._id == request.params.answer_id) {
		            answer = results.answers[i]
		            likes = answer.likes +=1
		          }
		        }
		        // After incrementing likes save the entire results object which is question_id
		        results.save()
		        response.json(results)
      		})
   		},

	}
})()















