(function(){

	'use strict';

	angular
	.module('app')
	.controller('MyLooksCtrl', MyLooksCtrl);

	MyLooksCtrl.$inject = ['$scope', '$modal', '$state', '$alert', 'looksAPI', 'Auth'];

	function MyLooksCtrl($scope, $modal, $state, $alert, looksAPI, Auth){
		// we are using Auth service to find out the current user
		$scope.user = Auth.getCurrentUser();
		var userEmail = $scope.user.email;

		$scope.userLooks = [];
		$scope.editLook = {};

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
		
		$scope.loadData = function(){ 
			$scope.user = Auth.getCurrentUser();
			var userEmail = $scope.user.email;
			$scope.userLooks = [];
				looksAPI.getUserLooks(userEmail)
				.then(function(data){
					console.log('load Data');
					console.log(userEmail);
					$scope.userLooks = data.data;
					console.log($scope.userLooks.length);
					//$state.go('mylooks');
				})
				.catch(function(err){
					console.log('failed to get looks for user' + err);
				});

				}

		looksAPI.getUserLooks(userEmail)
			.then(function(data){
				console.log('HAPPY BIRTHDAY');
				console.log(userEmail);
				$scope.userLooks = data.data;
				console.log($scope.userLooks.length);
				//$state.go('mylooks');
			})
			.catch(function(err){
				console.log('failed to get looks for user' + err);
			});



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
				$scope.loadData();
				$state.go('mylooks');
			});
		}

		$scope.delete = function(look){
			var index = $scope.userLooks.indexOf(look);

			looksAPI.deleteLook(look)
			.then(function(data){
				console.log('success, look deleted');
				$scope.userLooks.splice(index,1);
			})
			.catch(function(err){
				console.log('failed to delete look' + err);
			});
		}

		// $scope.noLooks = function(){
		// 	$scope.userLooks.length = 0;
		// }

	}
})();