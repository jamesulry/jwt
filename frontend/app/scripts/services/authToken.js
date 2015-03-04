'use strict';

angular.module('jwtApp').factory('authToken', function ($window){
  var storage = $window.localStorage;
  var cachedToken;
  var itemKey = "userToken";

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
      return !!this.getToken();
    },
    removeToken: function(){
      cachedToken = null;
      storage.removeItem(itemKey);
    }
  };

  return authToken;
});
