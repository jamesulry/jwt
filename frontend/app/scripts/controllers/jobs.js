'use strict';

angular.module('jwtApp')
  .controller('JobsCtrl', function ($scope) {
    $scope.jobs = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
