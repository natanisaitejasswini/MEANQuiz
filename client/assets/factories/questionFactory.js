app.factory('questionFactory', function($http,$location){
  var factory = {};
  var questions= [];
  var current_question;

  factory.index = function(callback){
    $http.get('/questions').success(function(questions){
      callback(questions);
      questions = questions
      // console.log('Question Factory', questions)
    })
  }

  factory.create = function(data, callback){
    // console.log('data of questions', data);
    $http.post('/question', data).success(function(data){
      if(!data.status){
        callback(data);
      }
      else{
        console.log(data)
        callback(data);
        console.log('no logout')
        $location.url('/dashboard')
      }
    })
  }

  // Showing Details of question.....
  factory.show = function(id,callback){
    $http.get("/question/"+ id).success(function(data){
      current_question = data
      // console.log('current_question',current_question);
      callback(data)
    })
  }

  // For specific question page
  factory.getIntrestQuestion = function(callback){
    // console.log('getIntrestQuestion', current_question);
    callback(current_question);
  }

  // Creating Answer
  factory.create_answer = function(data, callback){
    $http.post('/answer', data).success(function(response_from_server){
      console.log(response_from_server,'on server side')
      if(!data.status){
        callback(response_from_server)
      }
      else {
        callback(response_from_server)
      }
    })
  }

  // Destroy Question
  factory.destroy = function(id,callback){
    $http.delete("/question/"+ id).success(function(data){
      console.log(data);
      callback()
    })
  }

  // Likes Part
  factory.like = function(question_id,answer_id,callback){
    //Passing question_id and answer_id by POST Method
    $http.post('/like/'+question_id+'/'+answer_id).success(function(data){
      callback()
    })
  }

  return factory
})