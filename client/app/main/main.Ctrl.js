(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', 'looksAPI', 'scrapeAPI', '$alert', 'Upload'];

  function MainCtrl($scope, $state, Auth, $modal, looksAPI, scrapeAPI, $alert, Upload) {
    $scope.user = Auth.getCurrentUser();
    $scope.look = {}; // obj to load individual look
    $scope.looks = [];
    $scope.look.title = '';
    $scope.look.link = '';

    $scope.showScrapeDetails = false;
    $scope.scrapePostForm = true; //added by raji

    $scope.gotScrapeResults = false;
    $scope.loading = false;

    $scope.picPreview = true;
    $scope.uploadLookTitle = false;
    $scope.uploadLookForm = false;

    $scope.busy = true;
    // All data is an equivalent of looks array
    $scope.allData = [];
    // page is a tracker used to the tract thr number of sets of looks loaded.
    // It is incremented after loading a set of 4 images
    // 
    var page = 0;
    // its the number of images/looks in each page
    var step = 3;

// adding success and failure message functions (to be used in create scrape look)
    var alertSuccess = $alert({
      title: 'Success!',
      content: 'New Look added',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    });

    var alertFail = $alert({
      title: 'Not saved!',
      content: 'New Look failed to save',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
    });

    var myModal = $modal({ // to trigger modal pop up (taken from angular starp modal area)
    	scope: $scope,
    	show: false
    });

    $scope.showModal = function(){ // its on the button so when u click the button modal will pop u
    	myModal.$promise.then(myModal.show);
      $scope.look.link = ''; // angular starp modal documentation
    }

  $scope.showUploadForm = function(){
    $scope.uploadLookForm = true;
    $scope.scrapePostForm = false;
    $scope.uploadLookTitle = false;
  }

  looksAPI.getAllLooks()
    .then(function(data){
      //$scope.looks = data.data;
      $scope.allData = data.data;
      $scope.nextPage();
      $scope.busy = false;
      
    })  
    .catch(function(err){ // to catch the errors
      console.log('failed to get the looks' + err);
    });

  $scope.nextPage = function() {
      var lookLength = $scope.looks.length;
      if($scope.busy){
        //console.log(lookLength);
        return;
      }
      console.log(page);
      $scope.busy = true;
      $scope.looks = $scope.looks.concat($scope.allData.splice(page*step, step));
      page++;
      //console.log(page);
      $scope.busy = false;
      if($scope.looks.length === 0){
        $scope.noMoreData = true;
      }
    }; 

// to watch if there are changes to url field entered by user
  $scope.$watch('look.link', function(newVal, oldVal){
  	console.log(newVal + " " + newVal.length)
  	if(newVal.length > 3){
  		$scope.loading = true;
    // create link object  from the $scope.look.link
    var link = {
      url: $scope.look.link
    }
  	scrapeAPI.getScrapeDetails(link)
  	  .then(function(data){
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

  $scope.addVote = function(look) {
    looksAPI.upVoteLook(look)
    .then(function(data){
      // this is to increament the upVotes in the front end or the html page
      // because upVotes increamented in the backend will reflect only after you referesh
      // So in order to show the result in the front end without refreshing we can increase temporarily in the front end
      // once refreshed the temporary increament disapprears and orginal increment from the database reflects
      look.upVotes++;
    })
    .catch(function(err){
      console.log('failed adding upVote')
    });
  }

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
    
    looksAPI.createScrapeLook(look)
      .then (function(data){
        // displaying success/failure messages
        alertSuccess.show();
        // resetting the form field if the post function is successful into the database
        $scope.showScrapeDetails = false;
        $scope.gotScrapeResults = false;
        $scope.look.title = '';
        $scope.look.link = '';
        $scope.looks.splice(0,0,data.data);
        //$scope.userLooks.splice(0,0,data.data);
        //console.log(userLooks.length);

      })
      .catch(function(){
        alertFail.show();
        console.log('failed to post');
        $scope.showScrapeDetails = false;
        $scope.gotScrapeResults = false;
        $scope.look.title = '';
        $scope.look.link = '';
      });
  }

  $scope.uploadPic = function(file){
    // Upload here refers to ng-file upload 
    // most of the function below are from ng-file upload github repo 's function
    Upload.upload({
          url: '/api/look/upload',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: {
            file: file,
            title: $scope.look.title,
            //description: $scope.look.description,
            email: $scope.user.email,
            name: $scope.user.name,
            linkURL: $scope.look._id,
            _creator: $scope.user._id
          }
        }).then(function(resp){
          console.log('successful upload');
          // to add this successful upload to mylooks page use splice
          $scope.looks.splice(0,0, resp.data);
          $scope.look.title = '';
          $scope.look.description = '';
          $scope.picFile = '';
          $scope.picPreview = false;
          alertSuccess.show();
          // in case if upload fails it does alert Fail
        }, function(resp){
          alertFail.show();
          // another intermediate function to know the level of upload
        }, function(evt){
            var progressPercentage = parseInt(100.0*evt.loaded/evt.total);
            console.log('progress:' + progressPercentage + '%' + evt.config.data.file.name);
        });
      }
  }
})();