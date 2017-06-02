(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$scope', 'Auth', 'adminAPI'];

  function ProfileCtrl($scope, Auth, adminAPI) {
    
    $scope.user = Auth.getCurrentUser();
    $scope.profileinfo = {}; // obj to load individual look
    var id = $scope.user._id;

    adminAPI.getOneUser(id)
    .then(function(data){
      $scope.profileinfo = data.data;
    })
    .catch(function(err){
      console.log(err);
    });
    
  }
})();