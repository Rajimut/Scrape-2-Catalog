(function() {
  'use strict';

// name of the factory is mentioned below as looksAPI

  angular
  .module('app')
  .factory('looksAPI', looksAPI);

// $http is a service which is injected into this factory

  looksAPI.$inject = ['$http'];

  function looksAPI($http) {
    return {
      createScrapeLook: createScrapeLook,
      //getAllLooks methos is defined in the return object so we can use it in other methods
      getAllLooks:getAllLooks
    }

    function getAllLooks(){
      // this link below is the end point that we have created in index.js in look folder
      return $http.get('/api/look/getAllLooks',{
      catche:true  
      });
    }
    
    function createScrapeLook(look){
     return $http.post('/api/look/scrapeUpload', look)
    }
  }

// function to return createScrapeLook

})();