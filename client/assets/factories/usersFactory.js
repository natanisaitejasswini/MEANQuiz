app.factory('usersFactory', function($http){
  var factory = {};
  var user_session = {};
  var users = [];

  factory.chk_session = function(callback){
    callback(user_session);
    // console.log('Data in Factory', user_session)
  }

  factory.login = function(user,callback){
    $http.post('users', user).success(function(data){
      if(data.success){
        user_session = data;
        callback(user_session)
      }
    })
  }

  factory.index = function(callback){
    $http.get('/users').success(function(users){
      callback(users)
      users=users
    })
  }

  factory.logout = function(callback){
    console.log('logoutting')
    user_session = {};
    console.log('callback is',callback)
    callback(user_session);
  }
  
  return factory
});
