app.controller('answerController',function(questionFactory,usersFactory,$location,$cookies,$routeParams){
  var self = this
  self.activeUser;
  self.current_question;

  // self.user_session = $cookies.getObject('user');
  // if(!self.user_session.id){
  //   $location.url('/index');
  //   return 
  // }

  self.user_session = $cookies.getObject('user');
  if(!self.user_session || !self.user_session.id){
    $location.url('/index');
    return 
  }

  var getIntrestQuestion = function(){
   questionFactory.getIntrestQuestion(function(question_from_factory){
      self.current_question = question_from_factory
      // console.log('specific_question details to print above answer page', self.current_question)
    })
  }
  getIntrestQuestion()  
  // console.log($routeParams);

  // showing the questionID
  self.show = function(info){//called from page
    id = info
    questionFactory.show(id,function(question){
      console.log(question);
      self.current_question = question;
    })
  }
  self.show($routeParams.id);

  // Creating answer
  self.create = function(){
    var self = this
    if(!self.answer) return;
    var new_answer = {question:self.current_question._id,name: self.user_session.name, answer: self.answer, details: self.details, likes: 0}
    
    questionFactory.create_answer(new_answer,function(response_from_server){
      console.log("response_from_server ",response_from_server);
        $location.url('/dashboard')
    })
    self = ''
  }

  // Making Text Areas of Answer page Empty and re-directing to dashboard
  self.cancel = function(){
    self.answer = ''
    self.details = ''
    $location.url('/dashboard');
  }

  self.logout = function(){
      usersFactory.logout(function(data){
       $cookies.remove('user')
        $location.url('/index');
      })
    }

})