(function(){
	'use strict';

	angular
		.module('app')
		.controller('LookCtrl', LookCtrl);

	LookCtrl.$inject = ['$scope', '$stateParams', 'looksAPI', 'commentAPI', 'Auth'];

	function LookCtrl($scope, $stateParams, looksAPI, commentAPI, Auth) {

		$scope.user = Auth.getCurrentUser();
		// state params is used to grab a hold of :id that we have defined in a state
		// we have defined :id as the state we navigate to. it is look._id associated with every look
		$scope.id = $stateParams.lookId;
		$scope.popLooks =[];

		looksAPI.findOneLook($scope.id)
		.then(function(data){
			//console.log(data);
			$scope.look = data.data;
			// these functions findonelook, poplooks getcomments etc etc all instanciated/run
			// when the look page is loaded for the first time as they are called in different parts of the look page. 
			// So its a good option to include add view function to one of these so it gets triggered when the look page is open
		 addView();
			// the function will clear at the bottom of the controller
		})
		.catch(function(err){
			console.log('failed to get look', err);
		});
	// (eg is below) whenever we are passing a parameter to function it acts as a variable
	// $scope.id is a parameter and when it is passed to function poplooks it becomes variable look in looksAPI.js
		looksAPI.popLooks($scope.id)
		.then(function(data){
			//console.log(data);
			$scope.popLooks = data.data;
		})
		.catch(function(err){
			console.log('failed to get pop look',err);
		});

	commentAPI.getComments($scope.id)
	.then(function(data){
		$scope.comments = data.data;
	})
	.catch(function(err){
		console.log('failed to get comments' + err)
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

	$scope.postComment = function(){
		var comment = {
			authorId: $scope.user._id,
			authorName: $scope.user.name,
			authorEmail: $scope.user.email,
			gravatar: $scope.user.gravatar,
			comment: $scope.comment.body,
			lookId: $scope.id
		}
		commentAPI.addComment(comment)
		.then(function(data){
			console.log(data);
			$scope.comment.body = '';
			$scope.comments.splice(0,0,data.data);
		})
		.catch(function(err){
			console.log('failed to post comment' + err);
		})
	}

	function addView(){
		looksAPI.addView($scope.id)
		// the difference between addVotes and addViews is that in addVote the function looksAPI.upVoteLook(look) is called 
		// in which look object look is passed
		// but in addView the function looksAPI.addView($scope.id) is called in which Id of the object is passed
		// So in the looksAPI the corresponding difference is made in these function
		// Note: the Functions in looksAPI are very generic and modular. 
		.then(function(res){
			//console.log(res);
		})
		.catch(function(err){
			console.log('failed to increment', err);
		});
	}

	}
})();