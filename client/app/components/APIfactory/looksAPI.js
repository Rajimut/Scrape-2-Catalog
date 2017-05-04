(function() {
  'use strict';

// name of the factory is mentioned below as looksAPI

  angular
  .module('app')
  .factory('looksAPI', looksAPI);

// $http is a service which is injected into this factory

  looksAPI.$inject = ['$http'];

// function to return createScrapeLook

  function looksAPI($http){
    return {
    createScrapeLook: createScrapeLook
    }

    function createScrapeLook(look){
     return $http.post('/api/look/scrapeUpload', look)
    }
  }

})();