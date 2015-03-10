'use strict';

angular.module('jwtApp')
  .service('auth', function ($http, $state, API_URL, authToken) {

    this.login = function(email, password) {
      return $http.post(API_URL + 'login', {
        email: email,
        password: password
      })
        .success(function(res) {
          authSuccessful(res);
        });
    };

    this.register = function(email, password) {
      return $http.post(API_URL + 'register', {
        email: email,
        password: password
      })
        .success(function(res) {
          authSuccessful(res);
        });
    };

    function authSuccessful(res) {
      authToken.setToken(res.token);
      $state.go('main');
    }
  });
