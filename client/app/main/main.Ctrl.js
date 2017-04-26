(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', '$http'];

  function MainCtrl($scope, $state, Auth, $modal, $http) {
    $scope.user = Auth.getCurrentUser();
    $scope.look = {}; // obj to load individual look
    $scope.look.title = 'HELLO'
    // $scope.look.link = ''

    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;
    $scope.showScrapeDetails = false;
    $scope.scrapePostForm = true; //added by raji

    $scope.gotScrapeResults = false;
    $scope.loading = false;

    var myModal = $modal({ // to trigger modal pop up (taken from angular starp modal area)
    	scope: $scope,
    	show: false
    });

    $scope.showModal = function(){ // its on the button so when u click the button modal will pop u
    	myModal.$promise.then(myModal.show); // angular starp modal documentation
    }
// to watch if there are changes to url field entered by user
  $scope.$watch('look.link', function(newVal, oldVal){
  	console.log(newVal + " " + newVal.length)
  	if(newVal.length > 3){
  		$scope.loading = true;
  	}
  	console.log($scope.look.link)
  	console.log($scope.look)
  	$http.post('/api/links', {
  		url: $scope.look.link
  	})
  	.then(function(data){
  		console.log(data);
  		$scope.showScrapeDetails = true;
  		$scope.gotScrapeResults = true;
  		$scope.uploadLookTitle = false;
  		$scope.look.imgThumb = data.data.img;
  	})
  	.catch(function(data){
  		console.log('failed to return from link1' + data);
  		$scope.loading = false;
  		// $scope.look.link ='';
  		$scope.gotScrapeResults = false;

  	})
  	.finally(function(){
  		$scope.loading = false;
  		$scope.uploadLookForm = false;

  	})
  })
  }
})();