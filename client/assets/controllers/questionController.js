app.controller('questionController', function(questionFactory, usersFactory ,$location, $cookies, $routeParams){
  var self = this;
   self.questions= [];
   self.users = [];
   self.user_session = {};
   self.current_poll;
   self.errors = []
   self.activeUser;

  // self.user_session = $cookies.getObject('user');
  // if(!self.user_session.id && !self.user_session){
  //   $location.url('/index');
  //   return
  // }

  self.user_session = $cookies.getObject('user');
  if(!self.user_session || !self.user_session.id){
    $location.url('/index');
    return 
  }

  //Refresh of specific_question page
  if($routeParams){
    questionFactory.show($routeParams.id,function(data){
      console.log('data is is ', data)
      self.current_question = data
    })
  }

  // To display all questions
  var index = function(){
    questionFactory.index(function(data){
      self.questions = data
    })
  }
  index();

  // creating new question
  self.create = function(){
    // console.log('activeUser', self.user_session.name);
    if(!self.question) return;
    var new_question = {
      name: self.user_session.name, text: self.question, description: self.description}
      // console.log('print the question that is typed..', new_question)
    questionFactory.create(new_question,function(data){
      if (data) {
        self.errors = data
        console.log('QC create',self.errors);
        index()
      }
      else {
        console.log('QC create if no data',data);
        index()
      }
    })
    self = ''
  }

  // Redirecting to dashboard
  self.cancel = function(){
    $location.url('/dashboard');
  }

  // Functions for show page
  var getIntrestQuestion = function(){
    questionFactory.getIntrestQuestion(function(data){
      self.current_question = data
      console.log('specific_question details on show page', self.current_question)
    })
  }
  getIntrestQuestion()


  // Function for Answer the question link in the in the specific_question page
  self.answer = function(info){
    id = info
    questionFactory.show(id,function(id){
      self.current_question = info
      console.log('info is the question id',info);
      $location.url('/question/'+self.current_question+'/new_answer')
    })
  }

  // Working with likes button
  self.like = function(answer){
    // console.log('display question_id and answer_id', self.current_question._id, answer._id);
    questionFactory.like(self.current_question._id,answer._id,function(){
      questionFactory.show(self.current_question._id,function(data){
        console.log(data);
        self.current_question = data
      })
    })
  }

  //LOGOUT
  self.logout = function(){
      usersFactory.logout(function(data){
       $cookies.remove('user')
        $location.url('/index');
      })
    }
});















