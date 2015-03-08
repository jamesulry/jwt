'use strict';

angular.module('jwtApp')
  .controller('HeaderCtrl', function($scope, authToken) {
    var isAuthenticated = function() {
      return authToken.isAuthenticated();
    };

    $scope.isAuthenticated = isAuthenticated;
  });
