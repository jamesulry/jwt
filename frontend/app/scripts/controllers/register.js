'use strict';

angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope, $http, alert) {
    $scope.submit = function(){
      var url  = "http://localhost:8373/register";
      var user = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post(url, user)
        .success(function(response){
          alert("success", "OK!", "You are now registered");
        })
        .error(function(err){
          alert("warning", "Oops!", "Could not register");
        });
    };
  });
