'use strict';

angular.module('app')
  .controller('NavbarCtrl', function ($scope, $location, Auth, looksAPI) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.loadData = function(){ 
      console.log('yuyuyu');
      $scope.user = Auth.getCurrentUser();
      var userEmail = $scope.user.email;
      $scope.userLooks = [];
        looksAPI.getUserLooks(userEmail)
        .then(function(data){
          console.log('item: ', data );
          //console.log(userEmail);
          $scope.userLooks = data.data;
          // console.log($scope.userLooks.length);
          //$state.go('mylooks');
        })
        .catch(function(err){
          console.log('failed to get looks for user' + err);
        });
    }
  });