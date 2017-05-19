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
      getAllLooks:getAllLooks,
      fineOneLook: findOneLook,
      getUpdateLook: getUpdateLook,
      updateLook: updateLook,
      deleteLook: deleteLook,
      getUserLooks: getUserLooks
    }

    function getAllLooks(){
      // this link below is the end point that we have created in index.js in look folder
      return $http.get('/api/look/getAllLooks',{
      catche:true  
      });
    }
    // id is th email goes to the route  v
    function getUserLooks(id){
      console.log('qwerty');
      return $http.get('/api/look/getUserLooks/?email='+ id,{
        cache: true
      });
    }

    function findOneLook(look) {
      return $http.get('/api/look' + look);
    }

    function getUpdateLook(look) {
      return $http.get('/api/look/' + look._id);
    }

    function updateLook(look) {
      return $http.put('/api/look/' + look._id, look);
    }

    function deleteLook(look) {
      return $http.delete('/api/look/' + look._id)
    }

    function createScrapeLook(look){
     return $http.post('/api/look/scrapeUpload', look)
    }
  }

// function to return createScrapeLook

})();