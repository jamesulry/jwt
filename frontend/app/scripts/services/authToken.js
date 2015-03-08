'use strict';

angular.module('jwtApp').factory('authToken', function ($window){
  var storage = $window.localStorage;
  var cachedToken;
  var itemKey = 'userToken';

  var authToken = {
    setToken: function(token){
      cachedToken = token;
      storage.setItem(itemKey, token);
    },
    getToken: function(){
      if (!cachedToken){
        cachedToken = storage.getItem(itemKey);
      }

      return cachedToken;
    },
    isAuthenticated: function(){
      var token = this.getToken();
      console.log(token);
      return !!token;
    },
    removeToken: function(){
      cachedToken = null;
      storage.removeItem(itemKey);
    }
  };

  return authToken;
});
