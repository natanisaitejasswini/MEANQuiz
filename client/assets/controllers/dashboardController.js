app.controller('dashboardController', function(usersFactory, questionFactory, $location,$cookies){
	var self = this;
	self.user_session = {}
	self.questions = []
	self.userInfo = {}

	self.user_session = $cookies.getObject('user');
	if(!self.user_session || !self.user_session.id){
		$location.url('/index');
		return 
	}
	
	// Add question link redirect to next page
	self.createquestion = function(){
		$location.url('/new_question')
	}

	// Showing all questions on dashpage
	var index = function(){
	    questionFactory.index(function(data){
	      self.questions = data
	    })
  	}
  	index();

  	// Showing Question and redirecting to specific question page
	self.show = function(info){
		id = info
		// console.log(id);
		questionFactory.show(id,function(id){
			self.current_question = info
			$location.url('/question/'+self.current_question)
		})
	}

	// Answering the question from dashboard.html
	self.answer = function(info){//called from page
	    id = info
	    questionFactory.show(id,function(id){
	      self.current_question = info
	      // console.log('info',info);
	      $location.url('/question/'+self.current_question+'/new_answer')
	    })
  	}

  	// Logout function
	self.logout = function(){
	    usersFactory.logout(function(data){
	     $cookies.remove('user')
	      $location.url('/index');
	    })
  	}

  	// Destroy Question
  	self.destroy = function(data){
  		// console.log(index is complete question object, 'index') // Passing index from var index function
      questionFactory.destroy(data,index)
  	}

})