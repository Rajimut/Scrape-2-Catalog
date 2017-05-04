(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', 'looksAPI', 'scrapeAPI'];

  function MainCtrl($scope, $state, Auth, $modal, looksAPI, scrapeAPI) {
    $scope.user = Auth.getCurrentUser();
    $scope.look = {}; // obj to load individual look
    $scope.looks = [];
    $scope.look.title = ''
    $scope.look.link = ''

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
  	console.log($scope.look.link)
  	console.log($scope.look)
    // create link object  from the $scope.look.link
    var link = {
      url: $scope.look.link
    }
  	scrapeAPI.getScrapeDetails(link)
  	  .then(function(data){
  		console.log(data);
  		$scope.showScrapeDetails = true;
  		$scope.gotScrapeResults = true;
  		$scope.uploadLookTitle = false;
  		$scope.look.imgThumb = data.data.img;
      //$scope.look.description = data.data.desc;
  	  })
    	.catch(function(data){
    		console.log('failed to return from link1' + data);
    		$scope.loading = false;
    		$scope.look.link ='';
    		$scope.gotScrapeResults = false;

    	})
    	.finally(function(){
    		$scope.loading = false;
    		$scope.uploadLookForm = false;

    	});
  }
  });
  // addScrapePost is used to upload the images and details we scraped to the database
  $scope.addScrapePost = function() {
    var look = {
      //description: $scope.look.description,
      title: $scope.look.title,
      image: $scope.look.imgThumb,
      linkURL: $scope.look.link,
      // scope.user.email is a varible created up which holds the current user
      email: $scope.user.email,
      name: $scope.user.name,
      _creator: $scope.user._id
    }
    console.log(look);
    looksAPI.createScrapeLook(look)
      .then (function(data){
        // resetting the form field if the post function is successful into the database
        $scope.showScrapeDetails = false;
        $scope.gotScrapeResults = false;
        $scope.look.title = '';
        $scope.look.link = '';
        $scope.looks.splice(0,0,data.data);
        console.log(data);
      })
      .catch(function(){
        console.log('failed to post');
        $scope.showScrapeDetails = false;
      });
  }

  }
})();