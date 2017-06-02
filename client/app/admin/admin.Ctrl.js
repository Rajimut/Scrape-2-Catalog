
(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', 'Auth', '$modal', 'looksAPI', 'adminAPI', '$alert'];

  function AdminCtrl($scope, Auth, $modal, looksAPI, adminAPI, $alert) {

    //array
    $scope.looks = [];
    $scope.users = [];
    //object
    $scope.user = {};
    $scope.editLook ={};

    var alertSuccess = $alert({
      title: 'Saved',
      content: 'Look has beenedited',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'Success',
      duration: 8
    });

    var alertFail = $alert({
      title: 'Fail',
      content: 'Look has failed to edited',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
    });

    var myModal = $modal({
      scope: $scope,
      show: false
    });
    $scope.showModal = function(){
      myModal.$promise.then(myModal.show);

    }


    adminAPI.getAllUsers()
      .then(function(data){
        $scope.users= data.data;
      })
      .catch(function(err){
        console.log('error getting users');
        console.log('err');
      });


    looksAPI.getAllLooks()
    .then(function(data){
      $scope.looks = data.data;
      
    })  
    .catch(function(err){ // to catch the errors
      console.log('failed to get the looks' + err);
    });


    $scope.deleteUser = function(user){
      adminAPI.deleteUser(user)
      .then(function(data){
        console.log('User deleted');
        var index= $scope.users.indexOf(user);
        $scope.users.splice(index,1);
      })
      .catch(function(err){
        console.log('failed to delete user');
        console.log(err);
      });
    }


    $scope.editLook = function(look){
      looksAPI.getUpdateLook(look)
      .then(function(data){
        //console.log(data);
        $scope.editLook = data.data;
      })
      .catch(function(err){
        console.log('failed to edit look' + err);
      });
    }
    
    $scope.saveLook = function(){
      var look = $scope.editLook;
      looksAPI.updateLook(look)
      .then(function(data){
        console.log('Look updated');
        //console.log(data);
        $scope.editLook.title = '';
        $scope.editLook.description = '';
        alertSuccess.show();
      })
      .catch(function(err){
        console.log('failed to update' +err);
        alertFail.show();
      })
      .finally(function(){
        //$scope.loadData();
        // the above function  and the below line did not work for refreshing the page
        //$state.go('mylooks');
      });
    }

    $scope.deleteLook = function(look){
      var index = $scope.looks.indexOf(look);

      looksAPI.deleteLook(look)
      .then(function(data){
        console.log('success, look deleted');
        $scope.looks.splice(index,1);
         $http.get('/api/users').then(function(data){
            $scope.looks = data;
        });
      })
      .catch(function(err){
        console.log('failed to delete look' + err);
      });
    }
  }
})();