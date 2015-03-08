'use strict';

angular.module('jwtApp')
  .controller('LogoutCtrl', function ($state, authToken) {
    console.log('logout');
    authToken.removeToken();
    $state.go('main');
});
