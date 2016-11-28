console.log('routes');
var users = require('../controllers/users');
var question = require('../controllers/questions');

module.exports = function(app){
	// User Routes
	app.get('/users',users.index)
	app.post('/users', function(request,response){
		users.login(request,response);
	}) 
	// Question Routes
	app.get('/questions', question.index)
	app.post('/question', question.create)
	app.get('/question/:id', question.show)
	app.post('/answer',question.answer_question)
	app.delete('/question/:id',question.destroy)
	app.post('/like/:question_id/:answer_id',question.like)
}
