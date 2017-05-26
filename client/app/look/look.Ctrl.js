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

	}
})();