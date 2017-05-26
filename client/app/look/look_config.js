(function(){
	'use strict';

	angular
	.module('app')
	.config(config);

	config.$inject = ['$stateProvider'];

	function config($stateProvider){
		$stateProvider
		.state('look', {
			url: '/look/:lookId',
			// we are passing lookId from the url into the state look and it is defined by look._id
			// look._id is the unique value that is set to each look and saved in the model
			// 
			templateUrl: 'app/look/look_detail_view.html',
			controller: 'LookCtrl'
		});
	}
})();