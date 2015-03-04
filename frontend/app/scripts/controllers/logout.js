'use strict';

angular.module('jwtApp').controller('LogoutCtrl', function ($state, authToken) {
  authToken.removeToken();
  $state.go("main");
});
